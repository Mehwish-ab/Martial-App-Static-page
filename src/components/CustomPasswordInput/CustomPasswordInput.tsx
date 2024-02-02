/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ErrorMessage } from 'formik'
import ErrorMsg from '../ErrorMessage'
import { Input } from 'antd'
import CustomPasswordInputStyle from './style'
import show_password_icon from '../../assets/icons/ic_show_passcode.svg'
import hide_password_icon from '../../assets/icons/ic_hidePassword.svg'

import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    tertiaryGrey24,
} from '../GlobalStyle'
import useScreenTranslation from '../../hooks/useScreenTranslation'

type CustomPasswordInputProps = {
    label: string
    className: string
    placeholder: string
    name: string
    fontFamily?: string
    border?: string
    showErrorMessage?: boolean
    padding?: string
    placeholderFamily?: 'EnnVisions' | 'EnnVisionsMedium' | 'EnnVisionsBold'
    placeholderFont?: string
    fontSize?: string
    labelFont?: string
    labelFamily?: string
    labelMarginBottom?: string
    placeholderColor?: string
}

const CustomPasswordInput = (props: CustomPasswordInputProps): JSX.Element => {
    const {
        label,
        className,
        placeholder,
        name,
        labelFont = '16px',
        labelFamily = fontFamilyMedium,
        labelMarginBottom = '10px',
        fontFamily = fontFamilyRegular,
        border = `1px solid ${tertiaryGrey24}`,
        showErrorMessage = true,
        padding = '10px',
        placeholderFamily = fontFamilyRegular,
        placeholderColor = `${lightDark2}`,
        placeholderFont = '16px',
        fontSize = '16px',
        ...rest
    } = props
    // const { getLabelByKey } = useScreenTranslation('loginScreen')
    return (
        <CustomPasswordInputStyle
            fontFamily={fontFamily}
            border={border}
            placeholderFamily={placeholderFamily}
            placeholderColor={placeholderColor}
            padding={padding}
            placeholderFont={placeholderFont}
            fontSize={fontSize}
            labelFamily={labelFamily}
            labelFont={labelFont}
            labelMarginBottom={labelMarginBottom}
        >
            <label htmlFor={name}>{label}</label>
            <Field name={name} id={name}>
                {({ field, form, meta }: any) => (
                    <Input.Password
                        className={className}
                        {...rest}
                        placeholder={placeholder}
                        {...field}
                        iconRender={(visible) =>
                            visible ? (
                                <span className="paswordIconLabel">
                                    {/* {getLabelByKey("hide")} */}
                                    <img src={hide_password_icon} alt="" />
                                </span>
                            ) : (
                                <span className="paswordIconLabel">
                                    {/* {getLabelByKey("show")} */}
                                    <img src={show_password_icon} alt="" />
                                </span>
                            )
                        }
                    />
                )}
            </Field>
            {showErrorMessage && (
                <ErrorMessage name={name} component={ErrorMsg} />
            )}
        </CustomPasswordInputStyle>
    )
}

export default CustomPasswordInput
