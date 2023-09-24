import Autocomplete from "react-google-autocomplete";
import { MAP_API } from "../App";
import { useAppSelector } from "../app/hooks";
import { PlacesAutocompleteStyle } from "./style";

type placesAutoCompleteInputProps = {
  label?: string;
  handleChange: (value: string) => void;
  showLabel?: boolean;
};

const PlacesAutoCompleteInput: React.FC<placesAutoCompleteInputProps> = ({
  label,
  handleChange,
  showLabel = true,
}) => {
  const { result } = useAppSelector((state) => state.userLocation);
  return (
    <PlacesAutocompleteStyle>
      {showLabel && <label htmlFor="places-suggestion">{label}</label>}
      <div>
        <Autocomplete
          id="places suggestions"
          apiKey={MAP_API}
          defaultValue={result?.address}
          onPlaceSelected={(place: any) =>
            handleChange(place.formatted_address || "")
          }
        />
      </div>
    </PlacesAutocompleteStyle>
  );
};

export default PlacesAutoCompleteInput;
