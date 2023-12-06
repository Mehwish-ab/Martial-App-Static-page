import React from "react";
import { Form } from "antd";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { useSelector } from "react-redux";

import { CreateTimeTableInitialValues } from "../constant";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { RootState } from "../../../redux/store";
import TimeTableForm from "./TimeTableForm";
import TimeTableSheet from "./TimeTableSheet";

const CreateTimeTable: React.FC = () => {
    const { getLabelByKey } = useScreenTranslation("listTimeTable");

    const navigate = useNavigate();


    const { loading } = useSelector(
        (state: RootState) => state.timeTableData
    );

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
            {loading && <LoadingOverlay message="" />}

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
                            <TimeTableForm />
                            <TimeTableSheet />
                        </Form >
                    );
                }}
            </Formik >
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

};
