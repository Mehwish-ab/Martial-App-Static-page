import { Field, ErrorMessage } from "formik";
import ErrorMsg from "../ErrorMessage";
import { Select } from "antd";
import CustomSelectStyle from "./style";
import dropDownArrow from "../../assets/icons/ic_add_property_dropdown.svg";
import { tertiaryGrey21 } from "../GlobalStyle";
const CustomSelect = (props: any) => {
  const {
    name,
    placeholder,
    onSelect,
    padding = "7px 10px",
    defaultValue,
    label,
    options,
    bgColor,
    border = `1px solid ${tertiaryGrey21}`,
    fontFamily = "EnnVisions",
    labelFamily = "EnnVisions",
    labelMarginBottom = "7px",
    labelFont = "16px",
    fontSize = "16px",
    onChange,
    showErroMessage = true,
    ...rest
  } = props;

  return (
    <CustomSelectStyle
      padding={padding}
      bgColor={bgColor}
      border={border}
      fontFamily={fontFamily}
      labelFamily={labelFamily}
      labelMarginBottom={labelMarginBottom}
      labelFont={labelFont}
      fontSize={fontSize}
    >
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest}>
        {({ field, form, meta }: any) => {
          return (
            // <Form.Item name={name}>
            <div className="custom-select-inner">
              <Select
                bordered={false}
                className="customSelect"
                name={name}
                id={name}
                suffixIcon={
                  <img
                    style={{
                      height: "6px",
                    }}
                    src={dropDownArrow}
                    alt="arrow"
                  />
                }
                defaultValue={defaultValue}
                {...rest}
                // onSelect={(val, event) => onSelect(val, event.key)}
                placeholder={placeholder}
                // You have to provide the onChange function and on changing the value you should call
                // the setFieldValue function provided by the prop of "form"
                onChange={(val: any) => {
                  form.setFieldValue(name, val);
                }}
                options={options}
              />
            </div>
            // </Form.Item>
          );
        }}
      </Field>
      {showErroMessage && <ErrorMessage name={name} component={ErrorMsg} />}
    </CustomSelectStyle>
  );
};

export default CustomSelect;
