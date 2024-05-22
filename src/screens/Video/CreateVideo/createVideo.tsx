import { CreateVideoStyles } from './styles'
import { Field, Formik } from 'formik'
import { Form, Space } from 'antd'
import { VideonitialValues } from '../constant'
import FormControl from '../../../components/FormControl'
import { Col, Row } from 'react-bootstrap'
import CustomButton from '../../../components/CustomButton/CustomButton'
import ReactPlayer from 'react-player'
import {
    BackgroundImage,
    fontFamilyMedium,
    fontFamilyRegular,
    greenishColor,
    lightBlue3,
    lightGrey,
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
import * as Yup from 'yup'
import JoditEditor from 'jodit-react'

const initialValues: VideonitialValues = {
    description: '',
    title: '',
    videoURL: '',
    videoDuration: '',
    videoCategoryId: '',
    thumbImageURL: '',
    status: false,
}
const CreateRoom = (): JSX.Element => {
    const { schoolId } = useParams()
    const { branchId } = useParams()
    const { franchiseId } = useParams()
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

    const { handleCreateSubmit, Createmodal, WarningModal } = useVideo()
    const [isYouTube, setIsYouTube] = useState(false)
    const [videoUrl, setVideoUrl] = useState('')

    const isYouTubeUrl = (url: any): any => {
        const youtubeRegex =
            /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)/
        return youtubeRegex.test(url)
    }
    const validationSchema = Yup.object().shape({
        description: Yup.string(),
        title: Yup.string().required('Title is required'),
        videoURL: Yup.string().required('Video URL is required'),
        videoDuration: Yup.string().required('Video duration is required'),
        videoCategoryId: Yup.string().required('Video category is required'),
        thumbImageURL: Yup.string().required('Thumbnail image URL is required'),
        status: Yup.boolean().required('Status is required'),
    })

    useEffect(() => {
        setIsYouTube(isYouTubeUrl(videoUrl))
    }, [videoUrl])

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

    console.log('bannerIMage', bannerImage)
    const onSubmit = async (values: any): Promise<void> => {
        console.log({ values }, bannerImage)
        await handleCreateSubmit(values, bannerImage)
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
    const editorStyle = {
        minHeight: '800px', // Adjust the height as needed
    }
    const getYouTubeEmbedUrl = (url: any): any => {
        // Extract video ID from URL
        const videoId = url.match(
            /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        )

        if (videoId && videoId[1]) {
            // Construct embed URL
            return `https://www.youtube.com/embed/${videoId[1]}`
        } else {
            return url
        }
    }

    // Usage in your component
    const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl)
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
                                                    Create Video
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
                                                                placeholder="Video Category"
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
                                    <>
                                        <iframe
                                            width="100%"
                                            height="50%"
                                            src={youtubeEmbedUrl}
                                            title="Video"
                                            frameBorder="10"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        ></iframe>
                                    </>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </CreateVideoStyles>
        </>
    )
}

export default CreateRoom
