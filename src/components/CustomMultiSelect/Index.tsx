/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, FieldProps } from 'formik'
import { Select } from 'antd'
import { CustomSelectContainer } from './style'
import { FC } from 'react'

interface Props {
    [x: string]: any
    name: string
    placeholder: any
    onChange: any
    defaultValue: any
    label: any
    options: any
    formik: any
    setCities: any
}

const SelectComp: FC<Props> = (props: Props): JSX.Element => {
    const {
        name,
        placeholder,
        onChange,
        defaultValue,
        label,
        options,
        formik,
        setCities,
        ...rest
    } = props

    return (
        <CustomSelectContainer>
            <label htmlFor={name}>{label}</label>
            <Field name={name} id={name}>
                {({ field, form, meta }: FieldProps) => (
                    <div className="custom-select-inner">
                        <Select
                            bordered={false}
                            className="customSelect"
                            showArrow
                            mode="multiple"
                            defaultValue={defaultValue}
                            placeholder={placeholder}
                            onChange={(val, select) => {
                                formik.setFieldValue(name, select)
                                setCities(select)
                            }}
                            options={options}
                        />
                    </div>
                )}
            </Field>
        </CustomSelectContainer>
    )
}

export default SelectComp
