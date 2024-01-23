import Input from './CustomInput/CustomInput'
import Select from './CustomSelect/CustomSelect'
import DatePicker from './CustomDatePicker/CustomDatePicker'
import Textarea from './CustomTextArea/CustomTextarea'
// import Checkbox from "./Checkbox";
import CustomSearchSelect from './CustomSearchSelect'
import CustomMultiSelect from './CustomMultiSelect/Index'
import CustomPasswordInput from './CustomPasswordInput/CustomPasswordInput'
import { Checkbox, Radio } from 'antd'
import CustomFileInput from './CustomFileInput/CustomFileInput'
import CustomDate from './CustomDatePicker/CustomDate'
import CustomSelects from './CustomSelect/CustomSelects'
import CustomTimePicker from './CustomDateTimePicker/Index'
import CustomTimePickerNew from './CustomTimePicker/CustomTimePicker'
import CustomDateRangePicker from './CustomDateRangePicker/CustomDateRangePicker'
export interface FieldStyleBasicProps {
    padding: string
    bgColor: string
    border: string
}

type formControlProps = {
    control:
        | 'input'
        | 'select'
        | 'searchSelect'
        | 'multiSelect'
        | 'checkbox'
        | 'password'
        | 'textarea'
        | 'inputNumber'
        | 'radio'
        | 'date'
        | 'file'
        | 'dateTime'
        | 'timePicker'
        | 'startEndDate'
} & React.ComponentProps<any>
const FormControl: React.FC<formControlProps> = (props) => {
    const { control, ...rest } = props
    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'select':
            return <Select {...rest} />
        case 'selects':
            return <CustomSelects {...rest} />
        case 'searchSelect':
            return <CustomSearchSelect {...rest} />
        case 'multiSelect':
            return <CustomMultiSelect {...rest} />
        case 'checkbox':
            return <Checkbox {...rest} />
        case 'password':
            return <CustomPasswordInput {...rest} />
        case 'textarea':
            return <Textarea {...rest} />
        case 'radio':
            return <Radio {...rest} />
        case 'date':
            return <DatePicker {...rest} />
        case 'dates':
            return <CustomDate {...rest} />
        case 'file':
            return <CustomFileInput {...rest} />
        case 'TimePicker':
            return <CustomTimePicker {...rest} />
        case 'timePicker':
            return <CustomTimePickerNew {...rest} />
        case 'startEndDate':
            return <CustomDateRangePicker {...rest} />
        default:
            return null
    }
}

export default FormControl
