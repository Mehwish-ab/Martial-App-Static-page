import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'
import { pureDark2 } from '../../components/GlobalStyle'

const VerticalBarDemo = (): JSX.Element => {
    const [chartData, setChartData] = useState({})
    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        const data = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            datasets: [
                {
                    label: 'School',
                    backgroundColor: ['#4A8DD1'],
                    borderColor: ['#4A8DD1'],
                    data: [65, 59, 80, 81, 56, 55, 40, 12, 33, 66, 77, 100],
                },
                {
                    label: 'Branch',
                    backgroundColor: ['#FF6384'],
                    borderColor: ['#FF6384'],
                    data: [28, 48, 40, 19, 86, 27, 50, 80, 81, 56, 55, 40],
                },
                {
                    label: 'Franchise',
                    backgroundColor: ['#4AD18B'],
                    borderColor: ['#4AD18B'],
                    data: [48, 88, 22, 77, 55, 24, 10, 30, 61, 86, 65, 70],
                },
                {
                    label: 'Instructor',
                    backgroundColor: ['#4AC3D1'],
                    borderColor: ['#4AC3D1'],
                    data: [65, 59, 80, 81, 56, 55, 40, 12, 33, 66, 77, 100],
                },
            ],
        }
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: `${pureDark2}`,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: `${pureDark2}`,
                        font: {
                            weight: 500,
                        },
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: `${pureDark2}`,
                    },
                    grid: {
                        color: 'transparent',
                        drawBorder: false,
                    },
                },
            },
        }

        setChartData(data)
        setChartOptions(options)
    }, [])

    return (
        // <div className="card">
        <Chart type="line" data={chartData} options={chartOptions} />
        // </div>
    )
}
export default VerticalBarDemo
