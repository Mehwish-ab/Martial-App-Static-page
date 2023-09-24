import React from "react";
import { Input } from "antd";
import { useField, ErrorMessage } from "formik";
import ErrorMsg from "../ErrorMessage";
import { CustomTextAreaContaienr } from "./style";

const CustomTextarea = ({
  placeholder,
  height,
  label,
  defaultValue,
  ...props
}: any) => {
  const { TextArea } = Input;

  const [field] = useField(props);
  return (
    <CustomTextAreaContaienr height={height}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <TextArea
        defaultValue={defaultValue}
        className="customInput"
        placeholder={placeholder}
        {...field}
        {...props}
      />
      <ErrorMessage name={props.name} component={ErrorMsg} />
    </CustomTextAreaContaienr>
  );
};

export default CustomTextarea;
