import { Drawer } from "antd";
import { useGlobalContext } from "../../context/context";
import { SideMenuStyle } from "./style";

type sideMenuProps = {
  children: React.ReactNode;
};
const SideMenu: React.FC<sideMenuProps> = ({ children }) => {
  // const { showSidebar, setShowSidebar } = useGlobalContext();
  // const onClose = () => {
  //   setShowSidebar(false);
  // };
  return (
    <SideMenuStyle>
      <Drawer
        style={{
          marginLeft: "32px",
          marginTop: "32px",
        }}
        width={250}
        drawerStyle={{
          borderRadius: 20,
          background: "#fff",
          border: "1px solid #fff",
        }}
        placement={"left"}
        closable={true}
        // onClose={onClose}
        open={true}
        key={"left"}
      >
        {children}
      </Drawer>
    </SideMenuStyle>
  );
};

export default SideMenu;
