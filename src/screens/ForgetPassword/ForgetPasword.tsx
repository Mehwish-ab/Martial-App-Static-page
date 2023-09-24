import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import FormControl from "../../components/FormControl";
import CustomButton from "../../components/CustomButton/CustomButton";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark,
} from "../../components/GlobalStyle";
import ForgetPasswordStyle from "./style";
import email_icon from "../../assets/icons/ic_email.svg";
import Head from "../../components/Head/Head";

// initial values types
type forgetPasswordInitialTypes = {
  email: string;
};

const ForgetPassword = () => {
  // initialValues
  const initialValues: forgetPasswordInitialTypes = {
    email: "",
  };

  // validation schema
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required!"),
  });

  return (
    <>
      <Head title="forget-password" />

      <ForgetPasswordStyle>
        <div className="forget-password-container overflow-auto">
          <div className="forget-password-container-card">
            <h6 className="title">Forget Password</h6>
            <p className="text-center forget-password-text mt-20">
              Enter the email associated with your account and we'll send an
              email with instructions to reset your password.
            </p>
            <div className="forget-password-container-card-form w-100">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => {}}
              >
                {(formik) => {
                  return (
                    <Form
                      name="basic"
                      onFinish={formik.handleSubmit}
                      autoComplete="off"
                    >
                      <div className="input-fields w-100 mt-20">
                        <FormControl
                          control="input"
                          type="text"
                          name="email"
                          fontSize="14px"
                          label="Email"
                          labelFamily="EnnVisionsMedium"
                          placeholder="Enter Email"
                          border="none"
                          borderRadius="10px"
                          fontFamily="EnnVisionsMedium"
                          labelMarginBottom="8px"
                          padding="0px"
                          prefix={<img src={email_icon} alt="email_icon" />}
                          className={
                            formik.errors.email && formik.touched.email
                              ? "is-invalid"
                              : "customInput"
                          }
                          textAlign="end"
                        />

                        <div className="mt-20">
                          <CustomButton
                            bgcolor={lightBlue3}
                            textTransform="Captilize"
                            color={pureDark}
                            padding="8px"
                            fontFamily={`${fontFamilyMedium}`}
                            width="100%"
                            type="submit"
                            title="Submit"
                            fontSize="14px"
                            loading={false}
                          />
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </ForgetPasswordStyle>
    </>
  );
};

export default ForgetPassword;
