// import React, { useEffect, useRef } from 'react'
// import { Loader } from '@googlemaps/js-api-loader'

// const Map = (): JSX.Element => {
//     const mapContainerRef = useRef<HTMLDivElement>(null)

//     useEffect(() => {
//         const loader = new Loader({
//             apiKey: 'https://maps.googleapis.com/maps/api/js?key=&loading=async&callback=initMap', // Replace 'YOUR_API_KEY' with your actual API key
//             version: 'weekly',
//             // Add any additional options as needed
//         })

//         loader.load().then(() => {
//             if (mapContainerRef.current) {
//                 new google.maps.Map(mapContainerRef.current, {
//                     center: { lat: -34.397, lng: 150.644 },
//                     zoom: 8,
//                 })
//             }
//         })
//     }, [])

//     return (
//         <div ref={mapContainerRef} style={{ width: '100%', height: '40vh' }}>
//             {' '}
//         </div>
//     )

// }

// export default Map

import React, { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const Map = ({
    address,
    latitude,
    longitude,
}: {
    address: string
    latitude: number
    longitude: number
}): JSX.Element => {
    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const loader = new Loader({
            apiKey: 'https://maps.googleapis.com/maps/api/js?key=&loading=async&callback=initMap', // Replace 'YOUR_API_KEY' with your actual API key
            version: 'weekly',
            // Add any additional options as needed
        })

        loader.load().then(() => {
            if (mapContainerRef.current) {
                const map = new google.maps.Map(mapContainerRef.current, {
                    center: { lat: latitude, lng: longitude },
                    zoom: 14,
                })

                // Add marker
                new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map,
                    title: address,
                })
            }
        })
    }, [address, latitude, longitude])

    return (
        <div ref={mapContainerRef} style={{ width: '100%', height: '40vh' }}>
            {' '}
        </div>
    )
}

export default Map
