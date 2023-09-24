import { Drawer } from "antd";
import { useGlobalContext } from "../../context/context";
import { SideMenuStyle } from "./style";

type sideMenuProps = {
  children: React.ReactNode;
};
const SideMenu: React.FC<sideMenuProps> = ({ children }) => {
  const { showSidebar, setShowSidebar } = useGlobalContext();
  const onClose = () => {
    setShowSidebar(false);
  };
  return (
    <SideMenuStyle>
      <Drawer
        style={{
          marginTop: "66px",
        }}
        width={250}
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={showSidebar}
        key={"left"}
      >
        {children}
      </Drawer>
    </SideMenuStyle>
  );
};

export default SideMenu;
