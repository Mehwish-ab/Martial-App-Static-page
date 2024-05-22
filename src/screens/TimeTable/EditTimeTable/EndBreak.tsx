import React from 'react'
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

interface TimeTableFormProps {
    rowIndex: number
    recordIndex: number
    endBreak: string | undefined
    setStartTime: (
        _recordIndex: number,
        _key: string,
        _value: undefined | string | boolean | number,
        _timeEntryIndex?: number
    ) => void
    minTime: string | undefined
    maxTime: string | undefined
}

const EndBreak: React.FC<TimeTableFormProps> = ({
    rowIndex,
    recordIndex,
    endBreak,
    setStartTime,
    minTime,
    maxTime,
}: TimeTableFormProps) => {
    const initialValues = {
        endBreak: endBreak,
    }
    const onChangeHandler = (value: string): void => {
        setStartTime(recordIndex, 'endBreak', value, rowIndex)
    }
    return (
        <>
            <FilterTimeTableStyled>
                <Formik initialValues={initialValues} onSubmit={() => {}}>
                    {(formik) => {
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <Col md="12">
                                    <FormControl
                                        control="TimePicker"
                                        type="endBreak"
                                        name="endBreak"
                                        labelFamily={`${fontFamilyMedium}`}
                                        fontSize="16px"
                                        value={endBreak}
                                        suffixIcon={
                                            <img
                                                src={Clock as string}
                                                alt="calender-icon"
                                            />
                                        }
                                        max={6}
                                        placeholder="00:00:00"
                                        onChange={onChangeHandler}
                                        minTime={minTime}
                                        maxTim={maxTime}
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

export default EndBreak
