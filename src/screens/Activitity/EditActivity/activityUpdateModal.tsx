import { ActivityInitialValues } from '../constant'
import { ActivityStyle } from '../styles'
import ImagesUpload from '../../../components/ImagesUpload/ImagesUpload'
import FileSubmit from '../../../assets/icons/ic_fileSubmit.svg'
import CustomModal from '../../../components/Modal/CustomModal'
import { ErrorMessage, Formik } from 'formik'
import { Card, Form } from 'antd'
import { Col, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { RootState } from '../../../redux/store'
import useSchool from '../../../hooks/useCreateSchool'
import { useParams } from 'react-router-dom'
import { SelectOptionsDataTypes } from '../../Home/constants'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import FormControl from '../../../components/FormControl'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import Head from '../../../components/Head/Head'
import { useEffect, useState } from 'react'
import { SchoolDataType } from '../../../redux/features/dashboard/dashboardDataSlice'
import { Input } from 'formik-antd'

interface IModalComponent {
    modalComponent: JSX.Element
}
interface Props {
    closeModal: () => void
    activityData: any // Define the type for activityData
    handleUpdate: () => void
}

const Activity = ({
    closeModal,
    activityData,
    handleUpdate,
}: any): JSX.Element => {
    const [isActivityModalVisible, setIsActivityModalVisible] = useState(false)
    const { schoolId } = useParams()
    const [school, setSchool] = useState<SchoolDataType | undefined>(undefined)
    const [isShowModal, setIsShowModal] = useState(false)
    const [selectedFiles, setSelectedFiless] = useState<File | null>(null)
    const { getSchoolbyId } = useSchool()
    const initialValuesForEdit: ActivityInitialValues = {
        activityId: activityData ? activityData.activityId : '',
        selectBelt: activityData ? activityData.beltId : null!,
        latestCertification: activityData ? activityData.certificateURL : '',
        experience: activityData ? activityData.experienceLevelId : null!,
        startDate: activityData ? activityData.startDate : '',
        endDate: activityData ? activityData.endDate : '',
        selectedActivities: activityData ? activityData.activityId : '',
    }

    const { getLabelByKey } = useScreenTranslation('createActivity')
    const {
        dropdowns: { currency, language, businessTypes },
    } = useSelector((state: RootState) => state.appData.data)
    const [schoolData, setschoolData] = useState<SchoolDataType>()
    const { activities, experienceLevel } = useSelector(
        (state: RootState) => state.appData.data.statusData
    )
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const { adult, kids } = useSelector(
        (state: RootState) => state.appData.data.belts
    )

    const Adults = adult.map((a) => {
        const data = { ...a, isAdult: true }
        return data
    })
    const Kids = kids.map((k) => ({ ...k, isKid: true }))

    const Belts = [...Adults, ...Kids]
    console.log('schoolID', schoolData)
    const showExperience = (activityId: number): SelectOptionsDataTypes[] => {
        const actIndex = activities.findIndex(
            (act: any) => +act.id === activityId
        )
        const actData = activities[actIndex]
        const activitiesArr = actData?.experienceLevelIds.split(',').map(Number)
        let experienceItem = ''

        const options = activitiesArr?.reduce((accumulator, activity) => {
            const index = experienceLevel.findIndex(
                (act) => +act.id === activity
            )

            if (index !== -1) {
                // return options
                experienceItem = (experienceLevel[index] as any)[
                    selectedLanguage
                ]
                return [
                    ...accumulator,
                    {
                        value: (experienceLevel[index] as any)['id'],
                        label: experienceItem,
                    },
                ]
            }
            return [...accumulator]
        }, [] as any)
        return options
    }

    const showBelt = (activityId: any): SelectOptionsDataTypes[] => {
        const actIndex = activities.findIndex(
            (act: any) => +act.id === activityId
        )
        const actData = activities[actIndex]
        const beltIds =
            typeof actData?.beltIds === 'string' ? actData.beltIds : ''
        const activitiesArr = beltIds.split(',').map(Number)
        let experienceItem = ''

        const options = activitiesArr?.reduce(
            (accumulator: any, activity: any) => {
                const index = Belts.findIndex((act) => +act.id === activity)

                if (index !== -1) {
                    // return options
                    experienceItem = (Belts[index] as any)[selectedLanguage]
                    return [
                        ...accumulator,
                        {
                            value: (Belts[index] as any)['id'],
                            label: experienceItem,
                        },
                    ]
                }
                return [...accumulator]
            },
            [] as any
        )
        return options
    }

    console.log('activityyyyy data', activityData)
    const onSubmit = async (values: ActivityInitialValues): Promise<void> => {
        // Perform your form submission logic here

        console.log('valuessss', values)
        // const start = moment(values.startDate, 'dddd, MMM DD, YYYY').format(
        //     'YYYY-MM-DD'
        // )
        // const end = moment(values.endDate, 'dddd, MMM DD, YYYY').format(
        //     'YYYY-MM-DD'
        // )
        const BannerImage = values.latestCertification
            ? values.latestCertification
            : initialValuesForEdit.latestCertification
        const data = {
            ...values,
            schoolId: activityData.schoolId,
            latestCertification: BannerImage,
        }
        console.log('edit data', data, BannerImage)
        handleUpdate(
            Number(activityData.id),
            {
                ...data,
            },
            BannerImage
        )
        console.log('submit values', values)

        // After successful form submission, show the modal
        setIsShowModal(true)
        // setIsActivityModalVisible(true)
        setTimeout(() => {
            setIsShowModal(false)
            setIsActivityModalVisible(false)
            closeModal()
        }, 1000)
        //  await editSchool(Number(loginData?.userDetails.id), values)
    }
    useEffect(() => {
        const Fetchdata = async (): Promise<any> => {
            const data = await getSchoolbyId(Number(activityData?.schoolId))
            setSchool(data)
        }
        Fetchdata()
        console.log('i am in activity modal', activityData)
        setIsActivityModalVisible(true)
    }, [])

    const validationSchema = Yup.object({
        // experience: Yup.string().required('Choose Experience level'),

        latestCertification: Yup.mixed()
            .required('File is required')
            .test('fileSize', 'File size is too large', (value) => {
                return value && value.size <= 10485760 // 10MB
            })
            .test('fileType', 'Unsupported file type', (value) => {
                return (
                    value &&
                    ['image/jpeg', 'image/png', 'application/pdf'].includes(
                        value.type
                    )
                )
            }),

        // beltId: Yup.string().required('Please Select Belt'),

        // selectedActivities: Yup.string().required(
        //     'Select at least one activity'
        // ),
    })
    const handleImagesUpload = (selectedFiless: any): void => {
        setSelectedFiless(selectedFiless)
    }

    const createOptions = (
        list: DataTypesWithIdAndMultipleLangLabel[]
    ): SelectOptionsDataTypes[] => {
        const options: SelectOptionsDataTypes[] = []
        list.forEach((item) => {
            const obj = {
                label: (item as any)[selectedLanguage],
                value: item.id,
            }

            options.push(obj)
        })

        return options
    }

    const showActivities = (activityId: any): any => {
        console.log(activityId)
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

    return (
        <>
            <CustomModal
                isModalVisible={isActivityModalVisible}
                setIsModalVisible={setIsActivityModalVisible}
                onCancel={closeModal}
            >
                <Head title="Activity" />
                <ActivityStyle>
                    <Formik
                        initialValues={initialValuesForEdit}
                        validationSchema={validationSchema}
                        // validateOnMount
                        enableReinitialize
                        onSubmit={(values) => onSubmit(values)}
                    >
                        {(formik) => {
                            return (
                                <Form
                                    name="basic"
                                    onFinish={formik.handleSubmit}
                                    autoComplete="off"
                                >
                                    <div className="mainWrapper">
                                        <h3
                                            className="table-title"
                                            // style={{
                                            //     textAlign: 'center',
                                            // }}
                                        >
                                            Update Activity
                                            {/* {getLabelByKey('title')} */}
                                        </h3>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        <p>
                                            Please fill in the required
                                            information to update your
                                            information & Enjoy with Martial
                                        </p>
                                    </div>
                                    <div className="bg-white form">
                                        <Col className="mt-4">
                                            <div
                                                style={{
                                                    position: 'relative',
                                                    zIndex: 999,
                                                }}
                                            >
                                                <Col className="mt-20">
                                                    <p
                                                        style={{
                                                            fontWeight: '300',
                                                            fontFamily:
                                                                fontFamilyMedium,
                                                        }}
                                                    >
                                                        Activity Name
                                                    </p>
                                                    <Input
                                                        type="text"
                                                        name="selectedActivities"
                                                        value={showActivities(
                                                            formik.values
                                                                .selectedActivities
                                                        )}
                                                        // placeholder={showActivities(
                                                        //     formik.values
                                                        //         .selectedActivities
                                                        // )}

                                                        style={{
                                                            pointerEvents:
                                                                'none',
                                                            backgroundColor:
                                                                'white',
                                                            border: 'none', // Remove other borders
                                                            borderBottom:
                                                                '1px solid black', // Show only the bottom border
                                                        }}
                                                    />
                                                </Col>
                                            </div>
                                        </Col>
                                        <Col className="mt-20">
                                            {!!showBelt(activityData.activityId)
                                                .length && (
                                                <FormControl
                                                    control="select"
                                                    type="text"
                                                    name="selectBelt"
                                                    label={getLabelByKey(
                                                        'belts'
                                                    )}
                                                    fontSize="16px"
                                                    max={6}
                                                    value={
                                                        formik.values.selectBelt
                                                    }
                                                    className={
                                                        formik.errors
                                                            .selectBelt &&
                                                        formik.touched
                                                            .selectBelt
                                                            ? 'is-invalid'
                                                            : 'customInput'
                                                    }
                                                    options={showBelt(
                                                        activityData.activityId
                                                    )}
                                                />
                                            )}
                                        </Col>
                                        <Col className="mt-20">
                                            {!!showExperience(
                                                activityData?.activityId
                                            ).length && (
                                                <FormControl
                                                    control="select"
                                                    type="text"
                                                    name="experience"
                                                    label="Experience Level"
                                                    fontSize="16px"
                                                    max={6}
                                                    value={
                                                        formik.values.experience
                                                    }
                                                    className={
                                                        formik.errors
                                                            .experience &&
                                                        formik.touched
                                                            .experience
                                                            ? 'is-invalid'
                                                            : 'customInput'
                                                    }
                                                    options={showExperience(
                                                        activityData.activityId
                                                    )}
                                                />
                                            )}
                                        </Col>
                                        {/* <Col className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="startDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'startDate'
                                                )}
                                                padding="8px 10px"
                                                placeholder={
                                                    activityData?.startDate
                                                }
                                            />
                                        </Col>
                                        <Col>
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="endDate"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey('endDate')}
                                                padding="8px 10px"
                                                placeholder={
                                                    activityData?.endDate
                                                }
                                            />
                                        </Col> */}
                                        <Col className="certificate mt-20">
                                            <FormControl
                                                control="file"
                                                type="file"
                                                name="latestCertification"
                                                fontFamily={fontFamilyRegular}
                                                label={
                                                    <>
                                                        {getLabelByKey(
                                                            'latestCertification'
                                                        )}{' '}
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
                                                placeholder={
                                                    formik.values
                                                        .latestCertification
                                                }
                                                className={
                                                    formik.errors
                                                        .latestCertification &&
                                                    formik.touched
                                                        .latestCertification
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
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
                                            clicked={() => {
                                                onsubmit
                                            }}
                                        />
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </ActivityStyle>
            </CustomModal>
        </>
    )
}

export default Activity
