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
    // let img: any = null
    // if (defaultImage !== null) {
    //     img = `https://fistastore.com:444${defaultImage}`
    // } else {
    //     img = DefaultBannerImage
    // }

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
        accept: '.jpeg, .jpg, .webp, .png, tiff, .bmp',
        beforeUpload: (file: File) => {
            setBannerImg(URL.createObjectURL(file))
            onSaveBanner(file) // Save the file using the provided function
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
