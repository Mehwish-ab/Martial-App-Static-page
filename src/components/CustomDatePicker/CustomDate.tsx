import { DatePicker } from 'antd'
import { ErrorMessage } from 'formik'
import { CustomDatePickerStyle } from '../CustomDatePicker/style'
import ErrorMsg from '../ErrorMessage'
import dateIcon from '../../assets/images/dateCalander.svg'
import moment from 'moment'
interface Props {
    [x: string]: any
    name: any
    placeholder: any
    label: any
    bgColor?: 'white' | undefined
    border?: '1px solid #c6c6c8;' | undefined
    padding?: '10px' | undefined
    fontFamily?: 'EnnVisions' | undefined
    labelFamily?: 'EnnVisions' | undefined
    onChange: any
    showErroMessage?: true | undefined
    value: any
}

const CustomDate = (props: Props): JSX.Element => {
    const {
        name,
        placeholder,
        label,
        // options,
        bgColor = 'white',
        border = '1px solid #c6c6c8;',
        padding = '10px',
        // title,
        fontFamily = 'EnnVisions',
        labelFamily = 'EnnVisions',
        onChange,
        showErroMessage = true,
        value,
        ...rest
    } = props

    // const formattedDateString = moment(value, "MMMM DD, YYYY").format(
    //   "DD-MM-YYYY"
    // );

    return (
        <CustomDatePickerStyle
            fontFamily={fontFamily}
            labelFamily={labelFamily}
            bgColor={bgColor}
            border={border}
            padding={padding}
        >
            <label htmlFor={name}>{label}</label>
            <div>
                <DatePicker
                    className="customdatepicker"
                    placeholder={placeholder}
                    suffixIcon={<img src={dateIcon} alt="calender-icon" />}
                    name={name}
                    id={name}
                    value={value ? moment(value, 'YYYY-MM-DD') : null}
                    {...rest}
                    onChange={(_, dateString) => {
                        onChange(dateString)
                    }}
                />
            </div>

            {showErroMessage && (
                <ErrorMessage name={String(name)} component={ErrorMsg} />
            )}
        </CustomDatePickerStyle>
    )
}

export default CustomDate
