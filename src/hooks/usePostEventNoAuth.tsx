import axios from "axios";
import { useState } from "react";

const usePostNoAuthEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<unknown>({});
  // api data promise
  const apiDataPromise = async (url: string, postData: unknown) => {
    try {
      setLoading(true);
      const { data } = await axios.post(url, postData);
      setData(data.results);
      console.log({ data });
      setLoading(false);
    } catch (error: any) {
      setError(error.response.data.responseMessage);
      setLoading(false);
      console.log(error.response.data.responseMessage, "error in api data");
    }
  };

  return {
    loading,
    data,
    error,
    apiDataPromise,
  };
};

export default usePostNoAuthEvent;
