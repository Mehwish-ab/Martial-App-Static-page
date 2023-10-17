import { Route, Routes } from "react-router-dom";
import { ContentContainer, GlobalContainer } from "../../screens/Home/style";
import Navbar from "../Navbar/Navbar";
import Rightbar from "../Rightbar/Rightbar";
import Sidebar from "../Sidebar/Sidebar";
import { Home } from "../../screens/pages";
import CreateSchool from "../../screens/CreateSchool/CreateSchool";

import React, { ReactNode } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const AppLayout = (props: any) => {
  // const {
  //   token: { colorBgContainer },
  // } = theme?.useToken();

  console.log(props.children);
  return (
    <GlobalContainer>
      <Layout>
        <Sidebar />

        <Layout className="px-3">
          <Header
            style={{
              padding: 0,
              background: "transparent",
            }}
          >
            <Navbar />
          </Header>

          <Content>{props.children}</Content>
        </Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          theme="light"
          className="right-sider-width"
        >
          <Rightbar />
        </Sider>
      </Layout>
    </GlobalContainer>
  );
};

export default AppLayout;
