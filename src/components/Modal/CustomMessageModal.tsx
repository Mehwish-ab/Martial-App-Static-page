import { Modal } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import close from '../../assets/icons/ic_close.svg'
import { CustomMessageModalStyle } from './style'
import ic_success from '../../assets/images/ic_success.svg'
import ic_error from '../../assets/icons/ic_error.svg'
type CustomMessageModalPropsTypes = {
    title: string
    description: string
    isModalVisible: boolean
    onCancel?: () => void
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
    width?: string
    showCloseBtn?: boolean
    imageProp: string
}

const CustomMessageModal: React.FC<CustomMessageModalPropsTypes> = ({
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
            <CustomMessageModalStyle>
                {showCloseBtn && (
                    <img
                        className="close-icon"
                        onClick={handleCancel}
                        src={close}
                        alt="close"
                    />
                )}
                <div className="px-2 mainContainer d-flex flex-column align-items-center">
                    {imageProp === 'error' ? (
                        <img
                            src={ic_error}
                            alt="Error Icon"
                            width={79}
                            height={79}
                        />
                    ) : (
                        <img
                            src={ic_success}
                            alt="Success Icon"
                            width={79}
                            height={79}
                        />
                    )}
                    {title && (
                        <h6 className="mainContainer-heading text-center">
                            {title}
                        </h6>
                    )}
                    {description && (
                        <p className="mainContainer-subText text-center">
                            {description}
                        </p>
                    )}
                </div>
            </CustomMessageModalStyle>
        </Modal>
    )
}

export default CustomMessageModal
