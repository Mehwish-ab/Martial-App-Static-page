// import Autocomplete from 'react-google-autocomplete'
// import { MAP_API } from '../App'
// import { PlacesAutocompleteStyle } from './style'
// import { ErrorMessage } from 'formik'
// import Errormsg from '../components/ErrorMessage'
// import MagnifiedIcon from '../assets/icons/ic_search.svg'

// type placesAutoCompleteInputProps = {
//     label?: string
//     handleChange: (value: string) => void
//     showLabel?: boolean
//     placeholder: string
//     className: string
//     name: string
//     formik: any
//     value: string
//     suffix?: any
// }

// const PlacesAutoCompleteInput: React.FC<placesAutoCompleteInputProps> = ({
//     label,
//     handleChange,
//     showLabel = true,
//     placeholder,
//     name,
//     formik,
//     value,
// }) => {
//     return (
//         <PlacesAutocompleteStyle>
//             {showLabel && <label htmlFor="places-suggestion">{label}</label>}
//             <div className="PlacesAutocomplete">
//                 <Autocomplete
//                     id="places-suggestions"
//                     name={name}
//                     apiKey={MAP_API}
//                     onPlaceSelected={(place: any) =>
//                         handleChange(place.formatted_address || '')
//                     }
//                     onChange={(e: any) => {
//                         if (!e.target.value) {
//                             handleChange('')
//                         }
//                     }}
//                     defaultValue={value}
//                     placeholder={placeholder}
//                     className={`ant-input ${formik.errors.address ? 'is-invalid' : 'customInput'
//                         }`}
//                 />
//                 <span>
//                     <img src={MagnifiedIcon} alt="as" />
//                 </span>
//             </div>

//             <ErrorMessage name={name} component={Errormsg} />
//         </PlacesAutocompleteStyle>
//     )
// }

// export default PlacesAutoCompleteInput

import React from 'react'
import {
    Autocomplete as GoogleAutocomplete,
    useJsApiLoader,
} from '@react-google-maps/api'
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

// const PlacesAutoCompleteInput: React.FC<placesAutoCompleteInputProps> = ({
//     label,
//     handleChange,
//     showLabel = true,
//     placeholder,
//     name,
//     formik,
//     value,
// }) => {
//     const { isLoaded } = useJsApiLoader({
//         googleMapsApiKey: MAP_API,
//     })

//     return (
//         <PlacesAutocompleteStyle>
//             {showLabel && <label htmlFor="places-suggestion">{label}</label>}
//             <div className="PlacesAutocomplete">
//                 {isLoaded && (
//                     <GoogleAutocomplete
//                         onLoad={(autocomplete) => console.log(autocomplete)}
//                         onPlaceChanged={() => console.log('Place changed')}
//                     >
//                         <input
//                             type="text"
//                             placeholder={placeholder}
//                             value={value}
//                             onChange={(e) => handleChange(e.target.value)}
//                             className={`ant-input ${formik.errors.address
//                                 ? 'is-invalid'
//                                 : 'customInput'
//                             }`}
//                         />
//                     </GoogleAutocomplete>
//                 )}
//                 <span>
//                     <img src={MagnifiedIcon} alt="as" />
//                 </span>
//             </div>

//             <ErrorMessage name={name} component={Errormsg} />
//         </PlacesAutocompleteStyle>
//     )
// }

// export default PlacesAutoCompleteInput

const PlacesAutoCompleteInput: React.FC<placesAutoCompleteInputProps> = ({
    label,
    handleChange,
    showLabel = true,
    placeholder,
    name,
    formik,
    value,
}) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: MAP_API,
    })

    // Function to handle when a place is selected from the autocomplete suggestions
    const handlePlaceSelect = (place: any): void => {
        const selectedAddress = place.formatted_address
        handleChange(selectedAddress)
        formik.setFieldValue(name, selectedAddress)
    }

    return (
        <PlacesAutocompleteStyle>
            {showLabel && <label htmlFor="places-suggestion">{label}</label>}
            <div className="PlacesAutocomplete">
                {isLoaded && (
                    <GoogleAutocomplete
                        // onLoad={(autocomplete) => console.log(autocomplete)}
                        // onPlaceChanged={() => console.log('Place changed')}
                        // Handle the selected place from suggestions
                        onLoad={(autocomplete) => {
                            autocomplete.addListener('place_changed', () => {
                                const selectedPlace = autocomplete.getPlace()
                                handlePlaceSelect(selectedPlace)
                            })
                        }}
                    >
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={value}
                            onChange={(e) => handleChange(e.target.value)}
                            className={`ant-input ${
                                formik.errors.address
                                    ? 'is-invalid'
                                    : 'customInput'
                            }`}
                        />
                    </GoogleAutocomplete>
                )}
                <span>
                    <img src={MagnifiedIcon} alt="as" />
                </span>
            </div>

            <ErrorMessage name={name} component={Errormsg} />
        </PlacesAutocompleteStyle>
    )
}

export default PlacesAutoCompleteInput
