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
  school: "school",
  branches: "branches",
  franchises: "franchises",
  instructor: "instructor",
  timeTable: "timeTable",
  classes: "classes",
  membership: "membership",
  rules: "rules",
  notification: "notification",
  transactionsHistory: "transactionsHistory",
  subscriptionHistory: "subscriptionHistory",
  setting: "setting",
  language: "language",
  currency: "currency",
  helpAndSupport: "helpAndSupport",
  customerServices: "customerServices",
  reports: "reports",
  qrCode: "qrCode",
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
      key: menuLinksKeys.school,
      label: getLabel(
        "School",
        menuLinks.school,
        menuLinksKeys.school
      ),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.branches,
      label: getLabel("Branches", menuLinks.branches, menuLinksKeys.branches),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.franchises,
      label: getLabel(
        "Franchises",
        menuLinks.franchises,
        menuLinksKeys.franchises
      ),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.instructor,
      label: getLabel(
        "Instructor",
        menuLinks.instructor,
        menuLinksKeys.instructor
      ),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.timeTable,
      label: getLabel(
        "TimeTable",
        menuLinks.timeTable,
        menuLinksKeys.timeTable
      ),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.classes,
      label: getLabel(
        "Classes",
        menuLinks.classes,
        menuLinksKeys.classes
      ),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.membership,
      label: getLabel(
        "Membership",
        menuLinks.membership,
        menuLinksKeys.membership
      ),
      icon: getMenuIcon(membership),
    },
    {
      key: menuLinksKeys.rules,
      label: getLabel("Rules", menuLinks.rules, menuLinksKeys.rules),
      icon: getMenuIcon(payment),
    },
    {
      key: menuLinksKeys.notification,
      label: getLabel("Notification", menuLinks.notification, menuLinksKeys.notification),
      icon: getMenuIcon(classes),
    },
    {
      key: menuLinksKeys.transactionsHistory,
      label: getLabel("TransactionsHistory", menuLinks.transactionsHistory, menuLinksKeys.transactionsHistory),
      children: childListOfBooking,
      icon: getMenuIcon(booking),
    },
    {
      key: menuLinksKeys.setting,
      label: getLabel("Setting", menuLinks.setting, menuLinksKeys.setting),
      children: childListOfSetting,
      icon: getMenuIcon(setting),
    },
    {
      key: menuLinksKeys.language,
      label: getLabel("language", menuLinks.language, menuLinksKeys.language),
      icon: getMenuIcon(qrCode),
    },
    {
      key: menuLinksKeys.helpAndSupport,
      label: getLabel("Help & Support", menuLinks.helpAndSupport, menuLinksKeys.helpAndSupport),
      icon: getMenuIcon(qrCode),
    },
    {
      key: menuLinksKeys.customerServices,
      label: getLabel("Customer Services", menuLinks.customerServices, menuLinksKeys.customerServices),
      icon: getMenuIcon(qrCode),
    },
    {
      key: menuLinksKeys.reports,
      label: getLabel("Reports", menuLinks.reports, menuLinksKeys.reports),
      icon: getMenuIcon(qrCode),
    },
    {
      key: menuLinksKeys.qrCode,
      label: getLabel("QR Code", menuLinks.qrCode, menuLinksKeys.qrCode),
      icon: getMenuIcon(qrCode),
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
