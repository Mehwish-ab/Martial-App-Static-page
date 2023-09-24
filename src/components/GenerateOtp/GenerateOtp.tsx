import { ErrorMessage, Formik } from "formik";
import logo from "../../assets/icons/ic_logo.svg";
import CustomButton from "../../components/CustomButton/CustomButton";
import { ImgContainer, primaryColor } from "../../components/GlobalStyle";
import RegisterPhoneStyle from "./style";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomPhoneInput from "../../components/CustomInputNumber/CustomPhoneInput";
import { useAppSelector } from "../../app/hooks";
import Errormsg from "../../components/ErrorMessage";
import { Form } from "antd";
import axios from "axios";
import { useCaseRegisteration } from "../../utils/api_urls";
import { useRef, useState } from "react";
import { errorTypes } from "../../utils/types";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/context";
import Head from "../../components/Head/Head";

type registerPhoneTypes = {
  phoneNumber: string;
};

const RegisterPhone = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | errorTypes>(null);
  const toastId = useRef<any>(null);
  const { setUserPhoneNumber } = useGlobalContext();
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
  const phoneNumber = validations[15];
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

  // register phone handler
  const handleSubmit = async (values: registerPhoneTypes) => {
    setUserPhoneNumber(values.phoneNumber.toString());
    console.log(values.phoneNumber, "phone number");
    const phoneData = {
      phoneNumber: values.phoneNumber.toString(),
      useCase: useCaseRegisteration,
    };
    try {
      setLoading(true);
      const { data } = await axios.post("generate_otp_url", phoneData);
      if (data.responseCode === "500") {
        toastId.current = toast(data.responseMessage, {
          type: "error",
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }
      toastId.current = toast(data.responseMessage, {
        type: "success",
        autoClose: 1000,
      });
      setLoading(false);
      navigate("/register/verify-otp");
      console.log({ data });
    } catch (error: any) {
      toastId.current = toast(error.responseMessage, {
        type: "error",
        autoClose: 1000,
      });
      setLoading(false);
      setError(error.responseMessage);
    }
  };

  return (
    <>
      <Head title="generate-otp" />
      <RegisterPhoneStyle>
        <div className="inner-container">
          <ImgContainer src={logo} alt="logo" height="33px" width="164px" />
          <p className="message">
            Curabitur sit amet massa nunc. Fusce at tristique magna. Fusce eget
            dapibus dui.
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
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    // validateMessages={validationSchema}
                  >
                    <div className="mt-2">
                      <CustomPhoneInput
                        countryNumber={countryCode}
                        placeholder={examplePhoneNumber}
                        phoneLength={phoneNumberLength}
                        countryFlag={countryFlagURL}
                        phoneValueHandler={(value: number | string) =>
                          formik.setFieldValue("phoneNumber", value)
                        }
                        countryName={name}
                        name="phoneNumber"
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
