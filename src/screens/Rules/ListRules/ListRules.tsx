import React from "react";
import { Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ListRulesStyled } from "./styles";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { CustomDiv } from "./CustomDiv";
import {
    fontFamilyMedium,
    pureDark,
    tertiaryBlue2,
} from "../../../components/GlobalStyle";
import { useNavigate } from "react-router-dom";
import plusIcon from "../../../assets/icons/ic_plus.svg";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { RulesDataType } from "../../../redux/features/Rules/RulesSlice";
import DummyData from "./dummyData.json";
import StatusActiveError from "../../../assets/images/activeBtnError.svg";
import Download from "../../../assets/icons/ic_download.svg";
import RightArrow from "../../../assets/images/rightArrow.svg";
import LeftArrow from "../../../assets/images/leftArrow.svg";
import DateCalander from "../../../assets/images/dateCalander.svg";

const ListRules: React.FC = () => {

    const navigate = useNavigate();

    const loading = false;

    const columns: ColumnsType<RulesDataType> = [
        {
            title: "Id",
            dataIndex: "RulesID",
            key: "RulesID",
        },
        {
            title: "Title",
            dataIndex: "RulesTitle",
            key: "RulesTitle",
        },
        {
            title: "Main Category",
            dataIndex: "RulesMainCategory",
            key: "RulesMainCategory",
        },
        {
            title: "Category",
            dataIndex: "RulesCategory",
            key: "RulesCategory",
        },
        {
            title: "Sub Category",
            dataIndex: "RulesSubCategory",
            key: "RulesSubCategory",
        },
        {
            title: "State",
            dataIndex: "RulesState",
            key: "RulesState",
            render: (DummyData) => {
                return (
                    <div>
                        <button>{DummyData}</button>
                        <img src={StatusActiveError} alt="images" />
                    </div>
                );
            },
        },
        {
            title: "Status",
            dataIndex: "RulesStatus",
            key: "RulesStatus",
            render: (DummyData) => {
                return (
                    <div>
                        <button>{DummyData}</button>
                        <img src={StatusActiveError} alt="images" />
                    </div>
                );
            },
        },
        {
            title: "Actions",
            key: "RulesAction",
            render: (_, record) => {
                const items = [
                    {
                        key: "1",
                        label: "View",
                        onClick: () => navigation(record, "view"),
                    },
                    {
                        key: "2",
                        label: "Edit",
                        onClick: () => navigation(record, "edit"),
                    },
                    {
                        key: "3",
                        label: "School",
                        onClick: () => navigation(record, "school"),
                    },
                ];
                return (
                    <Space size="middle">
                        <Dropdown menu={{ items }}>
                            <img
                                src={actionMenuTogglerIcon}
                                alt="action menu"
                                style={{ cursor: "pointer" }}
                            />
                        </Dropdown>
                    </Space>
                );
            },
        },
    ];

    const navigation = (record: RulesDataType, redirectTo: string) => {
        switch (redirectTo) {
            case "edit":
                navigate(`/Rules/edit/${record.RulesID}`, {
                    state: {
                        branchToEdit: record as RulesDataType,
                    },
                });
                break;

            case "view":
                navigate(`/Rules/view/${record.RulesID}`, {
                    state: {
                        branch: record as RulesDataType,
                    },
                });
                break;

            case "school":
                navigate(`/Rules/School-profile${record.RulesID}`, {
                    state: {
                        branch: record as RulesDataType,
                    },
                });
        }
    };

    console.log("DummyData", DummyData);

    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <ListRulesStyled>
                <Table
                    columns={columns}
                    dataSource={
                        DummyData.map((item) => ({
                            ...item,
                            key: item.RulesID,
                        })) as any
                    }
                    title={() => <RenderTableTitle />}
                    pagination={{
                        showTotal: (total, range) => (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: `Page <span className='paginationVal'>${range[0]}</span> of ${range[1]}`,
                                }}
                            />
                        ),
                    }}
                />
            </ListRulesStyled>
        </>
    );
};

export default ListRules;

const RenderTableTitle = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="table-heading">Classes</h3>
                <CustomDiv>
                    <div className="instructorDateSection">
                        <div className="mainarrow">
                            <div className="arrowright">
                                <img src={LeftArrow} alt="Date" width={18} height={12} />
                            </div>
                            <div className="arrowleft">
                                <img src={RightArrow} alt="Date" width={18} height={12} />
                            </div>
                        </div>
                        <div className="dateRange">
                            <p><span>Mon,</span> Sep 11, 2023 - <span>Thu,</span> Sep 21, 2023</p>
                            <img src={DateCalander} alt="Calander" width={21} height={21} />
                        </div>
                        <div className="dateToday">Today</div>
                    </div>
                    <CustomButton
                        bgcolor={tertiaryBlue2}
                        textTransform="Captilize"
                        color={pureDark}
                        padding="6.5px 0px"
                        fontFamily={`${fontFamilyMedium}`}
                        width="40px"
                        type="submit"
                        title=""
                        fontSize="17px"
                        icon={<img src={plusIcon} alt="edit icon" width={17} height={17} />}
                        clicked={() => {
                            navigate(`/Rules/create`);
                        }}
                    />
                </CustomDiv>
            </div>
        </>

    );
};
