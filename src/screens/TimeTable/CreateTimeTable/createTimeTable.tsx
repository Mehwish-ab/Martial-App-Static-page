import React from "react";
import { Dropdown, Form, Space } from "antd";
import { ErrorMessage, Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import CustomButton, { CustomDiv } from "../../../components/CustomButton/CustomButton";
import StatusActiveError from "../../../assets/images/activeBtnError.svg";
import Clock from "../../../assets/icons/ic_clock.svg";
import FormControl from "../../../components/FormControl";
import { useSelector } from "react-redux";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";
import DummyData from "./dummyData.json";






import DateCalander from "../../../assets/images/dateCalander.svg";
import {
    darkBlue,
    darkGery,
    fontFamilyBold,
    tertiaryBlue2,
    fontFamilyMedium,
    lightBlue3,
    pureDark,
    // mainColor,
} from "../../../components/GlobalStyle";
import { CreateTimeTableStyled } from "./styles";
import { Table } from "antd";
import { CreateTimeTableInitialValues } from "../constant";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { TimeTableDataType } from "../../../redux/features/TimeTable/TimeTableSlice";
import { RootState } from "../../../redux/store";
import { ColumnsType } from "antd/lib/table";
// import { FormControl } from "react-bootstrap";

const CreateTimeTable: React.FC = () => {
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

    console.log("DummyData", DummyData)


    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <CreateTimeTableStyled>
                <Table
                    columns={columns}
                    dataSource={DummyData as any}
                    title={() => <RenderTableTitle />}
                    pagination={false}
                />
                <div className="mt-20 d-flex justify-content-end">
                    <CustomButton
                        bgcolor={lightBlue3}
                        textTransform="Captilize"
                        color={pureDark}
                        padding="12px 100px"
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

export default CreateTimeTable;


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
        <Formik
            initialValues={initialValues as any}
            // validationSchema={validationSchema}
            onSubmit={() => { }}
        >
            {(formik) => {
                return (
                    <Form
                        name="basic"
                        onFinish={formik.handleSubmit}
                        autoComplete="off"
                    >
                        <div className="timeTableHeader">
                            <h3 className="timetable-heading">Time Table</h3 >
                            <CustomDiv>
                                <div className="col-4 titleField">
                                    <FormControl
                                        control="input"
                                        type="text"
                                        name="title"
                                        label="Title"
                                        padding="10px"
                                        fontFamily={fontFamilyMedium}
                                        fontSize="16px"
                                        max={6}
                                        placeholder="Enter Title  name"
                                    />
                                </div>
                                <div className="col-8 d-flex ">
                                    <div className="col-4 repeatField d-inline-block ps-4">
                                        <FormControl
                                            control="select"
                                            type="text"
                                            name="repeattimetable"
                                            label="Repeat Time Table"
                                            padding="7px"
                                            fontFamily={fontFamilyMedium}
                                            fontSize="16px"
                                            max={6}
                                            placeholder="Yes"
                                        />
                                    </div>
                                    <div className="col-4 endDate d-inline-block ps-4">
                                        <label>Start Date</label>
                                        <div className="endDate_input">
                                            <p>Monday, October 27, 2023</p>
                                            <img src={DateCalander} alt="" style={{ width: "23px", height: "23px" }} />
                                        </div>
                                    </div>
                                    <div className="col-4 endDate d-inline-block ps-4">
                                        <label>End Date</label>
                                        <div className="endDate_input">
                                            <p>Monday, October 27, 2023</p>
                                            <img src={DateCalander} alt="" style={{ width: "23px", height: "23px" }} />
                                        </div>
                                    </div>
                                </div>
                            </CustomDiv>
                        </div>
                        <div className="timeTableBottom-header">
                            <h3 className="timetable-heading">Session Timings by Day</h3 >
                        </div>
                    </Form >

                );
            }}
        </Formik >

    );
};
