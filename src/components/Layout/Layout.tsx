import { Route, Routes } from "react-router-dom";
import { ContentContainer, GlobalContainer } from "../../screens/Home/style";
import Navbar from "../Navbar/Navbar";
import Rightbar from "../Rightbar/Rightbar";
import Sidebar from "../Sidebar/Sidebar";
import { Home } from "../../screens/pages";
import CreateSchool from "../../screens/CreateSchool/CreateSchool";

import React, { ReactNode, useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import NavbarSmallScreen from "../Navbar/NavbarSmallScreen";
const { Header, Content, Footer, Sider } = Layout;

const AppLayout = (props: any) => {
  // const {
  //   token: { colorBgContainer },
  // } = theme?.useToken();
  const [collapsed, setCollapsed] = useState(false);

  console.log(props.children);
  return (
    <GlobalContainer>
      <Layout>
        <Sidebar />

        <Layout className="content-left-width">
          <Header
            style={{
              padding: "16px",
              background: "white",
              marginBottom: 20,
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              // height: 90,
            }}
            className="navbar-styles"
          >
            <Navbar />
            {/* <NavbarSmallScreen /> */}
          </Header>

          <Content className="content-styles">
            <Layout style={{ flex: 3 }}>{props.children}</Layout>
            <Rightbar />
          </Content>
        </Layout>
      </Layout>
    </GlobalContainer>
  );
};

export default AppLayout;
