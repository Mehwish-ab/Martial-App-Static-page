import React from 'react'
import FormControl from '../../../components/FormControl'
import { Col } from 'react-bootstrap'
import Clock from '../../../assets/icons/ic_clock.svg'
import { fontFamilyMedium } from '../../../components/GlobalStyle'
import { FilterTimeTableStyled } from './styles'
import { Formik } from 'formik'
import { Form } from 'antd'
import moment, { Moment } from 'moment'

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
    const initialTime = endTime ? moment(endTime, 'HH:mm:ss') : null
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
                                        control="EditTimePicker"
                                        type="endTime"
                                        name="endTime"
                                        value={initialTime}
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

export default EndTime
