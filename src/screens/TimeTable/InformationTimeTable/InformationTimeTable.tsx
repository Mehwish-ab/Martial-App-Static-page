import React from "react";
import { Form } from "antd";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { useSelector } from "react-redux";
import { CreateTimeTableInitialValues } from "../constant";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { RootState } from "../../../redux/store";
import InformationTimeTableSheet from "./InformationTimeTableSheet";
import InformationTimeTableForm from "./InformationTimeTableForm";

const InformationTimeTable: React.FC = () => {
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
                            <InformationTimeTableForm />
                            <InformationTimeTableSheet />
                        </Form >
                    );
                }}
            </Formik >
        </>
    );
};



export default InformationTimeTable;
