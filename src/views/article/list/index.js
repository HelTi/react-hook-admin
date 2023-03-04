import { queryArticleList } from "@/services/article";
import { useEffect, useState } from "react";

export default function ArticleList() {
  const [articleList, setArtilceList] = useState();

  const getArticle = async () => {
    const res = await queryArticleList();
    console.log('getArticle res',res)
    return res
  };

  useEffect(()=>{
    getArticle()
  })

  return <div>文章列表</div>;
}
