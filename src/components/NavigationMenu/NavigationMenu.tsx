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
import { useEffect, useState } from "react";
type MenuItem = Required<MenuProps>["items"][number];

const menuLinks: any = {
  dashboard: "/",
  createSchool: "/school/create",
  listBranch: "/branch/list",
  listFranchise: "/franchise/list",
  listInstructor: "/instructor/list",
  membership: "/membership",
  payment: "/payment",
  classes: "/classes",
  booking: "",
  qrCode: "/qr-code",
  setting: "",
};

const menuLinksKeys: any = {
  dashboard: "dashboard",
  createSchool: "createSchool",
  listBranch: "listBranch",
  listFranchise: "listFranchise",
  listInstructor: "listInstructor",
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
      key: menuLinksKeys.createSchool,
      label: getLabel(
        "School",
        menuLinks.createSchool,
        menuLinksKeys.createSchool
      ),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.listBranch,
      label: getLabel(
        "Branches",
        menuLinks.listBranch,
        menuLinksKeys.listBranch
      ),
      icon: getMenuIcon(dashboard),
    },
    {
      key: menuLinksKeys.listFranchise,
      label: getLabel(
        "Franchises",
        menuLinks.listFranchise,
        menuLinksKeys.listFranchise
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
      label: getLabel("Classes", menuLinks.classes, menuLinksKeys.classes),
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
      label: getLabel(
        "Notification",
        menuLinks.notification,
        menuLinksKeys.notification
      ),
      icon: getMenuIcon(classes),
    },
    {
      key: menuLinksKeys.transactionsHistory,
      label: getLabel(
        "TransactionsHistory",
        menuLinks.transactionsHistory,
        menuLinksKeys.transactionsHistory
      ),
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
      label: getLabel(
        "Help & Support",
        menuLinks.helpAndSupport,
        menuLinksKeys.helpAndSupport
      ),
      icon: getMenuIcon(qrCode),
    },
    {
      key: menuLinksKeys.customerServices,
      label: getLabel(
        "Customer Services",
        menuLinks.customerServices,
        menuLinksKeys.customerServices
      ),
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

  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    if (location.pathname !== "/") {
      let tempSidebar = [...sidebarData];
      let listWithNoDashboard = tempSidebar.filter(
        (item: any) => item.key !== "dashboard"
      );
      const key =
        listWithNoDashboard.find((item: any) => {
          return location.pathname.startsWith(menuLinks[item.key]);
        })?.key || "";
      setSelectedKey(key.toString());
    }
  }, [location.pathname]);
  return (
    <NavigationMenuStyled>
      <div className="logo text-center">
        <img src={logo} alt="" />
      </div>
      <Menu
        defaultSelectedKeys={[selectedKey]}
        mode="inline"
        items={sidebarData}
      />
    </NavigationMenuStyled>
  );
};

export default NavigationMenu;
