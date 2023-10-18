import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { MAP_API } from "../App";
import { useAppSelector } from "../app/hooks";
import { PlacesAutocompleteStyle } from "./style";
import { useRef } from "react";
import FormControl from "../components/FormControl";
import { fontFamilyMedium } from "../components/GlobalStyle";
import { ErrorMessage, Field } from "formik";
import { Input } from "antd";
import Errormsg from "../components/ErrorMessage";

type placesAutoCompleteInputProps = {
  label?: string;
  handleChange: (value: string) => void;
  showLabel?: boolean;
  placeholder: string;
  className: string;
  name: string;
  formik: any;
  value: string;
};

const PlacesAutoCompleteInput: React.FC<placesAutoCompleteInputProps> = ({
  label,
  handleChange,
  showLabel = true,
  placeholder,
  className,
  name,
  formik,
  value,
}) => {
  console.log(formik);
  return (
    <PlacesAutocompleteStyle>
      {showLabel && <label htmlFor="places-suggestion">{label}</label>}
      <div>
        <Autocomplete
          id="places-suggestions"
          name={name}
          apiKey={MAP_API}
          onPlaceSelected={(place: any) =>
            handleChange(place.formatted_address || "")
          }
          onChange={(e: any) => {
            if (!e.target.value) {
              handleChange("");
            }
          }}
          defaultValue={value}
          placeholder={placeholder}
          className={`ant-input ${
            formik.errors.address ? "is-invalid" : "customInput"
          }`}
        />
      </div>

      <ErrorMessage name={name} component={Errormsg} />
    </PlacesAutocompleteStyle>
  );
};

export default PlacesAutoCompleteInput;
