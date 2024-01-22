/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from 'antd'
import { ErrorMessage, Field } from 'formik'
import CustomFileInputStyle from './style'
import Errormsg from '../ErrorMessage'
import FileUpload from '../../assets/icons/ic_fileSubmit.svg'

type customFileInputProps = {
    name: string
    label: string
    labelFamily?: string
    labelFont?: string
}
const CustomFileInput: React.FC<customFileInputProps> = ({
    label,
    labelFamily = 'EnnVisions',
    name,
    labelFont = '16px',
}) => {
    return (
        <CustomFileInputStyle labelFamily={labelFamily} labelFont={labelFont}>
            <label htmlFor="file">{label}</label>
            <Field name={name} id={name}>
                {({ field, form, meta }: any) => {
                    return (
                        <>
                            <div className="mainUploadContainer">
                                <Input
                                    className="customdatepicker"
                                    placeholder={name}
                                    name={name}
                                    type="file"
                                    id={name}
                                    onChange={(event: any) => {
                                        const selectedFile =
                                            event.target.files[0]
                                        form.setFieldValue(name, selectedFile)
                                        console.log(
                                            `Selected File for ${name}:`,
                                            selectedFile
                                        )
                                    }}
                                />
                                <img
                                    className="uploadImg"
                                    src={FileUpload as string}
                                    alt="Calander"
                                    width={21}
                                    height={21}
                                />
                            </div>
                        </>
                    )
                }}
            </Field>
            <ErrorMessage name={name} component={Errormsg} />
        </CustomFileInputStyle>
    )
}

export default CustomFileInput
