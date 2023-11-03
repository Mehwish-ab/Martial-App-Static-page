import { useRef, useState } from "react";
import { Avatar, Badge, Button, Drawer, Input, InputRef, Select } from "antd";
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
import cloudIcon from "../../assets/icons/ic_cloud.svg";
import logo from "../../assets/icons/logo.svg";

function Navbar() {
  const { searchText, setSearchText } = useGlobalContext();
  const searchRef = useRef<InputRef>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
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
          {/* <div className="logo">
            <img src={logo} alt="" />
          </div> */}
          <div className="left-bar d-flex align-items-center">
            {/* <Select
              className="navbar-select"
              id={"category"}
              suffixIcon={
                <img
                  style={{
                    height: "6px",
                  }}
                  src={dropDownArrow}
                  alt="arrow"
                />
              }
              // defaultValue={defaultValue}
              // {...rest}
              // onSelect={(val, event) => onSelect(val, event.key)}
              placeholder={"Select category"}
              // You have to provide the onChange function and on changing the value you should call
              // the setFieldValue function provided by the prop of "form"
              // onChange={(val: any) => {
              // form.setFieldValue(name, val);
              // }}
              options={[]}
            /> */}

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
            <div className="date-time-area px-3">
              <img src={cloudIcon} alt="" />
              <span className="date">10-21-2023</span>
            </div>

            <div className="notification-area">
              <CustomButton
                title=""
                icon={<img src={notificationIcon} alt="notification " />}
                type="button"
                bgcolor={"white"}
                width="50px"
                color=""
                padding=""
              />
              <span className="notification-count">4</span>
            </div>
            <div className="profile-area">
              <Badge dot color="green">
                <Avatar size={50} src={profileIcon} shape="square" />
              </Badge>
            </div>
            <div className="language-area">
              <Badge>
                <Avatar size={40} src={ukIcon} shape="square" />
              </Badge>
            </div>
          </div>
        </div>
        <NavbarRow2Styled>
          <div className="d-flex align-items-center justify-content-between row2">
            <div className="left-bar d-flex align-items-center">
              <Select
                className="navbar-select"
                id={"category"}
                suffixIcon={
                  <img
                    style={{
                      height: "6px",
                    }}
                    src={dropDownArrow}
                    alt="arrow"
                  />
                }
                // defaultValue={defaultValue}
                // {...rest}
                // onSelect={(val, event) => onSelect(val, event.key)}
                placeholder={"Select category"}
                // You have to provide the onChange function and on changing the value you should call
                // the setFieldValue function provided by the prop of "form"
                // onChange={(val: any) => {
                // form.setFieldValue(name, val);
                // }}
                options={[]}
              />

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
