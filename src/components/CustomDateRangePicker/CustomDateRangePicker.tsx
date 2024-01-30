import type { Moment } from 'moment'
import React, { useState } from 'react'
import { DatePicker } from 'formik-antd'
import { CustomDateRangePickerStyle } from './style'
import { ErrorMessage, Field, FieldProps } from 'formik'
import ErrorMsg from '../ErrorMessage'
import dateIcon from '../../assets/images/dateCalander.svg'

const { RangePicker } = DatePicker

type RangeValue = [Moment | null, Moment | null] | null

interface CustomDateRangePickerProps {
    name: string
    placeholder: string
    label: string
    bgColor?: 'white'
    border?: '1px solid #c6c6c8;'
    padding?: '8px'
    fontFamily?: 'EnnVisions'
    labelFamily?: 'EnnVisions'
    marginBottom?: '10px'
    onChange: (value: RangeValue) => void
    showErrorMessage?: true
}

const CustomDateRangePicker = (
    props: CustomDateRangePickerProps
): JSX.Element => {
    const {
        name,
        placeholder,
        label,
        bgColor = 'white',
        border = '1px solid #c6c6c8;',
        padding = '8px',
        fontFamily = 'EnnVisions',
        labelFamily = 'EnnVisions',
        marginBottom = '10px',
        onChange,
        showErrorMessage = true,
        ...rest
    } = props

    const [dates, setDates] = useState<RangeValue>()

    return (
        <CustomDateRangePickerStyle
            fontFamily={fontFamily}
            labelFamily={labelFamily}
            bgColor={bgColor}
            border={border}
            padding={padding}
        >
            {label && <label htmlFor={name}>{label}</label>}
            <Field name={name} id={name} {...rest}>
                {({ field, form }: FieldProps) => (
                    <RangePicker
                        allowClear={false}
                        value={dates}
                        name={name}
                        // disabledDate={disabledDate}
                        onCalendarChange={(val) => {
                            setDates(val)
                        }}
                        format="ddd, MMM DD, YYYY"
                        onChange={(val) => {
                            if (onChange) {
                                onChange(val)
                            } else {
                                form.setFieldValue(field.name, val)
                            }
                        }}
                        suffixIcon={<img src={dateIcon} alt="calender-icon" />}
                    />
                )}
            </Field>
            {showErrorMessage && (
                <ErrorMessage name={name} component={ErrorMsg} />
            )}
        </CustomDateRangePickerStyle>
    )
}

export default CustomDateRangePicker
