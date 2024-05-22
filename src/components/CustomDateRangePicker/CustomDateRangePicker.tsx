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
    onApply: (value: RangeValue) => any // Callback for apply button
    onCancel?: () => void // Callback for cancel button
    showErrorMessage?: true
    startDate: any
    endDate: any
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
        onApply,
        showErrorMessage = true,
        startDate,
        endDate,
        ...rest
    } = props

    const [dates, setDates] = useState<RangeValue>(null)
    const [isPickerOpen, setPickerOpen] = useState<boolean>(false)

    const handleApply = (): void => {
        if (dates) {
            onApply(dates)
        }
    }

    const handleCancel = (): void => {
        if (!dates || (!dates[0] && !dates[1])) {
            setDates(null)
        }
        setPickerOpen(false)
    }

    const renderExtraFooter = (): JSX.Element => (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
                style={{
                    padding: '3px 20px',
                    background: '#C0E9F9',
                    margin: '5px',
                    fontSize: '15px',
                    color: 'black',
                    borderRadius: '7px',
                }}
                onClick={handleApply}
            >
                Apply
            </button>
            <button
                style={{
                    padding: '3px 20px',
                    background: '#EFEFEF',
                    margin: '5px',
                    fontSize: '15px',
                    color: 'black',
                    borderRadius: '7px',
                }}
                className="cancelButton"
                onClick={handleCancel}
            >
                Cancel
            </button>
        </div>
    )

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
                    <div onClick={() => setPickerOpen(true)}>
                        <RangePicker
                            allowClear={false}
                            value={dates}
                            open={isPickerOpen} // Updated visibility condition
                            name={name}
                            onCalendarChange={(val) => {
                                setDates(val)
                            }}
                            format="ddd, MMM DD, YYYY"
                            onChange={(val) => {
                                form.setFieldValue(field.name, val)
                            }}
                            suffixIcon={
                                <img src={dateIcon} alt="calender-icon" />
                            }
                            renderExtraFooter={renderExtraFooter}
                        />
                    </div>
                )}
            </Field>

            {showErrorMessage && (
                <ErrorMessage name={name} component={ErrorMsg} />
            )}
        </CustomDateRangePickerStyle>
    )
}

export default CustomDateRangePicker
