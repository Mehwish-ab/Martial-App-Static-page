import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  authorizationToken,
  create_branch_url,
  edit_branch_url,
} from "../../../utils/api_urls";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { loginDataTypes } from "../../../redux/features/types";
import { CreateFranchiseInitialValues } from "../constant";
const useFranchise = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toastId = useRef<any>(null);
  const { branchId } = useParams();
  const navigate = useNavigate();
  const { loginData } = useSelector((state: RootState) => state);
  const { schoolData } = useSelector((state: RootState) => state.dashboardData);
  const handleSubmit = async (
    values: CreateFranchiseInitialValues,
    { resetForm }: any
  ) => {
    const userDetails = loginData.data?.userDetails;
    console.log("values", values);
    const payload = {
      userId: userDetails?.id || "",
      // branchName: values.branchName,
      // branchType: values.branchType,
      address: values.address,
      // phoneNumber: values?.branchPhoneNumber || "",
      belts: values.ranks == "1" ? true : false,
      activities: values.selectedActivities.join(","),
      facilities: values.selectedActivities.join(","),
      description: values.description,
      schoolId: schoolData.schoolId || loginData.data?.schoolId,
      // stripePublicKey: values.stripePublishableKey,
      // stripeSecretKey: values.stripeSecretKey,
      // gclAccessToken: values.cardAccessToken,
      // gclClientId: values.cardClientId,
      // gclWebHook: values.cardWebHook,
      // gclClientSecret: values.cardClientSecret,
      // schoolStripeMethod: values.schoolStripeMethod,
      // schoolGclMethod: values.schoolGclMethod,

      ...(branchId && { branchId }), // Add schoolId conditionally
    };

    let endpoint = branchId ? edit_branch_url : create_branch_url;
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
      navigate("/branch/list");
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
  };
};

export default useFranchise;
