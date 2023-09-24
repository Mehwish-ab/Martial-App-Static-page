import Input from "./CustomInput/CustomInput";
import Select from "./CustomSelect/CustomSelect";
import Datepicker from "./CustomDatePicker/CustomDatePicker";
import CustomDateTimePicker from "./CustomDateTimePicker/Index";
import Textarea from "./CustomTextArea/CustomTextarea";
// import Checkbox from "./Checkbox";
import CustomSearchSelect from "./CustomSearchSelect";
import CustomMultiSelect from "./CustomMultiSelect/Index";
import CustomPasswordInput from "./CustomPasswordInput/CustomPasswordInput";
import { Checkbox, Radio } from "antd";
import CustomFileInput from "./CustomFileInput/CustomFileInput";
import CustomDate from "./CustomDatePicker/CustomDate";
import CustomSelects from "./CustomSelect/CustomSelects";

export interface FieldStyleBasicProps {
  padding: string;
  bgColor: string;
  border: string;
}

export interface FieldStyleBasicProps {
  padding: string;
  bgColor: string;
  border: string;
}

type formControlProps = {
  control:
    | "input"
    | "select"
    | "searchSelect"
    | "multiSelect"
    | "checkbox"
    | "password"
    | "textarea"
    | "inputNumber"
    | "radio"
    | "date"
    | "dateTime";
} & React.ComponentProps<any>;
const FormControl: React.FC<formControlProps> = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "selects":
      return <CustomSelects {...rest} />;
    case "searchSelect":
      return <CustomSearchSelect {...rest} />;
    case "multiSelect":
      return <CustomMultiSelect {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case "password":
      return <CustomPasswordInput {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "radio":
      return <Radio {...rest} />;
    case "date":
      return <Datepicker {...rest} />;
    case "dates":
      return <CustomDate {...rest} />;
    case "dateTime":
      return <CustomDateTimePicker {...rest} />;
    case "file":
      return <CustomFileInput {...rest} />;
    default:
      return null;
  }
};

export default FormControl;
