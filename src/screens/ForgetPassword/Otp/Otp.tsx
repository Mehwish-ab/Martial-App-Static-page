import React, { useEffect, useState } from "react";
import OtpStyled from "./style";
import Head from "../../../components/Head/Head";
import ForgetPasswordStyle from "../style";
import { Field, FieldProps, Formik } from "formik";
import * as Yup from "yup";
import { Button, Form, Input } from "antd";
import FormControl from "../../../components/FormControl";
import {
  fontFamilyMedium,
  lightBlue3,
  lightDark3,
  pureDark,
} from "../../../components/GlobalStyle";
import CustomButton from "../../../components/CustomButton/CustomButton";
import OtpInputsStyled from "./style";
import useVerifyOtp from "../../../hooks/useVerifyOtp";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { OTP_SCREEN_LABEL_KEYS } from "../constants";
import { useGlobalContext } from "../../../context/context";

export interface OtpPropValues {
  input0: string;
  input1: string;
  input2: string;
  input3: string;
}
const Otp: React.FC = () => {
  const initialValues: OtpPropValues = {
    input0: "",
    input1: "",
    input2: "",
    input3: "",
  };
  const { getLabelByKey } = useScreenTranslation("veriﬁcationPin");
  const { userPhoneNumber } = useGlobalContext();

  const validationSchema = Yup.object().shape({
    input0: Yup.string()
      .matches(/^\d$/, "Enter a single digit")
      .required("Otp is required!"),
    input1: Yup.string()
      .matches(/^\d$/, "Enter a single digit")
      .required("Otp is required!"),
    input2: Yup.string()
      .matches(/^\d$/, "Enter a single digit")
      .required("Otp is required!"),
    input3: Yup.string()
      .matches(/^\d$/, "Enter a single digit")
      .required("Otp is required!"),
  });

  const initialTimer = { minutes: 2, seconds: 0 };
  const [timer, setTimer] = useState(initialTimer);

  const { handleSubmit, loading } = useVerifyOtp();
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (timer.seconds === 0) {
  //       if (timer.minutes === 0) {
  //         // Handle OTP expiration here
  //         console.log("OTP has expired");
  //         setTimer(initialTimer); // Reset timer to 2 minutes
  //       } else {
  //         setTimer({ minutes: timer.minutes - 1, seconds: 59 });
  //       }
  //     } else {
  //       setTimer({ minutes: timer.minutes, seconds: timer.seconds - 1 });
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [timer]);

  const formatTimer = () => {
    const { minutes, seconds } = timer;
    let timerText = "";
    if (minutes > 0) {
      timerText += `The OTP will expire in ${minutes} minute${minutes > 1 ? "s" : ""
        }`;
    }
    if (seconds > 0) {
      if (minutes > 0) {
        timerText += " and ";
      }
      timerText += `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
    return timerText;
  };

  return (
    <>
      <Head title="Veriﬁcation one time pin" />

      <ForgetPasswordStyle>
        <div>
          <div className="forget-password-container-card">
            <div className="forget-password-container-card-inner">
              <h6 className="title text-center">
                {getLabelByKey(OTP_SCREEN_LABEL_KEYS.title)}
              </h6>
              <p className="text-center forget-password-text mt-10">
                {getLabelByKey(OTP_SCREEN_LABEL_KEYS.subtitle)}
              </p>
              <h6 className="forget-password-phoneNumber text-center">{userPhoneNumber}</h6>
              <div className="forget-password-container-card-form w-100">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleSubmit, errors, touched, values }) => (
                    <Form onFinish={handleSubmit}>
                      <OtpInputsStyled>
                        {[0, 1, 2, 3].map((index) => {
                          return (
                            <>
                              <Field name={`input${index}`} key={index}>
                                {({ field, meta }: FieldProps<string>) => (
                                  <Input
                                    {...field}
                                    className="customInput otp-input"
                                    placeholder="-"
                                    maxLength={1}
                                    onKeyUp={(e) => {
                                      if (e.key.match(/^\d$/)) {
                                        const nextIndex =
                                          index < 3 ? index + 1 : index;
                                        if (
                                          (values as any)[`input${nextIndex}`] ===
                                          ""
                                        ) {
                                          const nextField =
                                            document.getElementsByName(
                                              `input${nextIndex}`
                                            )[0];
                                          nextField?.focus();
                                        }
                                      }
                                    }}
                                  />
                                )}
                              </Field>
                            </>
                          );
                        })}
                      </OtpInputsStyled>

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
                            OTP_SCREEN_LABEL_KEYS.sumbitButton
                          )}
                          fontSize="16px"
                          margin="0px 0px 16px 0px"
                          loading={loading}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>

              </div>
            </div>

          </div>
          <p className="text-center forget-password-OTPtext mt-3">
            {formatTimer()}
          </p>
        </div>
      </ForgetPasswordStyle>
    </>
  );
};

export default Otp;
