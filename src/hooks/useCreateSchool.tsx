import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { CreateSchoolInitialValues } from "../screens/Home/constants";
import axios from "axios";
import {
  authorizationToken,
  create_school_url,
  edit_school_url,
} from "../utils/api_urls";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loginDataTypes } from "../redux/features/types";
const useCreateSchool = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isUploadImgModalVisible, setIsUploadImgVisible] = useState(false);
  const toastId = useRef<any>(null);
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const { loginData } = useSelector((state: RootState) => state);
  const handleSubmit = async (
    values: CreateSchoolInitialValues,
    { resetForm }: any
  ) => {
    const userDetails = loginData.data?.userDetails;
    const jwtDetails = loginData.data?.jwtDetails;

    const payload = {
      userId: userDetails?.id || "",
      businessName: values.businessName,
      businessType: values.businessType,
      address: values.address,
      phoneNumber: values?.businessPhoneNumber || "",
      belts: values.belts == "1" ? true : false,
      languageId: values.defaultLanguage,
      currencyId: values.defaultCurrency,
      activities: values.selectedActivities.join(","),
      facilities: values.selectedActivities.join(","),
      description: values.description,
      stripePublicKey: values.stripePublishableKey,
      stripeSecretKey: values.stripeSecretKey,
      gclAccessToken: values.cardAccessToken,
      gclClientId: values.cardClientId,
      gclWebHook: values.cardWebHook,
      gclClientSecret: values.cardClientSecret,

      ...(schoolId && { schoolId }), // Add schoolId conditionally
    };

    let endpoint = schoolId ? edit_school_url : create_school_url;
    try {
      setError("");
      setLoading(true);
      const { data } = await axios.post(endpoint, payload, {
        headers: {
          ...authorizationToken(loginData.data as loginDataTypes),
        },
      });
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
      console.log({ data });
      // setIsUploadImgVisible(true);
      navigate("/");
      resetForm();
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
    isUploadImgModalVisible,
    setIsUploadImgVisible,
  };
};

export default useCreateSchool;
