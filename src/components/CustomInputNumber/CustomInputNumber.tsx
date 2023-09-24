import { Field, ErrorMessage } from "formik";
import ErrorMsg from "../ErrorMessage";
import { InputNumber } from "antd";
import CustomInputNumberStyle from "./style";
const CustomInputNumber = (props: any) => {
  const {
    label,
    prefix,
    maxLength,
    disabled,
    placeholder,
    className,
    name,
    ...rest
  } = props;
  return (
    <CustomInputNumberStyle>
      <label htmlFor={label}>{label}</label>
      <Field name={name} id={name}>
        {({ field }: any) => (
          <InputNumber
            addonBefore="$"
            addonAfter="Rate"
            {...rest}
            {...field}
            type="text"
            placeholder={placeholder}
            defaultValue={100}
            disabled={disabled}
            className={className}
            maxLength={maxLength}
          />
        )}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </CustomInputNumberStyle>
  );
};

export default CustomInputNumber;
