import { useEffect, useState } from 'react'
import { addCurrentLocation } from '../redux/features/location/locationSlice'
import { getAppData } from '../redux/features/appDataSlice'
import store from '../redux/store'
import { MAP_API } from '../App'
import { getScreenTranslation } from '../redux/features/screenTranslationSlice'

interface Location {
    latitude: number
    longitude: number
    city: string
    state: string
    country: string
    address: string
}

interface Position {
    coords: {
        latitude: number
        longitude: number
    }
}

interface AddressComponent {
    long_name: string
    short_name: string
    types: string[]
}

const useLocationData = (): any => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [location, setLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
        city: '',
        state: '',
        country: '',
        address: '',
    })

    const getLocation = (): void => {
        // console.log("use geolocation");
        if (navigator.geolocation) {
            // console.log("use if geolocation");

            navigator.geolocation.getCurrentPosition(
                async (position: Position) => {
                    const { latitude, longitude } = position.coords
                    setLoading(true)
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_API}`
                    )

                    const data = await response.json()

                    const city =
                        data.results.length !== 0 &&
                        data.results[0].address_components.find(
                            (component: AddressComponent) =>
                                component.types.includes('locality')
                        )?.long_name

                    const state =
                        data.results.length !== 0 &&
                        data.results[0].address_components.find(
                            (component: AddressComponent) =>
                                component.types.includes(
                                    'administrative_area_level_1'
                                )
                        )?.long_name

                    const country =
                        data.results.length !== 0 &&
                        data.results[0].address_components.find(
                            (component: AddressComponent) =>
                                component.types.includes('country')
                        )?.long_name

                    const address =
                        data.results.length !== 0 &&
                        data.results[0].formatted_address

                    setLocation({
                        latitude,
                        longitude,
                        city: city || 'Not Available',
                        state: state || 'Not Available',
                        country: country || 'Not Available',
                        address,
                    })

                    const locationData = {
                        latitude,
                        longitude,
                        city: city || 'Not Available',
                        state: state || 'Not Available',
                        country: country || 'Not Available',
                        address,
                    }
                    store.dispatch(addCurrentLocation(locationData))
                    store.dispatch(getAppData(country))
                    store.dispatch(getScreenTranslation())

                    setLoading(false)
                },
                // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-unused-vars
                (error: any) => {
                    // console.log("Error retrieving location:", error);
                    store.dispatch(getAppData('Canada'))
                    store.dispatch(getScreenTranslation())

                    setError('Error retrieving location.')
                    setLoading(false)
                }
            )
        } else {
            // console.log(
            //   "Geolocation is not supported by this browser.",
            //   "error in geolocation"
            // );
            setError('Geolocation is not supported by this browser.')
            setLoading(false)
        }
    }

    useEffect(() => {
        // console.log("running 1");
        getLocation()
    }, [])

    return {
        loading,
        error,
        location,
    }
}

export default useLocationData
