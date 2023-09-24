import { Input } from "antd";
import { ErrorMessage, Field } from "formik";
import CustomFileInputStyle from "./style";
import Errormsg from "../ErrorMessage";

type customFileInputProps = {
  name: string;
  label: string;
  labelFamily?: string;
  labelFont?: string;
};
const CustomFileInput: React.FC<customFileInputProps> = ({
  label,
  labelFamily = "EnnVisions",
  name,
  labelFont = "14px",
}) => {
  return (
    <CustomFileInputStyle labelFamily={labelFamily} labelFont={labelFont}>
      <label htmlFor="file">{label}</label>

      <Field name={name} id={name}>
        {({ field, form, meta }: any) => {
          return (
            <Input
              className="customdatepicker"
              placeholder={name}
              name={name}
              type="file"
              id={name}
              onChange={(event: any) => {
                form.setFieldValue(name, event.target.files[0]);
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={Errormsg} />
    </CustomFileInputStyle>
  );
};

export default CustomFileInput;
