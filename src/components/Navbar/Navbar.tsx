import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Input,
  InputRef,
  MenuProps,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { useGlobalContext } from "../../context/context";

import NavigationMenu from "../NavigationMenu/NavigationMenu";
import NavbarStyle, { NavbarRow2Styled } from "./style";

import CustomButton from "../CustomButton/CustomButton";

import dropDownArrow from "../../assets/icons/ic_drop_down.svg";
import searchIcon from "../../assets/icons/ic_search(1).svg";
import notificationIcon from "../../assets/icons/ic_notitfication.svg";
import profileIcon from "../../assets/icons/ic_profile_avatar.svg";
import ukIcon from "../../assets/icons/ic_uk_flag.svg";
// import cloudIcon from "../../assets/icons/ic_cloud.svg";
// import logo from "../../assets/icons/logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Navbar() {
  const { searchText, setSearchText } = useGlobalContext();
  const searchRef = useRef<InputRef>(null);
  const { schoolId } = useSelector(
    (state: RootState) => state.dashboardData.schoolData
  );
  const [drawerVisible, setDrawerVisible] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to={"#"} style={{ textDecoration: "none" }}>
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          to={`/school/edit/${schoolId}`}
          style={{ textDecoration: "none" }}
        >
          Edit
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to={"#"} style={{ textDecoration: "none" }}>
          Payment
        </Link>
      ),
    },
  ];
  return (
    <>
      <NavbarStyle>
        <Drawer
          visible={drawerVisible}
          placement="left"
          onClick={() => setDrawerVisible(false)}
          onClose={() => setDrawerVisible(false)}
          width={300}
        >
          <NavigationMenu />
        </Drawer>
        <div className="top-side d-flex align-items-center justify-content-between gap-4">
          <div className="menu-toggler">
            <Button
              className="menu"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
            />
          </div>

          <div className="left-bar d-flex align-items-center justify-content-end">
            <Input
              ref={searchRef}
              value={searchText}
              placeholder="Search ..."
              onChange={(e) => setSearchText(e.target.value)}
              suffix={<img src={searchIcon} alt="search-icon" />}
              className="custom-input"
            />
          </div>

          <div className="right-bar d-flex gap-3 align-items-center">
            <div className="notification-area">
              <CustomButton
                title=""
                icon={<img src={notificationIcon} alt="notification " />}
                type="button"
                bgcolor={"white"}
                width="40px"
                color=""
                padding=""
              />
              <span className="notification-count">4</span>
            </div>
            <div className="profile-area">
              <Badge dot color="green">
                <Avatar size={45} src={profileIcon} shape="square" />
              </Badge>
              <h3 style={{
                display: "inline-block",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                marginLeft: "10px",
              }}>Adnan Quarshi</h3>
            </div>
            <div className="language-area">
              <Badge>
                <Avatar size={33} src={ukIcon} shape="square" />
              </Badge>
            </div>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <Button
                icon={<img src={dropDownArrow} alt="dropdown" />}
                style={{ border: "none" }}
              />
            </Dropdown>
          </div>
        </div>
        <NavbarRow2Styled>
          <div className="d-flex align-items-center justify-content-between row2">
            <div className="left-bar d-flex align-items-center">
              <Input
                ref={searchRef}
                value={searchText}
                placeholder="Search ..."
                onChange={(e) => setSearchText(e.target.value)}
                suffix={<img src={searchIcon} alt="search-icon" />}
                className="custom-input"
              />
            </div>
          </div>
        </NavbarRow2Styled>
      </NavbarStyle>
    </>
  );
}

export default Navbar;
