import { DatePicker } from "antd";
import { ErrorMessage } from "formik";
import CustomDatePickerStyle from "./style";
import ErrorMsg from "../ErrorMessage";
import dateIcon from "../../assets/icons/ic_blog_calender.svg";
import moment from "moment";

const CustomDate = (props: any) => {
  const {
    name,
    placeholder,
    label,
    options,
    bgColor = "white",
    border = "1px solid #c6c6c8;",
    padding = "8px",
    title,
    fontFamily = "EnnVisions",
    labelFamily = "EnnVisions",
    marginBottom = "10px",
    onChange,
    showErroMessage = true,
    value,
    ...rest
  } = props;

  const formattedDateString = moment(value, "MMMM DD, YYYY").format(
    "DD-MM-YYYY"
  );

  console.log({ formattedDateString }, "value in dates date");

  console.log({ marginBottom, showErroMessage, onChange });

  return (
    <CustomDatePickerStyle
      fontFamily={fontFamily}
      labelFamily={labelFamily}
      bgColor={bgColor}
      border={border}
      padding={padding}
    >
      <label htmlFor={name}>{label}</label>
      <div>
        <DatePicker
          className="customdatepicker"
          placeholder={placeholder}
          suffixIcon={<img src={dateIcon} alt="calender-icon" />}
          name={name}
          id={name}
          value={value ? moment(value, "YYYY-MM-DD") : null}
          {...rest}
          onChange={(_, dateString) => {
            onChange(dateString);
          }}
        />
      </div>

      {showErroMessage && <ErrorMessage name={name} component={ErrorMsg} />}
    </CustomDatePickerStyle>
  );
};

export default CustomDate;
