import { CustomizedFileInputStyle } from './style'

type customizedFileInputProps = {
    children: React.ReactNode
}

const CustomizedFileInput: React.FC<customizedFileInputProps> = ({
    children,
}) => {
    return (
        <CustomizedFileInputStyle>
            <div className="upload-wrapper">{children}</div>
        </CustomizedFileInputStyle>
    )
}

export default CustomizedFileInput
