/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ErrorMessage } from 'formik'
import ErrorMsg from '../ErrorMessage'
import { Select } from 'antd'
import CustomSelectStyle from './style'
import dropDownArrow from '../../assets/icons/ic_add_property_dropdown.svg'
const CustomSelects = (props: any): JSX.Element => {
    const {
        name,
        placeholder,
        onSelect,
        padding = '3px',
        defaultValue,
        label,
        options,
        bgColor,
        border = '1px solid #E0E0E0',
        fontFamily = 'EnnVisions',
        labelFamily = 'EnnVisionsMedium',
        labelMarginBottom = '10px',
        labelFont = '16px',
        fontSize = '16px',
        onChange,
        value,
        showErroMessage = true,
        ...rest
    } = props

    return (
        <CustomSelectStyle
            padding={padding}
            bgColor={bgColor}
            border={border}
            fontFamily={fontFamily}
            labelFamily={labelFamily}
            labelMarginBottom={labelMarginBottom}
            labelFont={labelFont}
            fontSize={fontSize}
        >
            <label htmlFor={name}>{label}</label>
            <Field name={name} id={name} {...rest}>
                {({ field, form, meta }: any) => {
                    return (
                        // <Form.Item name={name}>
                        <div className="custom-select-inner">
                            <Select
                                bordered={false}
                                className="customSelect"
                                name={name}
                                id={name}
                                value={value || null}
                                suffixIcon={
                                    <img
                                        style={{
                                            height: '6px',
                                        }}
                                        src={dropDownArrow}
                                        alt="arrow"
                                    />
                                }
                                defaultValue={defaultValue}
                                {...rest}
                                // onSelect={(val, event) => onSelect(val, event.key)}
                                placeholder={placeholder}
                                // You have to provide the onChange function and on changing the value you should call
                                // the setFieldValue function provided by the prop of "form"
                                onChange={(val: any) => {
                                    onChange(val)
                                }}
                                options={options}
                            />
                        </div>
                        // </Form.Item>
                    )
                }}
            </Field>
            {showErroMessage && (
                <ErrorMessage name={name} component={ErrorMsg} />
            )}
        </CustomSelectStyle>
    )
}

export default CustomSelects
