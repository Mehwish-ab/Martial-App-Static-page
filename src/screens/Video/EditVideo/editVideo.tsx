import { CreateVideoStyles } from './styles'
import { Field, Formik } from 'formik'
import { Form, Space } from 'antd'
import FormControl from '../../../components/FormControl'
import { Col, Row } from 'react-bootstrap'
import CustomButton from '../../../components/CustomButton/CustomButton'
import JoditEditor from 'jodit-react'
import * as Yup from 'yup'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import Head from '../../../components/Head/Head'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import useVideo from '../../../hooks/useVideo'
import FileSubmit from '../../../assets/icons/ic_fileSubmit.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import ImagesUpload from '../../../components/ImagesUpload/ImagesUpload'
import Images from '../../Home/OverlayImages/images'
import { VideonitialValues } from '../constant'
import ReactPlayer from 'react-player'

const EditVideo = (): JSX.Element => {
    const { schoolId } = useParams()
    const { branchId } = useParams()
    const { franchiseId } = useParams()
    const { handleUpdate, Createmodal, WarningModal, getAllVideos, AllVideos } =
        useVideo()
    const [isYouTube, setIsYouTube] = useState(false)
    const [videoUrl, setVideoUrl] = useState('')
    const { id } = useParams()
    const isYouTubeUrl = (url: any): any => {
        const youtubeRegex =
            /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)/
        return youtubeRegex.test(url)
    }
    console.log('id', schoolId, branchId, franchiseId)
    const {
        statusData: { activities },
    } = useSelector((state: RootState) => state.appData.data)
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const status = [
        {
            label: 'Active',
            value: true,
        },
        {
            label: 'InActive',
            value: false,
        },
    ]

    useEffect(() => {
        setIsYouTube(isYouTubeUrl(videoUrl))
    }, [videoUrl])
    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            try {
                await getAllVideos()
            } catch (errors) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }

        fetchData()
    }, [])
    const validationSchema = Yup.object().shape({
        description: Yup.string(),
        title: Yup.string().required('Title is required'),
        videoURL: Yup.string().required('Video URL is required'),
        videoDuration: Yup.string().required('Video duration is required'),
        videoCategoryId: Yup.string().required('Video category is required'),
        thumbImageURL: Yup.string().required('Thumbnail image URL is required'),
        status: Yup.boolean().required('Status is required'),
    })
    const videoData = useMemo(() => {
        return AllVideos.find((v: any) => v.videoId === Number(id))
    }, [AllVideos])

    console.log('id', id, { videoData })

    // Usage in your component

    const handleVideoUrlChange = (value: string): void => {
        console.log('in handle change', value)

        // If it's not a YouTube URL, set the original URL
        setVideoUrl(value)
    }
    const [bannerImage, setBannerImage] = useState<FileList | null>(null)
    console.log({ videoUrl, isYouTube, isYouTubeUrl })

    const handleSaveBanner = (file: any): void => {
        console.log('image', file)
        setBannerImage(file)
    }
    const onSubmit = async (values: any): Promise<void> => {
        console.log('onSubmit Hanlder', { values }, bannerImage)

        await handleUpdate(values, id)
    }

    const editor = useRef(null)
    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typing...',
            height: '450px',
            width: '100%',
            showXPathInStatusbar: false,
            enableDragAndDropFileToEditor: true,
            style: {
                background: '#F5F5F5',

                fontFamily: 'EnnVisionsMedium',
            },
        }),
        []
    )

    const initialValues: VideonitialValues = {
        description: videoData?.description,
        title: videoData?.title,
        videoURL: videoData?.videoURL,
        videoDuration: videoData?.videoDuration,
        videoCategoryId: videoData?.videoCategoryId,
        thumbImageURL: videoData?.thumbImageURL,
        status: videoData?.status,
    }
    const showActivities = (activityId: any): any => {
        console.log('ujalaaa', { activityId })
        let activitiesName = ''
        const index = activities.findIndex(
            (act: any) => act.id === String(activityId)
        )
        if (index !== -1) {
            activitiesName =
                activitiesName === ''
                    ? (activities[index] as any)[selectedLanguage]
                    : `${activitiesName}, ${
                          (activities[index] as any)[selectedLanguage]
                      }`
        }
        if (activitiesName !== '') return activitiesName
        return '--'
    }
    console.log({ initialValues })
    return (
        <>
            <Head title="Create Video" />
            {WarningModal().modalComponent}
            {Createmodal().modalComponent}

            <CreateVideoStyles>
                <div>
                    <div className="d-flex">
                        <div className="container1 ">
                            <Formik
                                initialValues={initialValues}
                                enableReinitialize={true}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {(formik) => {
                                    console.log('formik', formik.values)
                                    return (
                                        <Form
                                            name="basic"
                                            onFinish={formik.handleSubmit}
                                            autoComplete="off"
                                        >
                                            <div className="mainWrapper">
                                                <h3 className="table-heading mx-4">
                                                    Edit Video
                                                </h3>

                                                <div className="bg-white form mt-20">
                                                    <Row>
                                                        <Col
                                                            md="12"
                                                            className="mt-20"
                                                        >
                                                            <FormControl
                                                                control="input"
                                                                type="text"
                                                                name="title"
                                                                label="Title"
                                                                fontSize="16px"
                                                                max={6}
                                                                placeholder="Enter title"
                                                                className={
                                                                    formik
                                                                        .errors
                                                                        .title &&
                                                                    formik
                                                                        .touched
                                                                        .title
                                                                        ? 'is-invalid'
                                                                        : 'customInput'
                                                                }
                                                            />
                                                        </Col>
                                                        <Col
                                                            md="12"
                                                            className="mt-20"
                                                        >
                                                            <FormControl
                                                                control="input"
                                                                type="text"
                                                                name="videoURL"
                                                                label="Video URL"
                                                                fontSize="16px"
                                                                max={6}
                                                                placeholder="https://www.youtube.com/embed/lvBHGGK_WcQ"
                                                                onChange={handleVideoUrlChange(
                                                                    formik
                                                                        .values
                                                                        .videoURL
                                                                )}
                                                            />
                                                        </Col>
                                                        <Col
                                                            md="6"
                                                            className="mt-20"
                                                        >
                                                            <FormControl
                                                                control="input"
                                                                type="text"
                                                                name="videoDuration"
                                                                label="Video Duration"
                                                                fontSize="16px"
                                                                max={6}
                                                                placeholder="Duration"
                                                                className={
                                                                    formik
                                                                        .errors
                                                                        .videoDuration &&
                                                                    formik
                                                                        .touched
                                                                        .videoDuration
                                                                        ? 'is-invalid'
                                                                        : 'customInput'
                                                                }
                                                            />
                                                        </Col>
                                                        <Col
                                                            md="6"
                                                            className="mt-20"
                                                        >
                                                            <FormControl
                                                                control="select"
                                                                type="text"
                                                                name="videoCategoryId"
                                                                label="Video Category"
                                                                fontSize="16px"
                                                                max={6}
                                                                placeholder={showActivities(
                                                                    formik
                                                                        .values
                                                                        .videoCategoryId
                                                                )}
                                                                // options={
                                                                //     activities
                                                                // }
                                                                className={
                                                                    formik
                                                                        .errors
                                                                        .videoCategoryId &&
                                                                    formik
                                                                        .touched
                                                                        .videoCategoryId
                                                                        ? 'is-invalid'
                                                                        : 'customInput'
                                                                }
                                                            >
                                                                {' '}
                                                                {activities.map(
                                                                    (
                                                                        act: any,
                                                                        index: any
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                act.id
                                                                            }
                                                                            value={
                                                                                act.id
                                                                            }
                                                                        >
                                                                            {
                                                                                act[
                                                                                    selectedLanguage
                                                                                ]
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </FormControl>
                                                        </Col>

                                                        {/* <Col
                                                            md="6"
                                                            className="mt-20"
                                                        >
                                                            <p className="bannerTitle ">
                                                                Image
                                                            </p>
                                                            <Images
                                                                onSaveBanner={
                                                                    handleSaveBanner
                                                                }
                                                                isEditable={
                                                                    true
                                                                } // Set isEditable to true or false based on your requirement
                                                                defaultImage={
                                                                    null
                                                                }
                                                            />
                                                        </Col> */}
                                                        <Col
                                                            md="4"
                                                            className="certificate mt-20"
                                                        >
                                                            <FormControl
                                                                control="file"
                                                                type="file"
                                                                name="thumbImageURL"
                                                                fontFamily={
                                                                    fontFamilyRegular
                                                                }
                                                                label="Image"
                                                                src={FileSubmit}
                                                                suffix={
                                                                    <ImagesUpload
                                                                        onImagesSelect={
                                                                            handleSaveBanner
                                                                        }
                                                                    />
                                                                }
                                                                padding="10px"
                                                                placeholder="upload Image"
                                                            />
                                                        </Col>
                                                        <Col
                                                            md="6"
                                                            className="mt-20"
                                                        >
                                                            <FormControl
                                                                control="select"
                                                                type="text"
                                                                name="status"
                                                                label="Status"
                                                                fontSize="16px"
                                                                max={10}
                                                                options={status}
                                                                placeholder="Select Status"
                                                                className={
                                                                    formik
                                                                        .errors
                                                                        .status &&
                                                                    formik
                                                                        .touched
                                                                        .status
                                                                        ? 'is-invalid'
                                                                        : 'customInput'
                                                                }
                                                            />
                                                        </Col>
                                                        <Col
                                                            md="12"
                                                            className="mt-20 "
                                                        >
                                                            <p
                                                                style={{
                                                                    fontSize:
                                                                        '16px',
                                                                    fontFamily:
                                                                        'EnnVisions',
                                                                }}
                                                            >
                                                                Description
                                                            </p>
                                                            <div
                                                                style={{
                                                                    backgroundColor:
                                                                        '#F5F5F5',
                                                                }}
                                                            >
                                                                <Field
                                                                    name="description"
                                                                    style={{
                                                                        height: '500px',
                                                                    }}
                                                                >
                                                                    {({
                                                                        field,
                                                                    }: any) => (
                                                                        <JoditEditor
                                                                            ref={
                                                                                editor
                                                                            }
                                                                            value={
                                                                                formik
                                                                                    .values
                                                                                    .description
                                                                            }
                                                                            config={
                                                                                config
                                                                            }
                                                                            // tabIndex of textarea
                                                                            //referred to use only this option to update the content for performance reasons
                                                                            onChange={(
                                                                                editorState
                                                                            ) => {
                                                                                // Set the field value when editor state changes
                                                                                formik.setFieldValue(
                                                                                    'description',
                                                                                    editorState
                                                                                )
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            <div className="mt-20 d-flex justify-content-end">
                                                <CustomButton
                                                    bgcolor={lightBlue3}
                                                    textTransform="Captilize"
                                                    color={maastrichtBlue}
                                                    padding="11px 40.50px"
                                                    fontFamily={`${fontFamilyMedium}`}
                                                    width="fit-content"
                                                    type="submit"
                                                    title="Submit"
                                                    fontSize="18px"
                                                    loading={false}
                                                />
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                        <div className="container2 mt-10 mx-4">
                            <div className="video-container ">
                                <ReactPlayer
                                    width="100%"
                                    height="50%"
                                    url={videoUrl}
                                />
                                {/* {isYouTube ? (
                                    <iframe
                                        width="100%"
                                        height="50%"
                                        src={youtubeEmbedUrl}
                                        title="YouTube Video"
                                        frameBorder="10"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <iframe
                                        width="100%"
                                        height="50%"
                                        src={youtubeEmbedUrl}
                                        title="Video"
                                        frameBorder="10"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </CreateVideoStyles>
        </>
    )
}

export default EditVideo
