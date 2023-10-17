import { useState } from "react";
import { ActivitesStyled, SidebarStyle } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import membership from "../../assets/icons/ic_dashboard_..svg";
import logo from "../../assets/icons/ic_logo.svg";

import dashboard from "../../assets/icons/ic_membership.svg";
import payment from "../../assets/icons/ic_membership.svg";
import classes from "../../assets/icons/ic_classes.svg";
import booking from "../../assets/icons/ic_booking.svg";
import qrCode from "../../assets/icons/ic_qr_code.svg";
import setting from "../../assets/icons/ic_setting.svg";

import type { MenuProps } from "antd";
import { Menu, Layout } from "antd";
import { childListOfBooking, childListOfSetting } from "./constants";
import CustomButton from "../CustomButton/CustomButton";
import { fontFamilyMedium, pureDark, tertiaryBlue } from "../GlobalStyle";

import jujistu from "../../assets/images/Jiu_Jitsu.svg";
import wrestling from "../../assets/images/Wrestling.svg";
import karate from "../../assets/images/Karate.svg";
import yoga from "../../assets/images/Yoga.svg";
import arrowRight from "../../assets/icons/ic_arrow_right.svg";
import { auth_token_key } from "../../utils/api_urls";
import { removeLoginData } from "../../redux/features/loginDataSlice";
import { removeUserLogin } from "../../redux/features/admin/user/loginDataSlice";
import { useDispatch } from "react-redux";
const { Sider } = Layout;
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
};
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let defaultSelectedKey = "";

  // Loop through the menuLinks to find the most specific match
  Object.keys(menuLinks).forEach((key) => {
    if (location.pathname === menuLinks[key]) {
      defaultSelectedKey = key;
    }
  });
  console.log("defaultSelectedKey", defaultSelectedKey);
  const getMenuIcon = (file: any) => <img src={file} alt="" />;

  const getLabel = (label: string, link: string, key: string) => (
    <div onClick={() => (link ? navigation(link, key) : "")}>{label}</div>
  );
  // const { showSidebar, setShowSidebar } = useGlobalContext();

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

  const navigation = (link: string, key: string) => {
    navigate(link);
  };

  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem(auth_token_key);
    dispatch(removeUserLogin());
    dispatch(removeLoginData());
    window.location.reload();
    // navigate("/login");
  };
  // const location = useLocation();
  // const currentKey = sidebarData.find(
  //   (item: MenuItem) => item.link === location.pathname
  // )?.key;

  return (
    <Sider
      breakpoint="lg"
      theme="light"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      width={"280px"}
    >
      <SidebarStyle>
        <div
          style={{
            background: "white",
            borderRadius: 20,
            paddingBottom: 16,
            paddingTop: 32,
          }}
        >
          <div className="logo text-center">
            <img src={logo} alt="" />
          </div>
          <Menu
            defaultSelectedKeys={[defaultSelectedKey]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={sidebarData}
          />

          <div className="logout-btn-container">
            <CustomButton
              bgcolor={tertiaryBlue}
              textTransform="Captilize"
              color={pureDark}
              padding="8px"
              fontFamily={`${fontFamilyMedium}`}
              width="100%"
              type="submit"
              title={"Logout"}
              fontSize="16px"
              clicked={logoutHandler}
            />
          </div>
        </div>

        <ActivitesStyled>
          <div className="row">
            <div className="col-md-6">
              <h3>Activities</h3>
            </div>
            <div className="col-md-6 text-end">
              <a href="#">View All</a>
              <img src={arrowRight} alt="" />
            </div>
            <div className="col-md-6 mb-3 pe-0">
              <img src={jujistu} alt="" />
            </div>
            <div className="col-md-6 mb-3 pe-0">
              <img src={wrestling} alt="" />
            </div>
            <div className="col-md-6">
              <img src={karate} alt="" />
            </div>
            <div className="col-md-6">
              <img src={yoga} alt="" />
            </div>
          </div>
        </ActivitesStyled>
      </SidebarStyle>
    </Sider>
  );
};

export default Sidebar;
