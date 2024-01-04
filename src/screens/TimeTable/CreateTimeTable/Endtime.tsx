import React, { useEffect } from 'react'
import FormControl from '../../../components/FormControl'
import { Col } from 'react-bootstrap'
import Clock from '../../../assets/icons/ic_clock.svg'
import { fontFamilyMedium } from '../../../components/GlobalStyle'
import { FilterTimeTableStyled } from './styles'
// import useTimetable from '../../../hooks/useTimetable'
import { Formik } from 'formik'
import { Form } from 'antd'
// import { useAppSelector } from '../../../app/hooks'
// import { useNavigate } from 'react-router-dom'
import { CreateTimeTableSlotsInitialValues } from '../slotsConstants'

interface TimeTableFormProps {
    setEndTime: React.Dispatch<React.SetStateAction<any>>
}

const EndTime: React.FC<TimeTableFormProps> = ({ setEndTime }: any) => {
    // const { data: loginData } = useAppSelector((state) => state.loginData)
    // const navigate = useNavigate()

    useEffect(() => {}, [])
    // setEndTime('values')
    // const { handleCreateSubmit, Createmodal } = useTimetable()
    const initialValues: CreateTimeTableSlotsInitialValues = {
        dayOfWeek: '',
        timeTableId: 0,
        startTime: '',
        endTime: '',
        startBreak: '',
        endBreak: '',
    }
    const submit = (values: any): void => {
        console.log(
            'This is submit function and the values passed are',
            values.startTime
        )
        console.log('Extracted start time from above is', values.startTime)
        setEndTime(values)
    }
    // const submit = (values: any): void => {
    // setEndTime('hi')
    // }
    // const onSubmit = async (values: any): Promise<void> => {
    //     console.log('im handle submit button')
    //     const data = await handleCreateSubmit(
    //         values,
    //         Number(loginData?.userDetails.id)
    //     )
    //     console.log(data.timetableId, 'dataaa')
    //     const timeTableId = data?.timeTableId
    //     // setNewTimetable(data)
    //     navigate(`/timetable/slots/${timeTableId}`)
    // }
    return (
        <>
            {/* {Createmodal().modalComponent} */}
            <FilterTimeTableStyled>
                <Formik initialValues={initialValues} onSubmit={() => {}}>
                    {(formik) => {
                        console.log('formik values', formik.values)
                        submit(formik.values.endTime)

                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <Col md="12">
                                    <FormControl
                                        control="TimePicker"
                                        type="endTime"
                                        name="endTime"
                                        labelFamily={`${fontFamilyMedium}`}
                                        fontSize="16px"
                                        suffixIcon={
                                            <img
                                                src={Clock as string}
                                                alt="calender-icon"
                                            />
                                        }
                                        max={6}
                                        placeholder="12-05-1989"
                                        // onKeyUp={setEndTime(
                                        //     formik.values.endTime
                                        // )}
                                    />
                                </Col>
                            </Form>
                        )
                    }}
                </Formik>
            </FilterTimeTableStyled>
        </>
    )
}

export default EndTime
