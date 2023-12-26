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
  const [isShowModal, setIsShowModal] = useState(false);
  const [data, setData] = useState<unknown>({});

  const handleSubmit = async (
    values: CreateFranchiseInitialValues,
    { resetForm }: any
  ) => {
    const userDetails = loginData.data?.userDetails;
    console.log("values", values);
    const payload = {
      franchiseName: values.franchiseName,
      franchiseType: values.franchiseType,
      address: values.address,
      phoneNumber: values?.franchisePhoneNumber || "",
      rank: values.rank == "1" ? true : false,
      activities: values.selectedActivities.join(","),
      facilities: values.selectedFacilities.join(","),
      description: values.description,
      schoolId: schoolData.schoolId || loginData.data?.schoolId,
      defaultCurrencyId: values.defaultCurrency,
      defaultLanguageId: values.defaultLanguage,
      // schoolPaypalMethod:false,
      // schoolCashMethod:false,
      // schoolBankAccountMethod:false,
      // schoolStripeMethod:false,
      // schoolGclMethod:false,
      // stripePublicKey: values.stripePublishableKey,
      // stripeSecretKey: values.stripeSecretKey,
      // gclAccessToken: values.cardAccessToken,
      // gclClientId: values.cardClientId,
      // gclWebHook: values.cardWebHook,
      // gclClientSecret: values.cardClientSecret,
      // schoolStripeMethod: values.schoolStripeMethod,
      // schoolGclMethod: values.schoolGclMethod,
    };

    let endpoint = branchId ? edit_branch_url : create_branch_url;
    try {
      setError("");
      setLoading(true);
      const { data } = await axios.post("/franchise/create", payload, {
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
      navigate("/franchise/list");
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

  const viewFranchisebyid = async (franchiseId: number) => {
    try {
      setError("");
      setLoading(true);
      const { data } = await axios.post(
        "/franchise/getDetailsById",
        { franchiseId },
        {
          headers: {
            ...authorizationToken(loginData.data as loginDataTypes),
          },
        }
      );

      if (data.responseCode === "500") {
        setLoading(false);
        return;
      }
      console.log("franchise info", data.results);
      setLoading(false);
      return data.results;
    } catch (error: any) {
      console.log("error", error);
      setLoading(false);
      setError(error);
    }
  };

  const editFranchise = async (
    franchiseId: any,
    values: CreateFranchiseInitialValues
  ) => {
    const url = "/franchise/edit";
    const userDetails = loginData.data?.userDetails;

    try {
      setError("");
      setLoading(true);

      const payload = {
        userId: userDetails?.id || "",
        franchiseId: franchiseId,
        franchiseName: values.franchiseName,
        franchiseType: values.franchiseType,
        address: values.address,
        phoneNumber: values?.franchisePhoneNumber || "",
        rank: values.rank == "1" ? true : false,
        defaultLanguageId: values.defaultLanguage,
        defaultCurrencyId: values.defaultCurrency,
        activities: values.selectedActivities.join(","),
        facilities: values.selectedFacilities.join(","),
        description: values.description,
        franchiseStatusId: 1,
        // schoolId: schoolData.schoolId,
        schoolId: 3,
        ...(franchiseId && { franchiseId }),
      };
      console.log("Payload", payload);

      const { data } = await axios.post(url, payload, {
        headers: {
          ...authorizationToken(loginData.data as loginDataTypes),
        },
      });
      if (data.responseCode === "500") {
        setLoading(false);
        return data.response;
      }

      setIsShowModal(true);
      setTimeout(() => {
        setLoading(false);
        setIsShowModal(false);
        navigate("/school/view");
      }, 3000);

      console.log({ data });
    } catch (error: any) {
      console.log({ error });
      setLoading(false);
      setError(error.response.data.responseMessage);
      let id = setTimeout(() => {
        setError("");
      }, 3000);
      // if (!setIsShowModal) {
      //   clearTimeout(id);
      // }
      // toastId.current = toast(error.response.data.errors, {
      //   type: "error",
      //   autoClose: 1000,
      // });
    }
  };

  const getFranchisebyid = async (franchiseId: any) => {
    try {
      setError("");
      setLoading(true);
      const { data } = await axios.post(
        "/franchise/getDetailsById",
        { franchiseId },
        {
          headers: {
            ...authorizationToken(loginData.data as loginDataTypes),
          },
        }
      );

      if (data.responseCode === "500") {
        setLoading(false);
        return;
      }
      console.log("franchise info", data.results);
      setLoading(false);
      return data.results;
    } catch (Error: any) {
      console.log("error", Error);
      setLoading(false);
      setError(Error);
    }
  };

  const deleteFranchise = async (franchiseId: number) => {
    const url = "/franchise/delete";
    console.log(franchiseId);

    console.log(">> im in deletefranchise button");

    try {
      setError("");
      setLoading(true);
      const { data } = await axios.post(
        url,
        { franchiseId },
        {
          headers: {
            ...authorizationToken(loginData.data as loginDataTypes),
          },
        }
      );
      if (data.responseCode === "500") {
        toast(data.responseMessage, {
          type: "error",
          autoClose: 1000,
        });
        setLoading(false);
        return;
      }
      // toastId.current = toast(data.responseMessage, {
      //   type: "success",
      //   autoClose: 1000,
      // });
      setIsShowModal(true);
      setTimeout(() => {
        setLoading(false);
        setIsShowModal(false);
        navigate("/branch/list");
      }, 3000);
      setData("results: " + data);
      console.log("data", { data });
      setLoading(false);
      // navigate("/school");
    } catch (error: any) {
      console.log("api error", error);
      setError(error.response.data.responseMessage);
      setLoading(false);
      console.log(error.response.data.responseMessage, "error in api data");
    }
  };

  return {
    loading,
    handleSubmit,
    viewFranchisebyid,
    editFranchise,
    deleteFranchise,
    getFranchisebyid,
    error,
  };
};

export default useFranchise;
