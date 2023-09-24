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
import { Form, Input, InputRef } from "antd";
import { RootState } from "../../redux/store";
import { auth_token_key, media_base_url } from "../../utils/api_urls";
import CustomButton from "../CustomButton/CustomButton";
import avatarPlaceholder from "../../assets/icons/ic_use_placeholder.svg";

function Navbar() {
  const {
    showSidebar,
    setShowSidebar,
    searchText,
    setSearchText,
    isSearching,
    setIsSearching,
  } = useGlobalContext();
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
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <img
            title="admin-home"
            onClick={() => (loginData ? setShowSidebar(!showSidebar) : {})}
            src={logo}
            className="logo"
            alt="logo"
          />
          {loginData.data ? (
            <div className="right-side d-flex justify-content-center align-items-center">
              <Form onFinish={handleSearch}>
                <Input
                  ref={searchRef}
                  value={searchText}
                  placeholder="Search ..."
                  onChange={(e) => setSearchText(e.target.value)}
                  suffix={<img src={searchIcon} alt="search-icon" />}
                />
              </Form>
              <img src={notificationIcon} alt="notifications" />
              <BaseImgContainer
                img_url={countryFlagURL}
                alt={name}
                className="me-2 flag"
                width="26px"
                height="26px"
              />
              <p
                className="name ms-2 cursor-pointer"
                onClick={navigateToDetails}
              >
                Hi, {loginData.data.userDetails.userFirstName}
              </p>
              <img
                className="profile-img"
                src={
                  loginData?.data?.userDetails.profileImageURL
                    ? media_base_url +
                      loginData?.data?.userDetails.profileImageURL
                    : avatarPlaceholder
                }
                alt={loginData.data.userDetails.userFirstName}
                onClick={navigateToDetails}
              />
              <div className="ms-2 btn btn-sm">
                <CustomButton
                  bgcolor={primaryColor}
                  color={whiteColor}
                  padding="6px"
                  width="100%"
                  type="submit"
                  fontSize="14px"
                  title="Logout"
                  loading={loading}
                  clicked={() => dispatch(logoutHandler)}
                />
              </div>
            </div>
          ) : (
            <div className="ms-2">
              <CustomButton
                bgcolor={primaryColor}
                color={whiteColor}
                padding="8px"
                width="100%"
                type="submit"
                fontSize="14px"
                title="Login"
                loading={loading}
                clicked={() => navigate("/login")}
              />
            </div>
          )}
        </div>
      </Container>
    </NavbarStyle>
  );
}

export default Navbar;
