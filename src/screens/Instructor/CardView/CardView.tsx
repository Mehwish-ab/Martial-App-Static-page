import React, { useState } from "react";
import { CardViewStyled } from "./styles";
import { Avatar, Dropdown, List, Rate } from "antd";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";
import { BranchDataType } from "../../../redux/features/branch/branchSlice";
import { Link, useNavigate } from "react-router-dom";

import placeHolderImage from "../../../assets/images/custom_card_placeholder.png";

const CardView = () => {
  const navigate = useNavigate();
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(3);

  const items = [
    {
      key: "1",
      label: "View",
      // onClick: () => navigation(record, "view"),
    },
    {
      key: "2",
      label: "Edit",
      // onClick: () => navigation(record, "edit"),
    },
    {
      key: "3",
      label: "Subscribe",
      // onClick: () => navig[ation(record, "subscribe"),
    },
  ];

  const navigation = (record: BranchDataType, redirectTo: string) => {
    switch (redirectTo) {
      case "edit":
        navigate(`/instructor/edit/${record.branchId}`, {
          state: {
            branchToEdit: record as BranchDataType,
          },
        });
        break;

      case "view":
        navigate(`/instructor/view/${record.branchId}`, {
          state: {
            branch: record as BranchDataType,
          },
        });
        break;

      case "subscribe":
        navigate(`/instructor/subscribe/${record.branchId}`, {
          state: {
            branch: record as BranchDataType,
          },
        });
    }
  };

  return (
    <CardViewStyled className="mt-20">
      <div className="header">
        <h3>Instructor  Class</h3>
      </div>
      <div className="custom_card_list d-flex flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          return (
            <div className="custom_card" key={item}>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={"Apex Martial Arts Academy"}
                  description="Hutton, United Kingdom"
                />
                <Dropdown menu={{ items }}>
                  <img
                    src={actionMenuTogglerIcon}
                    alt="action menu"
                    style={{ cursor: "pointer" }}
                  />
                </Dropdown>
              </List.Item>

              <div className="custom_card_placeholder_img">
                <img src={placeHolderImage} alt="" />
              </div>
              <div className="custom_card_para">
                Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </div>
              <div className="custom_card_footer">
                <div className="custom_card_footer_rating">
                  <Rate tooltips={desc} onChange={setValue} value={value} />
                  {value ? (
                    <span className="ant-rate-text">{desc[value - 1]}</span>
                  ) : (
                    ""
                  )}
                </div>
                <Link to={"#"} className="custom_card_footer_link">
                  Learn More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </CardViewStyled>
  );
};

export default CardView;
