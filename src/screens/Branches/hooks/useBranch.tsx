import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  authorizationToken,
  create_branch_url,
  edit_branch_url,
} from "../../../utils/api_urls";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { loginDataTypes } from "../../../redux/features/types";
import { CreateBranchInitialValues } from "../constant";
import EnnvisionModal from "../../../components/CustomModals/EnnvisionModal";
import CustomModal from "../../../components/Modal/CustomModal";

const useBranch = () => {
  const [loading, setLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const [error, setError] = useState("");
  const toastId = useRef<any>(null);
  const { branchId } = useParams();
  const navigate = useNavigate();
  const { loginData } = useSelector((state: RootState) => state);
  const { schoolData } = useSelector((state: RootState) => state.dashboardData);
  const dispatch = useDispatch();
  const handleSubmit = async (
    values: CreateBranchInitialValues,
    { resetForm }: any
  ) => {
    const userDetails = loginData.data?.userDetails;
    console.log("values", values);
    const payload = {
      userId: userDetails?.id || "",
      branchName: values.branchName,
      branchType: values.branchType,
      address: values.address,
      phoneNumber: values?.branchPhoneNumber || "",
      rank: values.rank == "1" ? true : false,
      activities: values.selectedActivities.join(","),
      facilities: values.selectedActivities.join(","),
      description: values.description,
      stripePublicKey: values.stripePublishableKey,
      stripeSecretKey: values.stripeSecretKey,
      gclAccessToken: values.cardAccessToken,
      gclClientId: values.cardClientId,
      gclWebHook: values.cardWebHook,
      gclClientSecret: values.cardClientSecret,
      schoolId: schoolData.schoolId || loginData.data?.schoolId,
      schoolStripeMethod: values.schoolStripeMethod,
      schoolGclMethod: values.schoolGclMethod,

      ...(branchId && { branchId }), // Add schoolId conditionally
    };

    let endpoint = branchId ? edit_branch_url : create_branch_url;
    try {
      setError("");
      setLoading(true);
      const { data } = await axios.post(create_branch_url, payload, {
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
      console.log({ data });
      //setIsUploadImgVisible(true);
      // navigate("/");
      resetForm();
    } catch (error: any) {
      console.error("Error:", error.message);
      //console.log({ error });
      setLoading(false);
      //setError(error.response.data.responseMessage);
      setTimeout(() => {
        setError("");
      }, 2000);
      toastId.current = toast(error, {
        type: "error",
        autoClose: 1000,
      });
    }
  };
  return {
    loading,
    handleSubmit,
    error,
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

export default useBranch;
