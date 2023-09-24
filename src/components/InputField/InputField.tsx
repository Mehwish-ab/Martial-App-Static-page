import { Input } from "antd";
import InputFieldStyle from "./style";

type InputFieldProps = {
  title: string;
  value: string | number;
  textAlign?: string;
  maxRange?: number;
  name?: string;
  type?: string;
  border?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  title,
  value,
  textAlign = "center",
  maxRange,
  name,
  type = "text",
  border = "1px solid #EFEFF4",
  onChange,
}) => {
  console.log({ border });
  return (
    <InputFieldStyle
      fontFamily="EnnVisions"
      bgColor="white"
      border={border}
      padding="8px 8px"
      marginTop="0px"
      maxRange={maxRange}
      borderRadius="0px"
      textAlign={textAlign}
    >
      <Input
        maxLength={maxRange}
        readOnly
        type={type}
        placeholder="Basic usage"
        name={name}
        value={`${value} ${title}`}
        onChange={onChange}
      />
    </InputFieldStyle>
  );
};

export default InputField;
