import React from "react";
import { Col, Dropdown, Form, Space } from "antd";
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
import { InformationTimeTableStyle } from "./styles";
import { Table } from "antd";
import { CreateTimeTableInitialValues } from "../constant";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { TimeTableDataType } from "../../../redux/features/TimeTable/TimeTableSlice";
import { RootState } from "../../../redux/store";
import { ColumnsType } from "antd/lib/table";
// import { FormControl } from "react-bootstrap";

const InformationTimeTable: React.FC = () => {
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
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">{DummyData}</div>
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
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">{DummyData}</div>
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
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">{DummyData}</div>
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
                    <div className="list-item mb-0">
                        <div className="list-item-value ms-2">{DummyData}</div>
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
            <InformationTimeTableStyle>
                <Table
                    className="mb-5 "
                    columns={columns}
                    dataSource={DummyData as any}
                    title={() => <RenderTableTitle />}
                    pagination={false}
                />
            </InformationTimeTableStyle>
        </>
    );
};

export default InformationTimeTable;


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
                                    <div className="list-item">
                                        <div className="list-item-title">
                                            Title
                                        </div>
                                        <div className="list-item-value">Karate Classes Schudle</div>
                                    </div>
                                </div>
                                <div className="col-8 d-flex ">
                                    <div className="col-4 repeatField d-inline-block ps-4">
                                        <div className="list-item">
                                            <div className="list-item-title">
                                                Repeat Time Table
                                            </div>
                                            <div className="list-item-value">Yes</div>
                                        </div>
                                    </div>
                                    <div className="col-4 endDate d-inline-block ps-4">
                                        <div className="list-item">
                                            <div className="list-item-title">
                                                Start Date
                                            </div>
                                            <div className="list-item-value">Monday, October 27, 2023</div>
                                        </div>
                                    </div>
                                    <div className="col-4 endDate d-inline-block ps-4">
                                        <div className="list-item">
                                            <div className="list-item-title">
                                                End Date
                                            </div>
                                            <div className="list-item-value">Monday, October 27, 2023</div>
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
