import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import membership from "../../assets/icons/ic_dashboard_..svg";
import logo from "../../assets/icons/ic_logo.svg";
import dashboard from "../../assets/icons/ic_membership.svg";
import payment from "../../assets/icons/ic_membership.svg";
import classes from "../../assets/icons/ic_classes.svg";
import booking from "../../assets/icons/ic_booking.svg";
import qrCode from "../../assets/icons/ic_qr_code.svg";
import setting from "../../assets/icons/ic_setting.svg";
import { childListOfBooking, childListOfSetting } from "../Sidebar/constants";
import { SidebarStyle } from "../Sidebar/style";
import { NavigationMenuStyled } from "./styles";
type MenuItem = Required<MenuProps>["items"][number];

const menuLinks: any = {
  dashboard: "/",
  createSchool: "/school/create",
  membership: "/membership",
  payment: "/payment",
  classes: "/classes",
  booking: "",
  qrCode: "/qr-code",
  setting: "",
  listbranch: "/branch/list",
  listFranchise: "/franchise/list",
};

const menuLinksKeys: any = {
  dashboard: "dashboard",
  createSchool: "createSchool",
  membership: "membership",
  payment: "payment",
  classes: "classes",
  booking: "booking",
  qrCode: "qr-code",
  setting: "setting",
  listbranch: "listbranch",
  listFranchise: "listFranchise",
};

const NavigationMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getMenuIcon = (file: any) => <img src={file} alt="" />;

  const navigation = (link: string, key: string) => {
    navigate(link);
  };

  const getLabel = (label: string, link: string, key: string) => (
    <div onClick={() => (link ? navigation(link, key) : "")}>{label}</div>
  );
  const sidebarData: MenuItem[] = [
    {
      key: menuLinksKeys.dashboard,
      label: getLabel("Dasboard", menuLinks.dashboard, menuLinks.dashboard),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.createSchool,
      label: getLabel(
        "Create School",
        menuLinks.createSchool,
        menuLinksKeys.createSchool
      ),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.listbranch,
      label: getLabel("Branch", menuLinks.listbranch, menuLinksKeys.listbranch),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.listFranchise,
      label: getLabel(
        "Franchise",
        menuLinks.listFranchise,
        menuLinksKeys.listFranchise
      ),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.membership,
      label: getLabel(
        "Membership",
        menuLinks.membership,
        menuLinksKeys.createSchool
      ),
      icon: getMenuIcon(membership),
    },
    {
      key: menuLinksKeys.payment,
      label: getLabel("Payment", menuLinks.payment, menuLinksKeys.payment),
      icon: getMenuIcon(payment),
    },
    {
      key: menuLinksKeys.classes,
      label: getLabel("Classes", menuLinks.classes, menuLinksKeys.classes),
      icon: getMenuIcon(classes),
    },
    {
      key: menuLinksKeys.booking,
      label: getLabel("Booking", menuLinks.booking, menuLinksKeys.booking),
      children: childListOfBooking,
      icon: getMenuIcon(booking),
    },
    {
      key: menuLinksKeys.qrCode,
      label: getLabel("QR Code", menuLinks.qrCode, menuLinksKeys.qrCode),
      icon: getMenuIcon(qrCode),
    },
    {
      key: menuLinksKeys.setting,
      label: getLabel("Setting", menuLinks.setting, menuLinksKeys.setting),
      children: childListOfSetting,
      icon: getMenuIcon(setting),
    },
  ];

  let defaultSelectedKey = "";

  Object.keys(menuLinks).forEach((key) => {
    if (location.pathname === menuLinks[key]) {
      defaultSelectedKey = key;
    }
  });
  return (
    <NavigationMenuStyled>
      <div className="logo text-center">
        <img src={logo} alt="" />
      </div>
      <Menu
        defaultSelectedKeys={[defaultSelectedKey]}
        mode="inline"
        items={sidebarData}
      />
    </NavigationMenuStyled>
  );
};

export default NavigationMenu;
