import React, { useState } from "react";
import CustomModal from "../../components/Modal/CustomModal";

export interface UploadImages {
  isModalVisible: boolean;
}
const UploadImages = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <CustomModal
      isModalVisible={showModal}
      setIsModalVisible={() => setShowModal(false)}
    >
      UploadImages
    </CustomModal>
  );
};

export default UploadImages;
