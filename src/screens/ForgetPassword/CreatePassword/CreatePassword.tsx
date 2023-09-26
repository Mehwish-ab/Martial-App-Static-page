import React from "react";
import ForgetPasswordStyle from "../style";
import Head from "../../../components/Head/Head";
import { Formik } from "formik";
import { Form } from "antd";
import FormControl from "../../../components/FormControl";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark,
} from "../../../components/GlobalStyle";
import lock_icon from "../../../assets/icons/password.svg";
import { validationFinder } from "../../../utils/utilities";
import * as Yup from "yup";
import CustomButton from "../../../components/CustomButton/CustomButton";
import useCreateNewPassword from "../../../hooks/useCreateNewPassword";
export interface createNewPasswordValuesType {
  password: string;
  confirmPassword?: string;
}
const CreatePassword: React.FC = () => {
  const initialValues: createNewPasswordValuesType = {
    password: "",
    confirmPassword: "",
  };

  const password = validationFinder("PASSWORD")!;
  const passwordReg = new RegExp(password.pattern);

  const validationSchema = Yup.object({
    password: Yup.string()
      .required(password.notBlankMsgEn)
      .matches(passwordReg, password.patternMsgEn),
    confirmPassword: Yup.string()
      .required("confirm password is required!")
      .oneOf([Yup.ref("password")], "passwords must match"),
  });
  const { handleSubmit } = useCreateNewPassword();
  return (
    <>
      <Head title="Create New Password" />

      <ForgetPasswordStyle>
        <div className="forget-password-container overflow-auto">
          <div className="forget-password-container-card">
            <h6 className="title">Create New Password</h6>
            <p className="text-center forget-password-text mt-20">
              Your new password must be different from previous used passwords.
            </p>
            <div className="forget-password-container-card-form w-100">
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
                      <div className="mt-20">
                        <FormControl
                          control="password"
                          type="text"
                          name="password"
                          label="Password"
                          padding="0px"
                          fontFamily={fontFamilyMedium}
                          prefix={<img src={lock_icon} alt="lock_icon" />}
                          max={6}
                          border="none"
                          placeholder="Enter Password"
                          className={
                            formik.errors.password && formik.touched.password
                              ? "is-invalid"
                              : "customPasswordInput"
                          }
                        />
                      </div>
                      <div className="mt-20">
                        <FormControl
                          control="password"
                          type="text"
                          name="confirmPassword"
                          fontFamily={fontFamilyMedium}
                          prefix={<img src={lock_icon} alt="lock_icon" />}
                          border="none"
                          label="Confirm Password"
                          padding="0px"
                          placeholder="Enter Confirm passcode"
                          className={
                            formik.errors.confirmPassword &&
                            formik.touched.confirmPassword
                              ? "is-invalid"
                              : "customPasswordInput"
                          }
                        />
                      </div>
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

export default CreatePassword;
