import React, { useEffect, useState } from 'react'
import { Button, Upload } from 'antd'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { OverlayImagesStyled } from './styles'
import editIcon from '../../../assets/icons/ic_cameraIcon.svg'
import DefaultBannerImage from '../../../assets/images/defaultBannerImage.svg'

interface OverlayImagesProps {
    onSaveBanner: (file: File) => void
    isEditable: boolean
    defaultImage: string | null
}

const OverlayImages = ({
    onSaveBanner,
    isEditable,
    defaultImage,
}: OverlayImagesProps): JSX.Element => {
    const [bannerImg, setBannerImg] = useState<string | null>(
        DefaultBannerImage
    )
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (defaultImage != null) {
            setBannerImg(`https://fistastore.com:444${defaultImage}`)
        } else {
            setBannerImg(DefaultBannerImage)
        }
    }, [defaultImage])

    const BannerImgUploadProps = {
        name: 'bannerImg',
        showUploadList: false,
        accept: '.jpeg, .jpg, .webp, tiff, .bmp, .png',
        beforeUpload: (file: File) => {
            // Define the allowed image types
            const allowedTypes = [
                'image/jpeg',
                'image/webp',
                'image/jpg',
                'image/bmp',
                'image/tiff',
                'image/png',
            ]

            // Check if the file type is in the allowed list
            const isAllowedType = allowedTypes.includes(file.type)

            if (isAllowedType) {
                setBannerImg(URL.createObjectURL(file))
                onSaveBanner(file) // Save the file using the provided function
            } else {
                // Display an error message or handle the invalid file type
                // For now, let's log an error to the console
                console.error('Invalid file type. Please upload a valid image.')
            }

            return false // Prevent default upload behavior
        },
    }

    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <OverlayImagesStyled>
                <div className="bg-white image_section">
                    <div className="bannerImg">
                        <img
                            src={(bannerImg || DefaultBannerImage) as string}
                            alt=""
                        />
                        {isEditable && (
                            <div className="changeBannerImgButton">
                                <Upload {...BannerImgUploadProps}>
                                    <Button
                                        icon={
                                            <img
                                                src={editIcon as string}
                                                alt=""
                                                width={'unset'}
                                            />
                                        }
                                    ></Button>
                                </Upload>
                            </div>
                        )}
                    </div>
                </div>
            </OverlayImagesStyled>
        </>
    )
}

export default OverlayImages
