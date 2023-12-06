import React from "react";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import CustomButton from "../../../components/CustomButton/CustomButton";
import StatusActiveError from "../../../assets/images/activeBtnError.svg";
import Clock from "../../../assets/icons/ic_clock.svg";
import { useSelector } from "react-redux";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";
import DummyData from "./dummyData.json";
import {
    fontFamilyMedium,
    lightBlue3,
    pureDark,
} from "../../../components/GlobalStyle";
import { CreateTimeTableStyled } from "./styles";
import { Table } from "antd";
import { CreateTimeTableInitialValues } from "../constant";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { TimeTableDataType } from "../../../redux/features/TimeTable/TimeTableSlice";
import { RootState } from "../../../redux/store";
import { ColumnsType } from "antd/lib/table";

const TimeTableSheet: React.FC = () => {
    const { getLabelByKey } = useScreenTranslation("listTimeTable");

    const navigate = useNavigate();


    const { loading } = useSelector(
        (state: RootState) => state.timeTableData
    );




    const columns: ColumnsType<TimeTableDataType> = [
        {
            title: "Week Day",
            dataIndex: "createTimeTableWeekDay",
            key: "createTimeTableWeekDay",
        },
        {
            title: "Start Time",
            dataIndex: "createTimeTableStartDate",
            key: "createTimeTableStartDate",
            render: (DummyData) => {
                return (
                    <div className="timeTableBox border rounded-2 p-2 d-flex justify-content-between align-items-center">
                        <div>{DummyData}</div>
                        <img src={Clock} alt="clock" />
                    </div>
                );
            },
        },
        {
            title: "End Date",
            dataIndex: "createTimeTableEndDate",
            key: "createTimeTableEndDate",
            render: (DummyData) => {
                return (
                    <div className="timeTableBox border rounded-2 p-2 d-flex justify-content-between align-items-center">
                        <div>{DummyData}</div>
                        <img src={Clock} alt="clock" />
                    </div>
                );
            },

        },
        {
            title: "Start Break",
            dataIndex: "createTimeTableStartBreak",
            key: "createTimeTableStartBreak",
            render: (DummyData) => {
                return (
                    <div className="timeTableBox border rounded-2 p-2 d-flex justify-content-between align-items-center">
                        <div>{DummyData}</div>
                        <img src={Clock} alt="clock" />
                    </div>
                );
            },

        },
        {
            title: "End Break",
            dataIndex: "createTimeTableEndBreak",
            key: "createTimeTableEndBreak",
            render: (DummyData) => {
                return (
                    <div className="timeTableBox border rounded-2 p-2 d-flex justify-content-between align-items-center">
                        <div>{DummyData}</div>
                        <img src={Clock} alt="clock" />
                    </div>
                );
            },

        },
        {
            title: "Status",
            dataIndex: "createTimeTableStatus",
            key: "createTimeTableStatus",
            render: (DummyData) => {
                return (
                    <div>
                        <button>{DummyData}</button>
                        <img src={StatusActiveError} alt="image" />
                    </div>
                );
            },
        },
        {
            title: "Slot",
            dataIndex: "createTimeTableSlot",
            key: "createTimeTableSlot",
            render: (DummyData) => {
                return (
                    <div>
                        <button>{DummyData}</button>
                    </div>
                );
            },
        },
        {
            title: "Actions",
            key: "timeTableAction",
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
                        label: "Subscribe",
                        onClick: () => navigation(record, "subscribe"),
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


    const navigation = (record: TimeTableDataType, redirectTo: string) => {
        switch (redirectTo) {
            case "edit":
                navigate(`/timetable/edit/${record.timeTableId}`, {
                    state: {
                        branchToEdit: record as TimeTableDataType,
                    },
                });
                break;

            case "view":
                navigate(`/timetable/view/${record.timeTableId}`, {
                    state: {
                        branch: record as TimeTableDataType,
                    },
                });
                break;

            case "subscribe":
                navigate(`/timetable/subscribe/${record.timeTableId}`, {
                    state: {
                        branch: record as TimeTableDataType,
                    },
                });
        }
    };




    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <CreateTimeTableStyled>
                <Table
                    columns={columns}
                    dataSource={DummyData as any}
                    pagination={false}
                    title={() => <RenderTableTitle />}
                />
                <div className="mt-20 d-flex justify-content-end">
                    <CustomButton
                        bgcolor={lightBlue3}
                        textTransform="Captilize"
                        color={pureDark}
                        padding="11px 40.50px"
                        fontFamily={`${fontFamilyMedium}`}
                        width="fit-content"
                        type="submit"
                        title="Submit"
                        fontSize="18px"
                        loading={loading}
                    />
                </div>
            </CreateTimeTableStyled>
        </>
    );
};

export default TimeTableSheet;


const RenderTableTitle = () => {
    const navigate = useNavigate();
    const { getLabelByKey } = useScreenTranslation("createTimeTable");

    const initialValues: CreateTimeTableInitialValues = {
        instructorName: "",
        emailAddress: "",
        instructorPhoneNumber: "",
        address: "",
        yearsOfExperience: "",
        ranking: "",
        latestCertification: "",
        description: "",
        selectedActivities: [],
        selectedFacilities: [],
        termCondition: "",
    };

    return (
        <>
            <h3 className="tableHeading">Session Timings by Day</h3>
        </>
    );
};
