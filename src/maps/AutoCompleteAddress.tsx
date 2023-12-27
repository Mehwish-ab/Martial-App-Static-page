/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AutoCompleteSuggestionsStyle } from './style'

type onChangeProps = {
    address: string
    streetNumber: string
    streetName: string
    postalCode: string
    latitude: number
    longitude: number
}
type autoCompleteMapsProps = {
    label: string
    placeholder: string
    name: string
    onChange: ({
        address,
        postalCode,
        streetName,
        streetNumber,
    }: onChangeProps) => void
}

// const libraries: (
//     | 'places'
//     | 'drawing'
//     | 'geometry'
//     | 'localContext'
//     | 'visualization'
// )[] = ['places'] // Move libraries array outside of the component

// Customize the style of the suggestions
const autocompleteOptions = {
    componentRestrictions: { country: 'ca' }, // Restrict suggestions to Canada only
    types: ['address'], // Restrict suggestions to addresses only
    // fields: ["formatted_address", "geometry"], // Retrieve formatted address and geometry
    // Add any other options as needed
}

const AutoCompleteAddress: React.FC<autoCompleteMapsProps> = ({
    label,
    placeholder,
    name,
    onChange,
}) => {
    const [autocomplete, setAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null)
    // const [address, setAddress] = useState<string>('')

    // const onLoadAutocomplete = (
    //     autocomplete: google.maps.places.Autocomplete
    // ) => {
    //     setAutocomplete(autocomplete)
    // }

    const onPlaceChanged = (): void => {
        if (autocomplete) {
            const place = autocomplete.getPlace()
            if (place && place.geometry && place.geometry.location) {
                // setAddress(place.formatted_address || '')

                console.log('Address: ', place.formatted_address)

                // Extract street name, street number, and postal code
                let streetName = ''
                let streetNumber = ''
                let postalCode = ''
                let state = ''
                let city = ''
                let country = ''

                // Loop through the address components to extract required data
                ;(place.address_components ?? []).forEach((component) => {
                    const types = component.types
                    if (types.includes('route')) {
                        streetName = component.long_name
                    } else if (types.includes('street_number')) {
                        streetNumber = component.long_name
                    } else if (types.includes('postal_code')) {
                        postalCode = component.long_name
                    } else if (types.includes('administrative_area_level_1')) {
                        state = component.long_name
                    } else if (types.includes('locality')) {
                        city = component.long_name
                    } else if (types.includes('country')) {
                        country = component.long_name
                    }
                })
                console.log('Address: ', place.formatted_address)
                const address = place.formatted_address
                // Combine extracted data into a formatted address
                const extractedAddress = `${streetNumber} ${streetName}, ${postalCode}`
                const latitude = place.geometry.location.lat()
                const longitude = place.geometry.location.lng()
                console.log(
                    'Extracted Address: ',
                    { streetNumber },
                    { streetName },
                    { postalCode },
                    extractedAddress,
                    { latitude, longitude }
                )
                onChange({
                    streetNumber,
                    streetName,
                    postalCode,
                    address: address || '',
                    latitude,
                    longitude,
                })
            }
        }
    }
    return (
        <AutoCompleteSuggestionsStyle>
            <label htmlFor="label">{label}</label>
            <Autocomplete
                options={autocompleteOptions}
                onLoad={setAutocomplete}
                onPlaceChanged={onPlaceChanged}
            >
                <input
                    autoFocus
                    name={name}
                    type="text"
                    placeholder={placeholder}
                />
            </Autocomplete>
        </AutoCompleteSuggestionsStyle>
    )
}

export default React.memo(AutoCompleteAddress)
