import { Modal } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import close from '../../assets/icons/ic_close.svg'
import CustomModalStyle from './style'

type CustomModalPropsTypes = {
    title: string
    description: string
    isModalVisible: boolean
    onCancel?: () => void
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
    width?: string
    showCloseBtn?: boolean
    imageProp: string
}

const CustomModal: React.FC<CustomModalPropsTypes> = ({
    title,
    imageProp,
    description,
    isModalVisible,
    setIsModalVisible,
    onCancel,
    width = '550px',
    showCloseBtn = true,
}) => {
    const handleCancel = (): void => {
        setIsModalVisible(false)
        if (onCancel) {
            onCancel()
        }
    }

    return (
        <Modal
            open={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            centered={true}
            closable={false}
            width={width}
            className="position-relative"
        >
            <CustomModalStyle>
                {showCloseBtn && (
                    <img
                        className="close-icon"
                        onClick={handleCancel}
                        src={close}
                        alt="close"
                    />
                )}
                <div className="px-2">
                    <img
                        src={imageProp}
                        alt="Success Icon"
                        width={79}
                        height={79}
                    />
                    {title && <h6 className="title my-2">{title}</h6>}
                    {description && (
                        <p className="description">{description}</p>
                    )}
                </div>
            </CustomModalStyle>
        </Modal>
    )
}

export default CustomModal
