import { InputNumber } from "antd";
import { CustomPhoneInputStyle } from "./style";
import { BaseImgContainer } from "../GlobalStyle";

type CustomPhoneInputProps = {
  countryNumber: string;
  phoneValueHandler: (value: string | number) => void;
  placeholder: string;
  phoneLength: number;
  countryFlag: string;
  countryName: string;
  disabled?: boolean;
  name: string;
  value: string | number;
  label?: string;
};

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  countryNumber,
  phoneValueHandler,
  countryFlag,
  phoneLength,
  placeholder,
  countryName,
  disabled = false,
  name,
  value,
  label,
}) => {
  return (
    <CustomPhoneInputStyle>
      {label && (
        <label className="mb-3" htmlFor={name}>
          {label}
        </label>
      )}
      <InputNumber
        style={{
          border: "none",
          height: "40px",
          marginBottom: "4px",
        }}
        className="w-100 border-0"
        controls={false}
        name={name}
        type="tel"
        maxLength={phoneLength}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(value) => phoneValueHandler(value || "")}
        addonBefore={
          <div
            style={{ width: "40px", height: "40px" }}
            className="d-flex align-items-center"
          >
            <BaseImgContainer
              img_url={countryFlag}
              alt={countryName}
              className="me-2 flag"
              width="26px"
              height="26px"
            />
            <p className="m-0">{countryNumber}</p>
          </div>
        }
      />
    </CustomPhoneInputStyle>
  );
};

export default CustomPhoneInput;
