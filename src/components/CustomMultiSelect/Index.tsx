import { Field, ErrorMessage } from 'formik'
import ErrorMsg from '../ErrorMessage'
import { Select } from 'antd'
import { CustomSelectContainer } from './style'

const SelectComp = (props: any) => {
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
            <Field name={name} id={name} {...rest}>
                {({ field, form, meta }: any) => {
                    return (
                        // <Form.Item name={name}>
                        <div className="custom-select-inner">
                            <Select
                                bordered={false}
                                className="customSelect"
                                showArrow
                                name={name}
                                id={name}
                                mode="multiple"
                                defaultValue={defaultValue}
                                {...rest}
                                placeholder={placeholder}
                                // You have to provide the onChange function and on changing the value you should call
                                // the setFieldValue function provided by the prop of "form"
                                onChange={(val, select) => {
                                    formik.setFieldValue(name, select)
                                    setCities(select)
                                }}
                                options={options}
                            />
                            {/* {options}
              </Select> */}
                        </div>
                        // </Form.Item>
                    )
                }}
            </Field>
            {/* <ErrorMessage name={name} component={ErrorMsg} /> */}
        </CustomSelectContainer>
    )
}

export default SelectComp
