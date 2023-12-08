import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/ic_logo.svg";
import { childListOfBooking, childListOfSetting } from "../Sidebar/constants";
// import { SidebarStyle } from "../Sidebar/style";
import { NavigationMenuStyled } from "./styles";
import { useEffect, useState } from "react";
type MenuItem = Required<MenuProps>["items"][number];

const menuLinks: any = {
  dashboard: "/",
  createSchool: "/school/create",
  listBranch: "/branch/list",
  listFranchise: "/franchise/list",
  listInstructor: "/instructor/list",
  membership: "/membership/list",
  payment: "/payment",
  timeTable: "/timetable/list",
  rules: "/rules/list",
  transactionsHistory: "/transaction-history/list",
  classes: "/class/list",
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

  // const getMenuIcon = (file: any) => <img src={file} alt="" />;

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
    },
    {
      key: menuLinksKeys.createSchool,
      label: getLabel(
        "School",
        menuLinks.createSchool,
        menuLinksKeys.createSchool
      ),
    },
    {
      key: menuLinksKeys.listBranch,
      label: getLabel(
        "Branches",
        menuLinks.listBranch,
        menuLinksKeys.listBranch
      ),
    },
    {
      key: menuLinksKeys.listFranchise,
      label: getLabel(
        "Franchises",
        menuLinks.listFranchise,
        menuLinksKeys.listFranchise
      ),
    },
    {
      key: menuLinksKeys.listInstructor,
      label: getLabel(
        "Instructors",
        menuLinks.listInstructor,
        menuLinksKeys.listInstructor
      ),
    },
    {
      key: menuLinksKeys.timeTable,
      label: getLabel(
        "TimeTable",
        menuLinks.timeTable,
        menuLinksKeys.timeTable
      ),
    },
    {
      key: menuLinksKeys.classes,
      label: getLabel("Classes", menuLinks.classes, menuLinksKeys.classes),
    },
    {
      key: menuLinksKeys.membership,
      label: getLabel(
        "Memberships",
        menuLinks.membership,
        menuLinksKeys.membership
      ),
    },
    {
      key: menuLinksKeys.rules,
      label: getLabel("Rules", menuLinks.rules, menuLinksKeys.rules),
    },
    {
      key: menuLinksKeys.notification,
      label: getLabel(
        "Notifications",
        menuLinks.notification,
        menuLinksKeys.notification
      ),
    },
    {
      key: menuLinksKeys.transactionsHistory,
      label: getLabel(
        "Transactions History",
        menuLinks.transactionsHistory,
        menuLinksKeys.transactionsHistory
      ),
      children: childListOfBooking,
    },
    {
      key: menuLinksKeys.setting,
      label: getLabel("Settings", menuLinks.setting, menuLinksKeys.setting),
      children: childListOfSetting,
    },
    {
      key: menuLinksKeys.language,
      label: getLabel("Language", menuLinks.language, menuLinksKeys.language),
    },
    {
      key: menuLinksKeys.helpAndSupport,
      label: getLabel(
        "Help & Support",
        menuLinks.helpAndSupport,
        menuLinksKeys.helpAndSupport
      ),
    },
    {
      key: menuLinksKeys.customerServices,
      label: getLabel(
        "Customer Services",
        menuLinks.customerServices,
        menuLinksKeys.customerServices
      ),
    },
    {
      key: menuLinksKeys.reports,
      label: getLabel("Reports", menuLinks.reports, menuLinksKeys.reports),
    },
    {
      key: menuLinksKeys.qrCode,
      label: getLabel("QR Code", menuLinks.qrCode, menuLinksKeys.qrCode),
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
