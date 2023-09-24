import axios from "axios";
import { authorizationToken, follow_url } from "../utils/api_urls";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";

const useFollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const loginData = useAppSelector((state) => state.loginData.data);

  // follow api promsie handler
  const followPromiseHandler = async (userId: number) => {
    setLoading(true);
    try {
      const data: any = await axios.post(
        follow_url,
        {
          followToUserId: userId,
        },
        {
          headers: {
            ...authorizationToken(loginData!),
          },
        }
      );
      setLoading(false);
    } catch (error: any) {
      setError(error.response.data.responseMessage);
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    followPromiseHandler,
  };
};

export default useFollow;
