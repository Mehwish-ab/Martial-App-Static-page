import axios from "axios";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { authorizationToken } from "../utils/api_urls";
import { useNavigate } from "react-router-dom";
const useDeleteUser = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const toastId = useRef<any>(null);
    const [data, setData] = useState<unknown>({});
    // login data
    const { data: loginData } = useAppSelector((state) => state.loginData);
    const deleteUser = async (userId: number) => {
        const url = "/school/delete";
        try {
            setError("");
            setLoading(true);
            const { data } = await axios.post(
                url,
                { schoolId: userId },
                {
                    headers: {
                        ...authorizationToken(loginData!),
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
            toastId.current = toast(data.responseMessage, {
                type: "success",
                autoClose: 1000,
            });
            setData("results: " + data.results);
            console.log("data", { data });
            setLoading(false);
            navigate("/school");
        } catch (error: any) {
            console.log("api error", error);
            setError(error.response.data.responseMessage);
            setLoading(false);
            console.log(error.response.data.responseMessage, "error in api data");
        }
    };
    return {
        loading,
        data,
        error,
        deleteUser,
    };
};
export default useDeleteUser;