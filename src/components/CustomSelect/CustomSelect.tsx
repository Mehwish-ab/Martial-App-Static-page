import { Field, ErrorMessage } from 'formik'
import ErrorMsg from '../ErrorMessage'
import { Select } from 'antd'
import CustomSelectStyle from './style'
import dropDownArrow from '../../assets/icons/ic_add_property_dropdown.svg'
import { fontFamilyRegular, tertiaryGrey24 } from '../GlobalStyle'

const CustomSelect = (props: any): JSX.Element => {
    const {
        name,
        placeholder,
        onSelect,
        padding = '8px 10px',
        defaultValue,
        label,
        options,
        bgColor,
        border = `1px solid ${tertiaryGrey24}`,
        fontFamily = `${fontFamilyRegular}`,
        labelFamily = `${fontFamilyRegular}`,
        labelMarginBottom = '7px',
        labelFont = '16px',
        fontSize = '16px',
        onChange,
        showErroMessage = true,
        value,
        selectionMode, // default to 'single' mode
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
                        <div className="custom-select-inner">
                            <Select
                                mode={
                                    selectionMode === 'multiple'
                                        ? 'multiple'
                                        : undefined
                                }
                                bordered={false}
                                className="customSelect"
                                name={name}
                                id={name}
                                suffixIcon={
                                    <img
                                        height={7}
                                        width={12}
                                        src={dropDownArrow}
                                        alt="arrow"
                                    />
                                }
                                defaultValue={defaultValue}
                                value={value}
                                {...rest}
                                placeholder={placeholder}
                                onChange={(val) => {
                                    // Update the form field value with the selected value(s)
                                    form.setFieldValue(name, val)
                                    if (onChange) {
                                        onChange(val)
                                    }
                                }}
                                options={options}
                            />
                        </div>
                    )
                }}
            </Field>
            {showErroMessage && (
                <ErrorMessage name={name} component={ErrorMsg} />
            )}
        </CustomSelectStyle>
    )
}

export default CustomSelect
