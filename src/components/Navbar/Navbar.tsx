import { useRef, useState } from "react";
import NavbarStyle from "./style";
import searchIcon from "../../assets/icons/ic_search(1).svg";
import notificationIcon from "../../assets/icons/ic_notification.svg";
import { Container } from "react-bootstrap";
import logo from "../../assets/icons/ic_logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeLoginData } from "../../redux/features/loginDataSlice";
import { BaseImgContainer, primaryColor, whiteColor } from "../GlobalStyle";
import { useGlobalContext } from "../../context/context";
import { removeUserLogin } from "../../redux/features/admin/user/loginDataSlice";
import { Form, Input, InputRef, Select } from "antd";
import { RootState } from "../../redux/store";
import { auth_token_key, media_base_url } from "../../utils/api_urls";
import CustomButton from "../CustomButton/CustomButton";
import avatarPlaceholder from "../../assets/icons/ic_use_placeholder.svg";
import CustomSelect from "../CustomSelect/CustomSelect";
import dropDownArrow from "../../assets/icons/ic_drop_down.svg";
function Navbar() {
  const { searchText, setSearchText, isSearching, setIsSearching } =
    useGlobalContext();
  const loginData = useAppSelector((state: RootState) => state.loginData);
  const { loading, data } = useAppSelector((state) => state.appData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const history = useLocation();
  const [isShowSearch, setIsShowSearch] = useState(false);
  const searchRef = useRef<InputRef>(null);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  const {
    countryName: {
      results: { countryFlagURL, name },
    },
  } = data;

  // logout handler
  const logoutHandler = () => {
    localStorage.removeItem(auth_token_key);
    dispatch(removeUserLogin());
    dispatch(removeLoginData());
    navigate("/login");
  };

  // handle loading while searching
  const searchLoader = (loading: boolean) => {
    setIsSearching(loading);
  };

  // search switcher
  const searchSwitcher = () => {
    switch (history.pathname.split("/")[1]) {
      default:
        return "users-list";
    }
  };
  // return old User if input field is empty
  // useEffect(() => {
  //   if (!searchText) {
  //     searchSwitcher();
  //   }
  // }, [searchText]);

  // search promise switcher
  const searchSwitcherPromise = () => {
    switch (history.pathname.split("/")[1]) {
      default:
        return "";
    }
  };

  // useEffect(() => {
  //   if (isShowSearch) {
  //     searchRef.current!.focus({
  //       cursor: "all",
  //     });
  //   }
  // }, [isShowSearch]);

  // handle search
  const handleSearch = (values: any) => {
    if (!searchText) {
      return;
    }
    searchSwitcherPromise();
  };

  // navigate to details
  const navigateToDetails = () => {
    navigate(`user-profile/${loginData.data?.userDetails.id}`);
  };
  return (
    <NavbarStyle>
      <div className="right-side d-flex justify-content-center align-items-center h-100">
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
    </NavbarStyle>
  );
}

export default Navbar;
