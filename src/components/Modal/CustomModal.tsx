import { Modal } from 'antd'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import close from '../../assets/icons/ic_close.svg'
import CustomModalStyle from './style'

type CustomModalPropsTypes = {
    children: ReactNode
    isModalVisible: boolean
    onCancel?: () => void
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
    width?: string
    showCloseBtn?: boolean
}

const CustomModal: React.FC<CustomModalPropsTypes> = ({
    children,
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

                <div className="px-2">{children}</div>
            </CustomModalStyle>
        </Modal>
    )
}

export default CustomModal
