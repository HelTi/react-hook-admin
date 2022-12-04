import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;


const items = [
  { label: "Home", key: "/", path: "/" }, // 菜单项务必填写 key
  { label: "About", key: "/about" },
  { label: "文章", key: "/article" },
  {
    label: "Other",
    key: "submenu",
    children: [{ label: "Other", key: "/Other" }],
  },
];

const Root = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [menuOpenKeys, setMenuOpenKeys] = useState([]);

  useEffect(() => {
    setMenuItems(items);
  }, [menuItems]);

  useEffect(() => {
    console.log("location", location);
    const { pathname } = location;
    setMenuOpenKeys([pathname]);
  }, [location]);

  const onClickMenuItem = (e) => {
    console.log("onClickMenuItem---", e);
    const { key } = e;
    navigate(key);
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="sidebar-header">管理后台</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          style={{
            height: "100%",
          }}
          onClick={onClickMenuItem}
          selectedKeys={menuOpenKeys}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
          }}
          className="root-header"
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Root;
