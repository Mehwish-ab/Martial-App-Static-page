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
) => {
  console.log("values from form:", values,file);
  const datas = {
    instructorName: values.instructorName,
    emailAddress: values.emailAddress,
    phoneNumber: values.instructorPhoneNumber,
    address: values?.address || "",
    experience: values.yearsOfExperience,
    rankId: values.rankId == 1? true : false,
    specializations: values.selectedFacilities.join(","),
    activities: values.selectedActivities.join(","),
    description: values.description
  };

  try {
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("data",JSON.stringify(datas) );
    formData.append("file", file); 
    
console.log("Nada",formData);

    const { data } = await axios.post(
      "/instructor/create",
      formData,
      {
        headers: {
          ...authorizationToken(loginData.data as loginDataTypes),
          ...axios.defaults.headers.post,
          'Content-Type': `multipart/form-data`,
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

    console.log({ data });

  } catch (error: any) {
    console.error("Error:", error.response.data.error);
    setLoading(false);
    setError(error.message || "An error occurred");
    setTimeout(() => {
      setError("");
    }, 2000);
    toastId.current = toast(error.message || "An error occurred", {
      type: "error",
      autoClose: 1000,
    });
  }
};
const deleteInstructor= async(
  instructorId:number
)=>{
  console.log("<<instructor id to delete",instructorId);
const url="/instructor/delete"
  try {
    setError("");
    setLoading(true);
    const { data } = await axios.post(
      url,
      { instructorId },
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
      navigate("/instructor/list");
    }, 3000);
    setData("results: " + data.results);
    console.log("data", { data });
    setLoading(false);
    
  } catch (error:any) {
    console.log("api error", error);
      setError(error.response.data.responseMessage);
      setLoading(false);
      console.log(error.response.data.responseMessage, "error in api data");
  }
}

const getInstructorbyid = async (instructorId: number) => {
  try {
    setError("");
    setLoading(true);
    const { data } = await axios.post(
      "/instructor/getDetailsById",
      { instructorId },
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
    console.log("branchh info", data.results);
    setLoading(false);
    return data.results;
  } catch (error: any) {
    console.log("error", error);
    setLoading(false);
    setError(error);
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
            // navigate("/school/view");
            setIsShowModal(false);
          }}
          title="Successfully Account Instructor"
          description="The Instructor class has been successfully removed, and please note that any associated data will be retained for a period of 30 days before it is permanently deleted from our system."
        />
      </CustomModal>
    ),
  };
};
return {
  loading,
  handleSubmit,
  deleteInstructor,
  deletemodal,
  getInstructorbyid

};
};

export default useInstructor;