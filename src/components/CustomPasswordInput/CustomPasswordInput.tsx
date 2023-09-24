import { Field, ErrorMessage } from "formik";
import ErrorMsg from "../ErrorMessage";
import { Input } from "antd";
import CustomPasswordInputStyle from "./style";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  tertiaryGrewish,
} from "../GlobalStyle";

type CustomPasswordInputProps = {
  label: string;
  className: string;
  placeholder: string;
  name: string;
  fontFamily?: string;
  border?: string;
  showErrorMessage?: boolean;
  padding?: string;
  placeholderFamily?: "EnnVisions" | "EnnVisionsMedium" | "EnnVisionsBold";
  placeholderFont?: string;
  fontSize?: string;
  labelFont?: string;
  labelFamily?: string;
  labelMarginBottom?: string;
};

const CustomPasswordInput = (props: CustomPasswordInputProps) => {
  const {
    label,
    className,
    placeholder,
    name,
    labelFont = "16px",
    labelFamily = fontFamilyMedium,
    labelMarginBottom = "10px",
    fontFamily = fontFamilyRegular,
    border = `1px solid ${tertiaryGrewish}`,
    showErrorMessage = true,
    padding = "10px",
    placeholderFamily = fontFamilyRegular,
    placeholderFont = "16px",
    fontSize = "16px",
    ...rest
  } = props;
  return (
    <CustomPasswordInputStyle
      fontFamily={fontFamily}
      border={border}
      padding={padding}
      placeholderFamily={placeholderFamily}
      placeholderFont={placeholderFont}
      fontSize={fontSize}
      labelFamily={labelFamily}
      labelFont={labelFont}
      labelMarginBottom={labelMarginBottom}
    >
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name}>
        {({ field, form, meta }: any) => (
          <Input.Password
            className={className}
            {...rest}
            placeholder={placeholder}
            {...field}
            iconRender={(visible) =>
              visible ? (
                <span className="paswordIconLabel">Hide</span>
              ) : (
                <span className="paswordIconLabel">Show</span>
              )
            }
          />
        )}
      </Field>
      {showErrorMessage && <ErrorMessage name={name} component={ErrorMsg} />}
    </CustomPasswordInputStyle>
  );
};

export default CustomPasswordInput;
