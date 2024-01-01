import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, message, Upload } from 'antd'
import axios from 'axios'
import { loginDataTypes } from '../../../redux/features/types'

import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { OverlayImagesStyled } from './styles'
import { authorizationToken, base_url } from '../../../utils/api_urls'

import editIcon from '../../../assets/icons/ic_cameraIcon.svg'

import DefaultProfileImage from '../../../assets/images/defaultProfileImage.svg'
import DefaultBannerImage from '../../../assets/images/defaultBannerImage.svg'
interface OverlayImagesProps {
    backgroundImg: unknown
    overlayImg: unknown
    isEditable: boolean
}
export const ipForImages = 'https://fistastore.com:444/'

const OverlayImages = ({
    backgroundImg,
    overlayImg,
    isEditable,
}: OverlayImagesProps): JSX.Element => {
    // const { schoolId } = useParams()
    // const { branchId } = useParams()
    // const { franchiseId } = useParams()

    // const jwtDetails = useSelector(
    //     (state: RootState) => state.loginData.data?.jwtDetails
    // )

    const [profileImg, setProfileImg] = useState(overlayImg)
    const [bannerImg, setBannerImg] = useState(backgroundImg)
    const [loading, setLoading] = useState(false)
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    const { loginData } = useSelector((state: RootState) => state)

    useEffect(() => {
        setProfileImg(overlayImg)
        setBannerImg(backgroundImg)
    }, [overlayImg, backgroundImg])
    const { schoolId } = useParams()
    const { branchId } = useParams()

    const { franchiseId } = useParams()

    const { instructorId } = useParams()
    console.log('checking pages', schoolId, branchId, franchiseId, instructorId)

    const useCaseOfBanner = branchId
        ? 'BRANCH_BANNER_IMAGE'
        : schoolData.schoolId
          ? 'SCHOOL_BANNER_IMAGE'
          : instructorId
            ? 'INSTRUCTOR_BANNER_IMAGE'
            : ''

    const useCaseOfProfile = branchId
        ? 'BRANCH_PROFILE_IMAGE'
        : schoolData.schoolId
          ? 'SCHOOL_PROFILE_PICTURE'
          : instructorId
            ? 'INSTRUCTOR_PROFILE_IMAGE'
            : ''
    const uploadImage = async (
        info: string | Blob | File,
        useCase: string
    ): Promise<void> => {
        try {
            setLoading(true)

            const formData = new FormData()
            formData.append('multiPart', (info as any).file)

            const requestData = {
                id: schoolData.schoolId || branchId || instructorId || '',
                useCase: useCase,
                // Add any additional parameters needed
            }

            formData.append(
                'data',
                new Blob([JSON.stringify(requestData)], {
                    type: 'application/json',
                })
            )

            const { data } = await axios.post(
                base_url + 'uploadImage',
                formData,
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data && data.responseCode === 200) {
                if (
                    useCase === 'BRANCH_BANNER_IMAGE' ||
                    useCase === 'SCHOOL_BANNER_IMAGE'
                ) {
                    setBannerImg(data.results.url)
                    console.log('image', data.results.url)
                } else if (
                    useCase === 'BRANCH_PROFILE_IMAGE' ||
                    useCase === 'SCHOOL_PROFILE_PICTURE' ||
                    useCase === 'FRANCHISE_PROFILE_PICTURE'
                ) {
                    setProfileImg(data.results.url)
                    console.log('image', data.results.url)
                }
                message.success(`${data.responseMessage}`)
            } else {
                message.error(`${(info as any).file.name} file upload failed.`)
            }
        } catch (error: any) {
            console.error(
                `Error uploading ${useCase} image:`,
                error.response.data.responseMessage
            )
            message.error(`${(info as any).file.name} file upload failed.`)
        } finally {
            setLoading(false)
        }
    }

    const BannerImgUploadProps = {
        name: 'bannerImg',
        customRequest: (info: string) => uploadImage(info, useCaseOfBanner),
        showUploadList: false,
        accept: '.jpeg, .jpg, .webp, .png, tiff,.bmp',
    }

    const ProfileImgUploadProps = {
        name: 'profileImg',
        customRequest: (info: string) => uploadImage(info, useCaseOfProfile),
        showUploadList: false,
        accept: '.jpeg, .jpg, .webp, .png, tiff,.bmp',
    }

    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <OverlayImagesStyled>
                <div className="bg-white image_section">
                    <div className="bannerImg">
                        <img
                            src={
                                (bannerImg
                                    ? ipForImages + bannerImg
                                    : DefaultBannerImage) as string
                            }
                            // src={bannerImg ? ipForImages + profileImage : DefaultBannerImage}
                            // src={
                            //   bannerImg
                            //     ? "https://fistastore.com:444/" + profileImage
                            //     : DefaultBannerImage
                            // }
                            alt=""
                        />
                        {isEditable && (
                            <div className="changeBannerImgButton">
                                <Upload {...(BannerImgUploadProps as any)}>
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
                    <div className="profileImg">
                        <div className="img">
                            <img
                                src={
                                    (profileImg
                                        ? ipForImages + profileImg
                                        : DefaultProfileImage) as string
                                }
                                alt=""
                            />
                            {isEditable && (
                                <div className="changeProfileImgButton">
                                    <Upload {...(ProfileImgUploadProps as any)}>
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
                </div>
            </OverlayImagesStyled>
        </>
    )
}

export default OverlayImages
