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
import { useNavigate, useParams } from "react-router-dom";
import { loginDataTypes } from "../redux/features/types";
import EnnvisionModal from "../components/CustomModals/EnnvisionModal";
import CustomModal from "../components/Modal/CustomModal";
import { useAppSelector } from "../app/hooks";

const useCreateSchool = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isUploadImgModalVisible, setIsUploadImgVisible] = useState(false);
  const toastId = useRef<any>(null);
  const { schoolId } = useParams();
  const [data, setData] = useState<unknown>({});
  const { data: logindata } = useAppSelector((state) => state.loginData);

  const navigate = useNavigate();

  const [isShowModal, setIsShowModal] = useState(false);
  const { loginData } = useSelector((state: RootState) => state);

  // to create School
  const handleCreateSubmit = async (
    values: CreateSchoolInitialValues,
    { resetForm }: any
  ) => {
    console.log(">> im in handleSubmit");
    const userDetails = loginData.data?.userDetails;

    const payload = {
      userId: userDetails?.id || "",
      businessName: values.businessName || "",
      businessType: values.businessType,
      address: values.address || "",
      phoneNumber: values?.businessPhoneNumber || "",
      rank: values.rank === 1 ? true : false,
      defaultLanguageId: values.defaultLanguage,
      defaultCurrencyId: values.defaultCurrency,
      activities: values.selectedActivities.join(","),
      facilities: values.selectedFacilities.join(","),
      description: values.description,
      stripePublicKey: "",
      stripeSecretKey: "",
      gclAccessToken: "",
      gclClientId: "",
      gclWebHook: "",
      gclClientSecret: "",

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
      setIsShowModal(true);
      setTimeout(() => {
        setLoading(false);
        setIsShowModal(false);
        navigate("/school/view");
      }, 3000);
      // toastId.current = toast(data.responseMessage, {
      //   type: "success",
      //   autoClose: 1000,
      // });
      //setLoading(false);
      console.log("data", { data });
      //setIsUploadImgVisible(true);
      // navigate("/");
      resetForm();
    } catch (error: any) {
      console.log("error", { error });
      setLoading(false);
      setError(error.response.data.responseMessage);
      setTimeout(() => {
        setError("");
      }, 2000);
      toastId.current = toast(error.message, {
        type: "error",
        autoClose: 1000,
      });
    }
  };

  //to edit school
  const editSchool = async (
    schoolId: number,
    values: CreateSchoolInitialValues
  ) => {
    const url = edit_school_url;
    const userDetails = loginData.data?.userDetails;

    try {
      setError("");
      setLoading(true);

      const payload = {
        userId: userDetails?.id || "",
        businessName: values.businessName,
        businessType: values.businessType,
        address: values.address,
        phoneNumber: values?.businessPhoneNumber || "",
        rank: values.rank === 1 ? true : false,
        defaultLanguageId: values.defaultLanguage,
        defaultCurrencyId: values.defaultCurrency,
        activities: values.selectedActivities.join(","),
        facilities: values.selectedFacilities.join(","),
        description: values.description,
        stripePublicKey: "",
        stripeSecretKey: "",
        gclAccessToken: "",
        gclClientId: "",
        gclWebHook: "",
        gclClientSecret: "",

        ...(schoolId && { schoolId }), // Add schoolId conditionally
      };

      const { data } = await axios.post(url, payload, {
        headers: {
          ...authorizationToken(loginData.data as loginDataTypes),
        },
      });
      if (data.responseCode === "500") {
        setLoading(false);
        return;
      }

      setIsShowModal(true);
      setTimeout(() => {
        setLoading(false);
        setIsShowModal(false);
        navigate("/school/view");
      }, 3000);

      // navigate("/school/view");
      console.log({ data });
      //setIsUploadImgVisible(true);
      // navigate("/school/view");
    } catch (error: any) {
      console.log({ error });
      setLoading(false);
      setError(error.response.data.responseMessage);
      let id = setTimeout(() => {
        setError("");
      }, 3000);
      if (!setIsShowModal) {
        clearTimeout(id);
      }
      toastId.current = toast(error.response.data.errors, {
        type: "error",
        autoClose: 1000,
      });
    }
  };

  //to delete school
  const deleteSchool = async (userId: number) => {
    const url = "/school/delete";
    console.log(">> im in deleteSchool button");

    try {
      setError("");
      setLoading(true);
      const { data } = await axios.post(
        url,
        { schoolId: userId },
        {
          headers: {
            ...authorizationToken(logindata!),
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
        navigate("/school/create");
      }, 3000);
      setData("results: " + data.results);
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

  const deletemodal = () => {
    return {
      modalComponent: (
        <CustomModal
          isModalVisible={isShowModal}
          setIsModalVisible={setIsShowModal}
          showCloseBtn={false}
        >
          {" "}
          <EnnvisionModal
            doTask={() => {
              navigate("/school/view");
              setIsShowModal(false);
            }}
            title="Successfully Account Removed"
            description="The student class has been successfully removed, and please note that any associated data will be retained for a period of 30 days before it is permanently deleted from our system."
          />
        </CustomModal>
      ),
    };
  };

  const Createmodal = () => {
    return {
      modalComponent: (
        <CustomModal
          isModalVisible={isShowModal}
          setIsModalVisible={setIsShowModal}
          showCloseBtn={false}
        >
          {" "}
          <EnnvisionModal
            doTask={() => {
              navigate("/school/view");
              setIsShowModal(false);
            }}
            title="Complete Profile Successfully!"
            description="Congratulations! Your profile has been successfully completed, ensuring a seamless experience within the Marital"
          />
        </CustomModal>
      ),
    };
  };

  const UpdateModal = () => {
    return {
      modalComponent: (
        <CustomModal
          isModalVisible={isShowModal}
          setIsModalVisible={setIsShowModal}
          showCloseBtn={false}
        >
          {" "}
          <EnnvisionModal
            doTask={() => {
              navigate("/school/view");
              setIsShowModal(false);
            }}
            title="Update Profile Successfully!"
            description="Congratulations! on updating your profile! Your changes have been successfully saved, enhancing your experience within the Marital platform."
          />
        </CustomModal>
      ),
    };
  };

  return {
    loading,
    handleCreateSubmit,
    editSchool,
    deleteSchool,
    data,
    error,
    isUploadImgModalVisible,
    setIsUploadImgVisible,
    deletemodal,
    Createmodal,
    UpdateModal,
  };
};

export default useCreateSchool;
