import React from "react";
import ForgetPasswordStyle from "../style";
import Head from "../../../components/Head/Head";
import { Formik } from "formik";
import { Form } from "antd";
import FormControl from "../../../components/FormControl";
import { useNavigate } from "react-router-dom";
import {
  fontFamilyMedium,
  pureDark,
} from "../../../components/GlobalStyle";
import { validationFinder } from "../../../utils/utilities";
import * as Yup from "yup";
import CustomButton from "../../../components/CustomButton/CustomButton";
import useCreateNewPassword from "../../../hooks/useCreateNewPassword";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { PASSWORD_SCREEN_LABEL_KEYS } from "../constants";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
import CloseBtn from "../../../assets/icons/ic_back.svg"

export interface createNewPasswordValuesType {
  password: string;
  confirmPassword?: string;
}
const CreatePassword: React.FC = () => {
  const navigate = useNavigate();
  const { getLabelByKey } = useScreenTranslation("restPassword");
  // const { selectedLanguage } = useSelector(
  //   (state: RootState) => state.selectedLanguage
  // );
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
  const { handleSubmit, loading } = useCreateNewPassword();
  return (
    <>
      <Head title="Create New Password" />

      <ForgetPasswordStyle>
        <div className="forget-password-container overflow-auto">
          <div className="forget-password-container-card">
            <div className="forget-password-container-card-inner position-relative ">
              <img src={CloseBtn} alt="" className="closeButtonIcon" onClick={() => navigate("/login")} />
              <h6 className="create-title text-center mt-20">
                {/* {getLabelByKey(PASSWORD_SCREEN_LABEL_KEYS.title)} */}
                Create New Password
              </h6>
              <p className="text-center create-password-text mt-10">
                {/* {getLabelByKey(PASSWORD_SCREEN_LABEL_KEYS.subtitle)} */}
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
                            // label={getLabelByKey(
                            //   PASSWORD_SCREEN_LABEL_KEYS.passcodeFieldTitle
                            // )}
                            label="New Password"
                            fontFamily={fontFamilyMedium}
                            max={6}
                            placeholder={getLabelByKey(
                              PASSWORD_SCREEN_LABEL_KEYS.passcodeFieldPlaceholder
                            )}
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
                            label={getLabelByKey(
                              PASSWORD_SCREEN_LABEL_KEYS.confrimPasscodeFieldTitle
                            )}
                            placeholder={getLabelByKey(
                              PASSWORD_SCREEN_LABEL_KEYS.confrimPasscodeFieldPlaceholder
                            )}
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
                            bgcolor="#C0E9F9"
                            textTransform="Captilize"
                            color={pureDark}
                            padding="13.5px"
                            fontFamily={`${fontFamilyMedium}`}
                            width="100%"
                            type="submit"
                            title={getLabelByKey(
                              PASSWORD_SCREEN_LABEL_KEYS.sumbitButton
                            )}
                            fontSize="16px"
                            loading={loading}
                          />
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </ForgetPasswordStyle>
    </>
  );
};

export default CreatePassword;
