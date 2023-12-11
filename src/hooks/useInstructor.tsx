import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  authorizationToken,
  create_branch_url,
  get_payment,
  edit_branch_url,
  get_branch_by_school_id_url,
} from "../utils/api_urls";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { loginDataTypes } from "../redux/features/types";
import { CreateInstructorInitialValues } from "../../src/screens/Instructor/constant";
import EnnvisionModal from "../components/CustomModals/EnnvisionModal";
import CustomModal from "../components/Modal/CustomModal";
import { useAppSelector } from "../app/hooks";

const useInstructor = () => {
  const [loading, setLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [data, setData] = useState<unknown>({});

  const [error, setError] = useState("");
  const toastId = useRef<any>(null);
  const { branchId } = useParams();

  const navigate = useNavigate();
  const { loginData } = useSelector((state: RootState) => state);
  //   const { data: logindata } = useAppSelector((state) => state.loginData);

  const { schoolData } = useSelector((state: RootState) => state.dashboardData);
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: CreateInstructorInitialValues,
    file: any,
    { resetForm }: any
  ) => {
    // const userDetails = loginData.data?.userDetails;
    console.log("values from form:", values);
    const payload = {
      //   userId: userDetails?.id || "",
      instructorName: values.instructorName,
      emailAddress: values.emailAddress,
      phoneNumber: values.instructorPhoneNumber,
      address: values?.address || "",
      experience: values.yearsOfExperience,
      rankId: values.ranking == "1" ? true : false,
      certification: values.latestCertification,
      specializations: values.selectedFacilities.join(","),
      activities: values.selectedActivities.join(","),
      description: values.description,

      //   ...(branchId && { branchId }), // Add schoolId conditionally
    };

    //let endpoint = branchId ? edit_branch_url : create_branch_url;
    try {
      setError("");
      setLoading(true);
      const { data } = await axios.post(
        "/instructor/create",
        { payload, file },
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
      setIsShowModal(true);
      setTimeout(() => {
        setLoading(false);
        setIsShowModal(false);
        navigate("/instructor/list");
      }, 3000);
      // toastId.current = toast(data.responseMessage, {
      //   type: "success",
      //   autoClose: 1000,
      // });
      //setLoading(false);
      console.log({ data });

      //setIsUploadImgVisible(true);
      resetForm();
    } catch (error: any) {
      console.error("Error:", error);
      setLoading(false);
      setError(error.response.data.responseMessage);
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
  };
};

export default useInstructor;
