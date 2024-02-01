import { Form } from 'antd'
import { Formik } from 'formik'
import { Row, Col } from 'react-bootstrap'
import FormControl from '../../components/FormControl'
import { ActivityInitialValues } from './constant'
import { ActivityStyle } from './styles'
import ImagesUpload from '../../components/ImagesUpload/ImagesUpload'
import { SetStateAction, useState } from 'react'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    maastrichtBlue,
} from '../../components/GlobalStyle'
import FileSubmit from '../../assets/icons/ic_fileSubmit.svg'
import CustomButton from '../../components/CustomButton/CustomButton'
import Head from '../../components/Head/Head'
import CustomMessageModal from '../../components/Modal/CustomMessageModal'

const Activity = (): JSX.Element => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const initialValues: ActivityInitialValues = {
        selectBelt: '',
        latestCertification: '',
    }
    const handleCreateSubmit = (): void => {
        // Perform your form submission logic here

        // After successful form submission, show the modal
        setIsModalVisible(true)
    }

    const [selectedFiles, setSelectedFiless] = useState<FileList | null>(null)

    const handleImagesUpload = (selectedFiless: any): void => {
        setSelectedFiless(selectedFiless)
    }
    return (
        <>
            <CustomMessageModal
                title={'Hello'}
                description={'Description'}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                imageProp={''}
            />
            <Head title="Activity" />
            <ActivityStyle>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleCreateSubmit}
                >
                    {(formik) => {
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="bg-white form">
                                    <Row>
                                        <Col md="4" className="mt-4">
                                            <div className="list-item">
                                                <div className="list-item-title">
                                                    Activity
                                                </div>
                                                <div className="list-item-value">
                                                    {'--'}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="businessName"
                                                label="Belts"
                                                fontSize="16px"
                                                max={6}
                                                placeholder="Select belts"
                                                className={
                                                    formik.errors.selectBelt &&
                                                    formik.touched.selectBelt
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
                                        <Col
                                            md="4"
                                            className="certificate mt-20"
                                        >
                                            <FormControl
                                                control="file"
                                                type="file"
                                                name="latestCertification"
                                                fontFamily={fontFamilyRegular}
                                                label={
                                                    <>
                                                        latestCertification{' '}
                                                        <span>optional</span>
                                                    </>
                                                }
                                                src={FileSubmit}
                                                suffix={
                                                    <ImagesUpload
                                                        onImagesSelect={
                                                            handleImagesUpload
                                                        }
                                                    />
                                                }
                                                padding="10px"
                                                placeholder="Upload Certificate"
                                            />
                                        </Col>
                                    </Row>
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
                                        clicked={handleCreateSubmit}
                                    />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </ActivityStyle>
        </>
    )
}

export default Activity
