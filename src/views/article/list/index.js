import { queryArticleList } from "@/services/article";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/utils";
import { Table, Button, Tag } from "antd";
import ApiUrl from "@/config/api-url";

const columns = [
  {
    title: "文章标题",
    dataIndex: "title",
    width: 200,
    ellipsis: true,
    render: (text, record) => (
      <>
        <a
          href={`${ApiUrl.StaticUrl}/article/${record.uuid}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      </>
    ),
  },
  {
    title: "作者",
    dataIndex: "author",
  },
  {
    title: "标签",
    key: "tags",
    render: (text, record) => (
      <span>
        {record.tags.map((tag) => (
          <Tag key={tag._id}>{tag.name}</Tag>
        ))}
      </span>
    ),
  },
  {
    title: "阅读量",
    dataIndex: "meta",
    render: (text) => <span>{text.views}</span>,
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    render: (text) => <span>{formatDate(text)}</span>,
  },
  {
    title: "更新时间",
    dataIndex: "update_time",
    render: (text) => <span>{formatDate(text)}</span>,
  },
  {
    title: "操作",
    width: 150,
    render: (text, record) => (
      <div>
        <Button
          onClick={() => goEditArticle(record.uuid)}
          type="dashed"
          size="small"
          style={{ marginRight: "8px" }}
        >
          编辑
        </Button>
        <Button
          onClick={() => deleteArticleHandle(record.uuid)}
          type="danger"
          size="small"
        >
          删除
        </Button>
      </div>
    ),
  },
];

function goEditArticle() {}

function deleteArticleHandle() {}

export default function ArticleList() {
  const [articleList, setArtilceList] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    pageNo: 1,
    pageSize: 2,
  });
  const [paginationConfig, setPaginationConfig] = useState({
    current: 1,
    pageSize: 2,
    total: 100,
    showSizeChanger: true,
    showTotal: (total) => (
      <>
        <p>共{total}条数据</p>
      </>
    ),
  });

  useEffect(() => {
    console.log("useEffect", searchParams);
    getArticle();
  }, [searchParams]);

  const getArticle = async () => {
    setTableLoading(true);
    const res = await queryArticleList(searchParams);
    setTableLoading(false);
    const { data } = res;
    if (Array.isArray(data.data)) {
      setArtilceList(data.data);
      setPaginationConfig({
        ...paginationConfig,
        total: data?.count || 0,
      });
    }
  };

  const handleTableChange = (pagination) => {

    setPaginationConfig({
      ...paginationConfig,
      ...pagination,
    });
    setSearchParams({
      ...searchParams,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    });

  };

  return (
    <div>
      <Table
        rowKey={(record) => record._id}
        dataSource={articleList}
        columns={columns}
        pagination={paginationConfig}
        onChange={handleTableChange}
        loading={tableLoading}
      ></Table>
    </div>
  );
}
