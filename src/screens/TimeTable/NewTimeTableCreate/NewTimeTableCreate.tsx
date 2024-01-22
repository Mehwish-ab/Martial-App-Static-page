import { TimeTableCreate } from './styles'
import { Formik } from 'formik'
import { Form, Tabs } from 'antd'

import {
    fontFamilyMedium,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import Head from '../../../components/Head/Head'
import SlotsComponent from './slotsComponent'
import TimeTableForm from '../CreateTimeTable/TimeTableForm'

const NewTimeTable = (): JSX.Element => {
    const dayOfWeeks = [
        {
            key: '1',
            label: 'Monday',
            component: <SlotsComponent />,
        },
        {
            key: '2',
            label: 'Tuesday',
            component: <SlotsComponent />,
        },
        {
            key: '3',
            label: 'Wednesday',
            component: <SlotsComponent />,
        },
        {
            key: '4',
            label: 'Thursday',
            component: <SlotsComponent />,
        },
        {
            key: '5',
            label: 'Friday',
            component: <SlotsComponent />,
        },
        {
            key: '6',
            label: 'Saturday',
            component: <SlotsComponent />,
        },
        {
            key: '7',
            label: 'Sunday',
            component: <SlotsComponent />,
        },
    ]

    return (
        <>
            <Head title="TimeTable Create" />
            <TimeTableCreate>
                <Formik
                    initialValues={{} as any}
                    // validationSchema={validationSchema}
                    onSubmit={(e) => {
                        {
                        }
                    }}
                >
                    {(formik) => {
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="bg-white form">
                                    <div>
                                        <h3 className="timetable-heading">
                                            Session Timings by Day
                                        </h3>
                                        <Tabs
                                            defaultActiveKey="1"
                                            type="card"
                                            items={dayOfWeeks.map((days) => {
                                                console.log('umi', days)
                                                return {
                                                    label: `${days?.label}`,
                                                    key: `${days?.key}`,
                                                    children: days.component,
                                                }
                                            })}
                                        />
                                    </div>
                                </div>

                                <div className="mt-20 d-flex justify-content-end">
                                    <CustomButton
                                        bgcolor={lightBlue3}
                                        textTransform="Captilize"
                                        color={maastrichtBlue}
                                        padding="11px 40.50px"
                                        fontFamily={`${fontFamilyMedium}`}
                                        width="fit-content"
                                        type="submit"
                                        title="Submit"
                                        fontSize="18px"
                                        loading={false}
                                    />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </TimeTableCreate>
        </>
    )
}

export default NewTimeTable
