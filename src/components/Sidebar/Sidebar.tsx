import { useState } from "react";
import SidebarStyle from "./style";
import { useNavigate } from "react-router-dom";
import CustomDrawer from "../SideMenu/SideMenu";
import expandIcon from "../../assets/icons/ic_blog_detail_arrow.svg";
import { useGlobalContext } from "../../context/context";

const Sidebar = () => {
  const navigate = useNavigate();

  const { showSidebar, setShowSidebar } = useGlobalContext();
  const [sidebarData, setSidebarData] = useState([
    {
      create_link: "create-user",
      expand: false,
      list_link: "users-list",
      name: "User",
    },
    {
      create_link: "create-professional",
      expand: false,
      list_link: "professionals-list",
      name: "Professional",
    },
    {
      create_link: "create-property",
      expand: false,
      list_link: "property-list",
      name: "Property",
    },
    {
      create_link: "create-post-type",
      expand: false,
      list_link: "/post-list",
      name: "Post",
    },
    {
      create_link: "create-story-type",
      expand: false,
      list_link: "story-list",
      name: "Story",
    },
    {
      create_link: "",
      expand: false,
      list_link: "newsfeed-list",
      name: "Newfeed",
    },
    { create_link: "", expand: false, list_link: "post-list", name: "Boost" },
    {
      create_link: "",
      expand: false,
      list_link: "request-list",
      name: "Request",
    },
    {
      create_link: "",
      expand: false,
      list_link: "invocies-list",
      name: "Invoices",
    },
  ]);

  const expandMenu = (index: number): void => {
    sidebarData[index].expand = !sidebarData[index].expand;
    setSidebarData([...sidebarData]);
  };

  const naivgateDashboard = (): void => {
    navigate("/");
    setShowSidebar(false);
  };
  const navigation = (link: string) => {
    setShowSidebar(false);
    navigate(link);
  };

  return (
    <CustomDrawer>
      <SidebarStyle className={`${showSidebar ? "d-block" : "d-none"}`}>
        <p onClick={naivgateDashboard}>Dashboard</p>
        {sidebarData.map(({ name, list_link, create_link, expand }, index) => (
          <div key={index} className="inner-container">
            <p className="mt-2" onClick={() => expandMenu(index)}>
              {name}
            </p>
            {
              <div className={`expand-menu ${expand ? "d-block" : "d-none"}`}>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <p onClick={() => navigation(create_link)}>- Create</p>
                  <img src={expandIcon} alt="create-link" />
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <p onClick={() => navigation(list_link)}>- List</p>
                  <img src={expandIcon} alt="create_link:'',expand" />
                </div>
              </div>
            }
          </div>
        ))}
      </SidebarStyle>
    </CustomDrawer>
  );
};

export default Sidebar;
