import { useState } from 'react'
import { MAP_API } from '../App'

const CurrentLocationMaps = (): JSX.Element => {
    const [currentLocation, setCurrentLocation] = useState<{
        coords: { latitude: number; longitude: number }
        address: string | null
        city: string | null
        state: string | null
        country: string | null
    }>({
        coords: { latitude: 0, longitude: 0 },
        address: null,
        city: null,
        state: null,
        country: null,
    })

    const getCurrentLocation = (): void => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude

                    // Fetch address details using Google Maps Geocoding API
                    fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_API}`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.results.length > 0) {
                                const formattedAddress =
                                    data.results[0].formatted_address
                                const city =
                                    data.results[0].address_components.find(
                                        (component: any) =>
                                            component.types.includes(
                                                'locality'
                                            ) ||
                                            component.types.includes(
                                                'administrative_area_level_1'
                                            )
                                    )?.long_name
                                const state =
                                    data.results[0].address_components.find(
                                        (component: any) =>
                                            component.types.includes(
                                                'administrative_area_level_1'
                                            )
                                    )?.long_name
                                const country =
                                    data.results[0].address_components.find(
                                        (component: any) =>
                                            component.types.includes('country')
                                    )?.long_name

                                setCurrentLocation({
                                    coords: { latitude, longitude },
                                    address: formattedAddress,
                                    city,
                                    state,
                                    country,
                                })
                            }
                        })
                        .catch((error) =>
                            console.log('Error fetching address:', error)
                        )
                },
                (error) => console.log('Error getting current location:', error)
            )
        }
    }

    return (
        <div>
            <button onClick={getCurrentLocation}>Get Current Location</button>
            <p>Address: {currentLocation.address}</p>
            <p>City: {currentLocation.city}</p>
            <p>State: {currentLocation.state}</p>
            <p>Country: {currentLocation.country}</p>
        </div>
    )
}

export default CurrentLocationMaps
