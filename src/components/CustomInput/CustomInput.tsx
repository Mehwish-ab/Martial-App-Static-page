import { Field, ErrorMessage } from "formik";
import ErrorMsg from "../ErrorMessage";
import { Input } from "antd";
import CustomInputStyle from "./style";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  tertiaryGrey21,
} from "../GlobalStyle";

type CustomInputTypes = {
  label: string;
  prefix: string;
  defaultValue: string;
  maxLength: string;
  disabled: string;
  placeholder: string;
  className: string;
  name: string;
  onFocus?: boolean;
  onKeyUp?: () => void;
  value: string;
  fontFamily?: "EnnVisions" | "EnnVisionsMedium" | "EnnVisionsBold";
  bgColor?: string;
  border?: string;
  padding?: string;
  showErrorMessage?: boolean;
  fontSize?: string;
  suffix?: null | React.ReactNode;
  readyOnly?: boolean;
  type: string;
  labelMarginBottom?: string;
  labelFamily?: "EnnVisions" | "EnnVisionsMedium" | "EnnVisionsBold";
  placeholderFamily?: "EnnVisions" | "EnnVisionsMedium" | "EnnVisionsBold";
  placeholderFont?: string;
  marginBottom?: string;
  borderRadius?: string;
  labelFont?: string;
};

const CustomInput: React.FC<CustomInputTypes> = ({
  prefix,
  defaultValue,
  maxLength,
  disabled,
  placeholder,
  placeholderFamily = fontFamilyRegular,
  placeholderFont = "16px",
  className,
  name,
  fontSize = "16px",
  fontFamily = fontFamilyRegular,
  bgColor = "white",
  border = `1px solid ${tertiaryGrey21}`,
  padding = "11.5px",
  showErrorMessage = true,
  suffix = null,
  readyOnly = false,
  label,
  labelMarginBottom = "7px",
  labelFamily = fontFamilyRegular,
  labelFont = "16px",
  type = "text",
  marginBottom = "10px",
  borderRadius = "10px",
  onKeyUp,
}: CustomInputTypes) => {
  return (
    <CustomInputStyle
      fontFamily={fontFamily}
      bgColor={bgColor}
      border={border}
      padding={padding}
      labelFont={labelFont}
      labelFamily={labelFamily}
      labelMarginBottom={labelMarginBottom}
      fontSize={fontSize}
      placeholderFamily={placeholderFamily}
      placeholderFont={placeholderFont}
      marginBottom={marginBottom}
      borderRadius={borderRadius}
    >
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name}>
        {({ field }: any) => (
          <Input
            disabled={disabled}
            prefix={prefix}
            className={className}
            type={type}
            readOnly={readyOnly}
            maxLength={maxLength}
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...field}
            suffix={suffix}
            onKeyUp={onKeyUp}
          />
        )}
      </Field>
      {showErrorMessage && <ErrorMessage name={name} component={ErrorMsg} />}
    </CustomInputStyle>
  );
};

export default CustomInput;
