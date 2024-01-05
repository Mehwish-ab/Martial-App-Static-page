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
    endTime: string | undefined
    setStartTime: (
        _recordIndex: number,
        _key: string,
        _value: undefined | string | boolean | number,
        _timeEntryIndex?: number
    ) => void
}

const EndTime: React.FC<TimeTableFormProps> = ({
    rowIndex,
    recordIndex,
    endTime,
    setStartTime,
}: TimeTableFormProps) => {
    const initialValues = {
        endTime: endTime,
    }

    const onChangeHandler = (value: string): void => {
        setStartTime(recordIndex, 'endTime', value, rowIndex)
    }
    return (
        <>
            {/* {Createmodal().modalComponent} */}
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

export default EndTime
