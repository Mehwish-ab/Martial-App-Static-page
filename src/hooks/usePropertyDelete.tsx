import { Dispatch, SetStateAction, useState } from "react";
import { useGlobalContext } from "../context/context";
import { useAppSelector } from "../app/hooks";
import { authorizationToken, property_delete_url } from "../utils/api_urls";
import axios from "axios";
// import { useNewsfeedContext } from "../context/NewsfeedContext";

const usePropertyDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: loginData } = useAppSelector((state) => state.loginData);
  const { setShowPropertyOptions, setCounter } = useGlobalContext();
  const [error, setError] = useState("");
  // const { selectedPost } = useNewsfeedContext();
  // console.log({ selectedPost }, selectedPost.propertyId);

  // delete promise types
  type deletePromiseTypes = {
    setIsDeleteModal: Dispatch<SetStateAction<boolean>>;
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    propertyId: string;
  };
  // delete property promise
  const deletePropertyPromise = async ({
    setIsDeleteModal,
    setIsModalVisible,
    propertyId,
  }: deletePromiseTypes) => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(property_delete_url, {
        data: {
          propertyId,
        },
        headers: {
          ...authorizationToken(loginData!),
        },
      });
      setIsLoading(false);
      setIsDeleteModal(false);
      setIsModalVisible(true);
      setTimeout(() => {
        setCounter((prev) => prev + 1);
        setIsModalVisible(false);
        setShowPropertyOptions(false);
      }, 2000);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.responseMessage);
      setIsLoading(false);
      setIsDeleteModal(true);
    }
  };
  return {
    isLoading,
    deletePropertyPromise,
    error,
  };
};

export default usePropertyDelete;
