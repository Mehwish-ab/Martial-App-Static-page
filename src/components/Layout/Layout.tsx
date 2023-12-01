import { GlobalContainer } from "../../screens/Home/style";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import { Layout } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const AppLayout = (props: any) => {
  // const {
  //   token: { colorBgContainer },
  // } = theme?.useToken();

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
            {/* <Rightbar /> */}
          </Content>
        </Layout>
      </Layout>
    </GlobalContainer>
  );
};

export default AppLayout;
