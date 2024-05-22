import React, { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { Col } from 'antd'

const Map = ({ AllSchool }: { AllSchool: any }): JSX.Element => {
    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const loader = new Loader({
            apiKey: 'https://maps.googleapis.com/maps/api/js?key=&loading=async&callback=initMap', // Replace 'YOUR_API_KEY' with your actual API key
            version: 'weekly',
            // Add any additional options as needed
        })
        loader.load().then(() => {
            if (mapContainerRef.current && AllSchool && AllSchool.data) {
                const map = new google.maps.Map(mapContainerRef.current, {
                    center: {
                        lat: Number(AllSchool.data[0].latitude), // Centering on the first location
                        lng: Number(AllSchool.data[0].longitude),
                    },
                    zoom: 14,
                })

                // Add markers for each location
                AllSchool.data.forEach((item: any) => {
                    new google.maps.Marker({
                        position: {
                            lat: Number(item.latitude),
                            lng: Number(item.longitude),
                        },
                        map: map,
                        title: item.address,
                    })
                })
            }
        })
    }, [AllSchool])

    return (
        <div ref={mapContainerRef} style={{ width: '100%', height: '80vh' }} />
    )
}

export default Map
