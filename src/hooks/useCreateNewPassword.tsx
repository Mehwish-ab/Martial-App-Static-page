import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/context";
import { reset_password_url, useCaseForgetPassowrd } from "../utils/api_urls";
import { OtpPropValues } from "../screens/ForgetPassword/Otp/Otp";
import { createNewPasswordValuesType } from "../screens/ForgetPassword/CreatePassword/CreatePassword";

const useCreateNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toastId = useRef<any>(null);
  const { userPhoneNumber } = useGlobalContext();

  console.log(location, "location");
  const handleSubmit = async (values: createNewPasswordValuesType) => {
    console.log(values, "reset password ");
    const payload = {
      phoneNumber: userPhoneNumber,
      password: values.password,
      resetPasswordToken: location?.state?.resetPasswordToken || "",
    };
    try {
      setError("");
      setLoading(true);
      const { data } = await axios.post(reset_password_url, payload);
      if (data.responseCode === "500") {
        toast(data.responseMessage, {
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
      navigate("/register/create-new-password");
      console.log({ data });
    } catch (error: any) {
      console.log({ error });
      setLoading(false);
      setError(error.response.data.responseMessage);
      setTimeout(() => {
        setError("");
      }, 2000);
      toastId.current = toast(error.response.data.responseMessage, {
        type: "error",
        autoClose: 1000,
      });
    }
  };
  return {
    loading,
    handleSubmit,
    error,
  };
};

export default useCreateNewPassword;
