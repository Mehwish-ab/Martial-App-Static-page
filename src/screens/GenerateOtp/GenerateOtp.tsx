import { ErrorMessage, Formik } from "formik";
import logo from "../../assets/icons/ic_logo.svg";
import CustomButton from "../../components/CustomButton/CustomButton";
import { ImgContainer, primaryColor } from "../../components/GlobalStyle";
import RegisterPhoneStyle from "./style";
import * as Yup from "yup";
import CustomPhoneInput from "../../components/CustomInputNumber/CustomPhoneInput";
import { useAppSelector } from "../../app/hooks";
import Errormsg from "../../components/ErrorMessage";
import { Form } from "antd";
import Head from "../../components/Head/Head";
import useGenerateOtp from "../../hooks/useGenerateOtp";

export type registerPhoneTypes = {
  phoneNumber: string;
};

const RegisterPhone = () => {
  const { loading, handleSubmit, error } = useGenerateOtp();

  // get Validations from redux appData
  const {
    countryName: {
      results: {
        countryCode,
        countryFlagURL,
        examplePhoneNumber,
        name,
        phoneNumberLength,
      },
    },
    validations,
  } = useAppSelector((state) => state.appData.data);

  // user validations
  const phoneNumber = validations[countryCode === "92" ? 23 : 4];
  // user regExpressions
  const phoneNumberReg = new RegExp(phoneNumber.pattern);

  // initial values
  const initialValues: registerPhoneTypes = {
    phoneNumber: "",
  };
  // validation schema
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required(phoneNumber.notBlankMsgEn)
      .matches(phoneNumberReg, phoneNumber.pattern),
  });

  return (
    <>
      <Head title="generate-otp" />
      <RegisterPhoneStyle>
        <div className="inner-container">
          <ImgContainer src={logo} alt="logo" height="50px" width="164px" />
          <p className="message">
            Please enter your mobile number for verification and to start the
            registration process.
          </p>
          <div className="mt-3">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => {
                return (
                  <Form
                    name="basic"
                    onFinish={formik.handleSubmit}
                    autoComplete="off"
                  >
                    <div className="mt-2">
                      <CustomPhoneInput
                        countryNumber={countryCode}
                        placeholder={examplePhoneNumber}
                        countryFlag={countryFlagURL}
                        phoneLength={10}
                        phoneValueHandler={(value: number | string) =>
                          formik.setFieldValue("phoneNumber", value)
                        }
                        name="phoneNumber"
                        countryName={name}
                        value={formik.values.phoneNumber}
                      />
                      <div className="mt-2">
                        <ErrorMessage name="phoneNumber" component={Errormsg} />
                      </div>
                    </div>
                    <div className="mt-3">
                      <CustomButton
                        bgcolor={primaryColor}
                        color="white"
                        padding="8px 8px"
                        width="100%"
                        type="submit"
                        title="SUBMIT"
                        margin="auto"
                        fontSize="16px"
                        loading={loading}
                      />
                    </div>
                    <p className="text-danger mt-2 mb-0">{error}</p>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </RegisterPhoneStyle>
    </>
  );
};

export default RegisterPhone;
