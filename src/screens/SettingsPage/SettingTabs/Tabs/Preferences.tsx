import { FC, Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CustomModal from "../../../../components/Modal/CustomModal";
import { EditPopUpStying } from "./EditPopUpStying";
import FormControl from "../../../../components/FormControl";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import { fontFamilyMedium, lightBlue3, pureDark2 } from "../../../../components/GlobalStyle";
import { Form, Formik } from "formik";
import { CreateSchoolInitialValues } from "../../../Home/constants";
import useCreateSchool from "../../../../hooks/useCreateSchool";



const Preferences: FC<{}> = () => {
    const [isLanguageModalVisible, setIsLanguageModelVisible] = useState(false);
    const [isCurrencyModalVisible, setIsCurrencyModelVisible] = useState(false);
    const [isAccesssibilityModalVisible, setIsAccesssibilityModelVisible] = useState(false);
    const { handleCreateSubmit } = useCreateSchool();

    const initialValues: CreateSchoolInitialValues = {
        businessName: "",
        businessType: "",
        address: "",
        businessPhoneNumber: "",
        defaultLanguage: "",
        defaultCurrency: "",
        description: "",
        rank: 0,
        defaultCurrencyId: 0,
        defaultLanguageId: 0,
        selectedActivities: [],
        selectedFacilities: [],
    };

    return (
        <Fragment>
            <div className="panel-heading">
                <h3>Preferences</h3>
                <p>
                    Change your language, currency and accessibility requirements.
                </p>
            </div>
            <div>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading">Currency</h4>
                    </Col>
                    <Col md="8">
                        <p className="m-0 panel-body-text">£ (British Pound Sterling)</p>
                    </Col>
                    <Col md="2" className="text-end">
                        <span onClick={() => setIsCurrencyModelVisible(true)} className="panel-body-link">
                            Edit
                        </span>
                    </Col>
                </Row>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading">Language</h4>
                    </Col>
                    <Col md="8">
                        <p className="m-0 panel-body-text">English</p>
                    </Col>
                    <Col md="2" className="text-end">
                        <span onClick={() => setIsLanguageModelVisible(true)} className="panel-body-link">
                            Edit
                        </span>
                    </Col>
                </Row>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading">Accessibility requirements</h4>
                    </Col>
                    <Col md="8">
                        <p className="m-0 panel-body-text">Filter out properties that don’t meet your needs</p>
                    </Col>
                    <Col md="2" className="text-end">
                        <span onClick={() => setIsAccesssibilityModelVisible(true)} className="panel-body-link">
                            Edit
                        </span>
                    </Col>
                </Row>
            </div>
            <CustomModal
                width="485px"
                showCloseBtn={false}
                children={
                    <>
                        <EditPopUpStying>
                            <h3>Update Language</h3>
                            <p>Update your information and find out how it's used.</p>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleCreateSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form
                                            name="basic"
                                            autoComplete="off"
                                        >
                                            <Row>
                                                <Col md="12" className="mt-10">
                                                    <FormControl
                                                        control="select"
                                                        type="select"
                                                        name="countryName"
                                                        labelFamily={`${fontFamilyMedium}`}
                                                        label="Select your language"
                                                        fontSize="16px"
                                                        max={6}
                                                        placeholder="English"
                                                    />
                                                </Col>
                                                <Col md="12" className="mt-20">
                                                    <CustomButton
                                                        bgcolor={lightBlue3}
                                                        textTransform="Captilize"
                                                        color={pureDark2}
                                                        padding="12.5px"
                                                        fontFamily={fontFamilyMedium}
                                                        width="100%"
                                                        type="submit"
                                                        title="Save"
                                                        fontSize="16px"
                                                        loading={false}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </EditPopUpStying>
                    </>
                } isModalVisible={isLanguageModalVisible} setIsModalVisible={setIsLanguageModelVisible} />

            <CustomModal
                width="485px"
                showCloseBtn={false}
                children={
                    <>
                        <EditPopUpStying>
                            <h3>Update Currency</h3>
                            <p>Update your information and find out how it's used.</p>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleCreateSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form
                                            name="basic"
                                            autoComplete="off"
                                        >
                                            <Row>
                                                <Col md="12" className="mt-10">
                                                    <FormControl
                                                        control="select"
                                                        type="select"
                                                        name="countryName"
                                                        labelFamily={`${fontFamilyMedium}`}
                                                        label="Select your currency"
                                                        fontSize="16px"
                                                        max={6}
                                                        placeholder="GBP"
                                                    />
                                                </Col>
                                                <Col md="12" className="mt-20">
                                                    <CustomButton
                                                        bgcolor={lightBlue3}
                                                        textTransform="Captilize"
                                                        color={pureDark2}
                                                        padding="12.5px"
                                                        fontFamily={fontFamilyMedium}
                                                        width="100%"
                                                        type="submit"
                                                        title="Save"
                                                        fontSize="16px"
                                                        loading={false}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </EditPopUpStying>
                    </>
                } isModalVisible={isCurrencyModalVisible} setIsModalVisible={setIsCurrencyModelVisible} />

            <CustomModal
                width="485px"
                showCloseBtn={false}
                children={
                    <>
                        <EditPopUpStying>
                            <h3>Update Accessible</h3>
                            <p>Update your information and find out how it's used.</p>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleCreateSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form
                                            name="basic"
                                            autoComplete="off"
                                        >
                                            <Row>
                                                <Col md="12" className="mt-10">
                                                    <FormControl
                                                        control="select"
                                                        type="select"
                                                        name="countryName"
                                                        labelFamily={`${fontFamilyMedium}`}
                                                        label="Only show accessible properties"
                                                        fontSize="16px"
                                                        max={6}
                                                        placeholder="Yes"
                                                    />
                                                </Col>
                                                <Col md="12" className="mt-20">
                                                    <CustomButton
                                                        bgcolor={lightBlue3}
                                                        textTransform="Captilize"
                                                        color={pureDark2}
                                                        padding="12.5px"
                                                        fontFamily={fontFamilyMedium}
                                                        width="100%"
                                                        type="submit"
                                                        title="Save"
                                                        fontSize="16px"
                                                        loading={false}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </EditPopUpStying>
                    </>
                } isModalVisible={isAccesssibilityModalVisible} setIsModalVisible={setIsAccesssibilityModelVisible} />
        </Fragment >
    );
};
export default Preferences;
