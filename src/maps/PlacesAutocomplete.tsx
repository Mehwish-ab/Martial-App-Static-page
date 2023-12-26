import Autocomplete from 'react-google-autocomplete'
import { MAP_API } from '../App'
import { PlacesAutocompleteStyle } from './style'
import { ErrorMessage } from 'formik'
import Errormsg from '../components/ErrorMessage'
import MagnifiedIcon from '../assets/icons/ic_search.svg'

type placesAutoCompleteInputProps = {
    label?: string
    handleChange: (value: string) => void
    showLabel?: boolean
    placeholder: string
    className: string
    name: string
    formik: any
    value: string
    suffix?: any
}

const PlacesAutoCompleteInput: React.FC<placesAutoCompleteInputProps> = ({
    label,
    handleChange,
    showLabel = true,
    placeholder,
    className,
    name,
    formik,
    suffix,
    value,
}) => {
    return (
        <PlacesAutocompleteStyle>
            {showLabel && <label htmlFor="places-suggestion">{label}</label>}
            <div className="PlacesAutocomplete">
                <Autocomplete
                    id="places-suggestions"
                    name={name}
                    apiKey={MAP_API}
                    onPlaceSelected={(place: any) =>
                        handleChange(place.formatted_address || '')
                    }
                    onChange={(e: any) => {
                        if (!e.target.value) {
                            handleChange('')
                        }
                    }}
                    defaultValue={value}
                    placeholder={placeholder}
                    className={`ant-input ${
                        formik.errors.address ? 'is-invalid' : 'customInput'
                    }`}
                />
                <span>
                    <img src={MagnifiedIcon} alt="as" />
                </span>
            </div>

            <ErrorMessage name={name} component={Errormsg} />
        </PlacesAutocompleteStyle>
    )
}

export default PlacesAutoCompleteInput
