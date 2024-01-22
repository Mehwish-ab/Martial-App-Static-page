import React from 'react'
import FormControl from '../../../components/FormControl'
import { Col } from 'react-bootstrap'
import Clock from '../../../assets/icons/ic_clock.svg'
import { fontFamilyMedium } from '../../../components/GlobalStyle'
import { FilterTimeTableStyled } from './styles'
// import useTimetable from '../../../hooks/useTimetable'
import { Formik } from 'formik'
import { Form } from 'antd'
import moment from 'moment'

interface TimeTableFormProps {
    rowIndex: number
    recordIndex: number
    startTime: string | undefined

    setStartTime: (
        _recordIndex: number,
        _key: string,
        _value: undefined | string | boolean | number,
        _timeEntryIndex?: number
    ) => void
}

const StartTime: React.FC<TimeTableFormProps> = ({
    rowIndex,
    recordIndex,
    startTime,
    setStartTime,
}: TimeTableFormProps) => {
    const initialValues = {
        startTime: startTime,
    }

    const onChangeHandler = (value: string): void => {
        setStartTime(recordIndex, 'startTime', value, rowIndex)
    }
    return (
        <>
            <FilterTimeTableStyled>
                <Formik
                    initialValues={initialValues}
                    onSubmit={() => {
                        console.log('checking on ok press')
                    }}
                >
                    {(formik) => {
                        // console.log('formik values', formik.values)
                        // submit(formik.values.startTime)

                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <Col md="12">
                                    <FormControl
                                        control="TimePicker"
                                        type="startTime"
                                        name="startTime"
                                        labelFamily={`${fontFamilyMedium}`}
                                        fontSize="16px"
                                        suffixIcon={
                                            <img
                                                src={Clock as string}
                                                alt="calender-icon"
                                            />
                                        }
                                        max={6}
                                        placeholder="00:00:00"
                                        onChange={onChangeHandler}
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

export default StartTime
