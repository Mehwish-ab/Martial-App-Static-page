import React from "react";
import { Form } from "antd";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { CreateTimeTableInitialValues } from "../constant";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { RootState } from "../../../redux/store";
import TimeTableForm from "./TimeTableForm";
import TimeTableSheet from "./TimeTableSheet";

const CreateTimeTable: React.FC = () => {

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