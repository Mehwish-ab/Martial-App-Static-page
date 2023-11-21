import React from "react";
import { Form } from "antd";
import { ErrorMessage, Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import CustomButton, { CustomDiv } from "../../../components/CustomButton/CustomButton";
import StatusActiveError from "../../../assets/images/activeBtnError.svg";
import FormControl from "../../../components/FormControl";
import { useSelector } from "react-redux";




import DateCalander from "../../../assets/images/dateCalander.svg";
import {
    darkBlue,
    darkGery,
    fontFamilyBold,
    tertiaryBlue2,
    fontFamilyMedium,
    // mainColor,
} from "../../../components/GlobalStyle";
import { CreateTimeTableStyled } from "./styles";
import { Table } from "antd";
import { CreateTimeTableInitialValues } from "../constant";
// import { FormControl } from "react-bootstrap";

const CreateTimeTable = () => {
    return <>
        <CreateTimeTableStyled>
            <RenderTableTitle />
        </CreateTimeTableStyled>
    </>;
};

export default CreateTimeTable;


const RenderTableTitle = () => {
    const navigate = useNavigate();
    const { getLabelByKey } = useScreenTranslation("listTimeTable");

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
                        <div className="">
                            <h3 className="table-heading" >Time Table</h3 >
                            <CustomDiv>
                                <div className="col-4">
                                    <FormControl
                                        control="input"
                                        type="text"
                                        name="instructorName"
                                        label="Instructor Name"
                                        padding="10px"
                                        fontFamily={fontFamilyMedium}
                                        fontSize="16px"
                                        max={6}
                                        placeholder="Instructor Name"
                                    />
                                </div>
                                <div className="col-8">
                                    <div className="col-4"></div>
                                    <div className="col-4"></div>
                                    <div className="col-4"></div>
                                </div>
                            </CustomDiv>

                        </div >
                    </Form>
                );
            }}
        </Formik >
    );
};
