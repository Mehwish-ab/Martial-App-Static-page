import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'

const DoughnutChartDemo = (): JSX.Element => {
    const [chartData, setChartData] = useState({})
    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement)
        const data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#FF6384', // Change to desired color
                        '#36A2EB', // Change to desired color
                        '#FFCE56', // Change to desired color
                    ],
                    hoverBackgroundColor: [
                        '#FF6384', // Change to desired hover color
                        '#36A2EB', // Change to desired hover color
                        '#FFCE56', // Change to desired hover color
                    ],
                },
            ],
        }
        const options = {
            cutout: '60%',
        }

        setChartData(data)
        setChartOptions(options)
    }, [])

    return (
        // <div className="flex justify-content-center">
        <Chart
            type="doughnut"
            data={chartData}
            options={chartOptions}
            className="w-full md:w-30rem"
        />
        // </div>
    )
}
export default DoughnutChartDemo
