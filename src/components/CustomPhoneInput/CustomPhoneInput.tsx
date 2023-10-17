import Input, { isValidPhoneNumber } from "react-phone-number-input";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

type CustomPhoneInputProps = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  limitMaxLength: boolean | undefined;
  handleOnChange: (value: string) => void; // Update the argument type
};

const CustomPhoneInput = ({
  label,
  placeholder,
  value,
  name,
  handleOnChange,
  limitMaxLength,
  ...rest
}: CustomPhoneInputProps) => {
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  useEffect(() => {
    const countrySelect = document.querySelector(
      ".PhoneInput .PhoneInputCountry"
    );
    const phoneNumberInput = document.querySelector(".PhoneInput input");

    if (countrySelect) {
      if (selectedLanguage === "ur" || selectedLanguage === "ar") {
        countrySelect.classList.remove("country-left-to-right-border-radius");
        countrySelect.classList.add("country-right-to-left-border-radius");
      } else {
        countrySelect.classList.add("country-left-to-right-border-radius");
        countrySelect.classList.remove("country-right-to-left-border-radius");
      }
    }
    if (phoneNumberInput) {
      if (selectedLanguage === "ur" || selectedLanguage === "ar") {
        phoneNumberInput.classList.add(
          "phone-number-right-to-left-border-radius"
        );
        phoneNumberInput.classList.remove(
          "phone-number-left-to-right-border-radius"
        );
      } else {
        phoneNumberInput.classList.add(
          "phone-number-left-to-right-border-radius"
        );
        phoneNumberInput.classList.remove(
          "phone-number-right-to-left-border-radius"
        );
      }
    }
  }, [selectedLanguage]);

  return (
    <>
      <label className="custom-phone-input-label" htmlFor="phoneNumber">
        {label}
      </label>
      <Input
        defaultCountry="US"
        international
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleOnChange}
        withCountryCallingCode
        countryCallingCodeEditable
        limitMaxLength={limitMaxLength}
        error={
          value
            ? isValidPhoneNumber(value)
              ? undefined
              : "Invalid phone number"
            : "Phone number required"
        }
        {...rest}
      />
    </>
  );
};

export default CustomPhoneInput;
