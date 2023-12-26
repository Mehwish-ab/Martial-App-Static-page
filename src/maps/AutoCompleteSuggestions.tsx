import React, { useState } from 'react'
import { LoadScript, Autocomplete } from '@react-google-maps/api'

const libraries: (
    | 'places'
    | 'drawing'
    | 'geometry'
    | 'localContext'
    | 'visualization'
)[] = ['places'] // Move libraries array outside of the component

const AutoCompleteMaps: React.FC = () => {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [autocomplete, setAutocomplete] =
        useState<google.maps.places.Autocomplete | null>(null)
    const [address, setAddress] = useState<string>('')

    const onLoadMap = (map: google.maps.Map) => {
        setMap(map)
    }

    const onLoadAutocomplete = (
        autocomplete: google.maps.places.Autocomplete
    ) => {
        setAutocomplete(autocomplete)
    }

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace()
            if (place && place.geometry && place.geometry.location) {
                setAddress(place.formatted_address || '')
                map?.setCenter(place.geometry.location)
                map?.setZoom(10)
                console.log('Address: ', place.formatted_address)
            }
        }
    }

    return (
        <Autocomplete
            onLoad={onLoadAutocomplete}
            onPlaceChanged={onPlaceChanged}
        >
            <input
                type="text"
                placeholder="Search for address..."
                style={{
                    backgroundColor: '#fff',
                    padding: '0.5rem',
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 1,
                }}
            />
        </Autocomplete>
    )
}

export default React.memo(AutoCompleteMaps)
