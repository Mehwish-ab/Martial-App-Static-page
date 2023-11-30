import { useState } from "react";

import { ErrorMessage, Field, Formik } from "formik";
import { Form } from "antd";

import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { RootState } from "../../../redux/store";

import { validationFinder } from "../../../utils/utilities";
import FormControl from "../../../components/FormControl";
import {
  fontFamilyMedium,
  lightBlue3,
  pureDark,
  pureDark2,
} from "../../../components/GlobalStyle";
import CustomPhoneInput from "../../../components/CustomPhoneInput/CustomPhoneInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
// import { CreateInstructorInitialValues } from "../constant";
import useBranch from "../../Franchise/hooks/useFranchise";
import CheckboxesSelect from "../../../components/CustomCheckbox/CheckboxesSelect";
import PlacesAutoCompleteInput from "../../../maps/PlacesAutocomplete";
import CardView from "../CardView/CardView";

const SchoolFranchise = () => {
  const { getLabelByKey } = useScreenTranslation("instructorCreate");
  const {
    statusData: { activities, facilities },
  } = useSelector((state: RootState) => state.appData.data);

  const { loading, handleSubmit } = useBranch();

//   const initialValues: CreateInstructorInitialValues = {
//     instructorName: "",
//     emailAddress: "",
//     instructorPhoneNumber: "",
//     address: "",
//     yearsOfExperience: "",
//     ranking: "",
//     latestCertification: "",
//     description: "",
//     selectedActivities: [],
//     selectedFacilities: [],
//     termCondition: "",
//     ranks: ""
//   };

  const franchiseName = validationFinder("BUSINESS_NAME")!;
  const franchiseNameReg = new RegExp(franchiseName.pattern);
  const address = validationFinder("ADDRESS")!;
  const addressReg = new RegExp(address.pattern);
  const emailAddress = validationFinder("EMAIL_ADDRESS")!;
  const emailAddressReg = new RegExp(emailAddress.pattern);

  const franchisePhoneNumber = validationFinder("PHONE_NUMBER")!;



  const validationSchema = Yup.object({
    franchiseName: Yup.string()
      .required(franchiseName.notBlankMsgEn)
      .matches(franchiseNameReg, franchiseName.patternMsgEn),
    address: Yup.string()
      .required(address.notBlankMsgEn)
      .matches(addressReg, address.patternMsgEn),
    emailAddress: Yup.string()
      .required(emailAddress.notBlankMsgEn)
      .matches(emailAddressReg, emailAddress.patternMsgEn),
    franchisePhoneNumber: Yup.string().required(
      franchisePhoneNumber.notBlankMsgEn
    ),
    belts: Yup.string().required("Please select belts"),
    description: Yup.string().required("Please enter description"),
    defaultLanguage: Yup.string().required("Please select default language"),
    defaultCurrency: Yup.string().required("Please select default currency"),
    selectedActivities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one activity"),
    selectedFacilities: Yup.array()
      .of(Yup.string().required("Select an activity"))
      .min(1, "Select at least one facility"),

  });



  return (
    <>
    <CardView />
  </>
  );
};

export default SchoolFranchise;
