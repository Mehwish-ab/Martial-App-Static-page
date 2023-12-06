import React, { useState } from "react";
import { Dropdown, Form, Space } from "antd";
import { ErrorMessage, Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import CustomButton from "../../../components/CustomButton/CustomButton";
import StatusActiveError from "../../../assets/images/activeBtnError.svg";
import Clock from "../../../assets/icons/ic_clock.svg";
import FormControl from "../../../components/FormControl";
import { useSelector } from "react-redux";
import actionMenuTogglerIcon from "../../../assets/icons/ic_action_menu_toggler.svg";
import DummyData from "./dummyData.json";
import { Col, Row } from "react-bootstrap";

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
// import { CreateTimeTableStyled } from "./styles";
// import { FilterTimeTableStyled } from "./styles";
import { Table } from "antd";
import { CreateTimeTableInitialValues } from "../constant";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { TimeTableDataType } from "../../../redux/features/TimeTable/TimeTableSlice";
import { RootState } from "../../../redux/store";
import { ColumnsType } from "antd/lib/table";
import { InformationTimeTableStyle } from "./styles";
// import { FormControl } from "react-bootstrap";


const InformationTimeTableSheet: React.FC = () => {

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
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [current, setCurrent] = useState(1);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = { selectedRowKeys, onChange: onSelectChange };

    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <InformationTimeTableStyle>
                <Table
                    columns={columns}
                    dataSource={DummyData as any}
                    title={() => <RenderTableTitle />}
                    scroll={{ x: true }}
                    pagination={false}
                />
            </InformationTimeTableStyle>
        </>
    );
};
export default InformationTimeTableSheet;


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
            <h3 className="timetable-heading">Session Timings by Day</h3 >
        </>

    );
};