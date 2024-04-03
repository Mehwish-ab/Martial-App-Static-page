import { Form, Input } from 'antd'
import { Formik } from 'formik'
import { Row, Col } from 'react-bootstrap'
import FormControl from '../../../components/FormControl'
import { ActivityInitialValues } from '../constant'
import { ActivityStyle } from '../styles'
import ImagesUpload from '../../../components/ImagesUpload/ImagesUpload'
import * as Yup from 'yup'
import { FC, SetStateAction, useEffect, useState } from 'react'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import FileSubmit from '../../../assets/icons/ic_fileSubmit.svg'
import CustomButton from '../../../components/CustomButton/CustomButton'
import Head from '../../../components/Head/Head'
import CustomMessageModal from '../../../components/Modal/CustomMessageModal'
import { useNavigate, useParams } from 'react-router-dom'
import useActivityUpdate from '../../../hooks/useActivity'
import {
    OwnerDataTypes,
    SchoolDataType,
} from '../../../redux/features/dashboard/dashboardDataSlice'
import store, { RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import { SelectOptionsDataTypes } from '../../Home/constants'
import useSchool from '../../../hooks/useCreateSchool'
import { useAppSelector } from '../../../app/hooks'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import useActivity from '../../../hooks/useActivity'
import { getActivityBySchoolId } from '../../../redux/features/activity/activitySlice'

const CreateActivity = (): JSX.Element => {
    const { schoolId } = useParams()
    const [isShowModal, setIsShowModal] = useState(false)

    const initialValues: ActivityInitialValues = {
        activityId: '',
        selectedActivities: '',
        selectBelt: null!,
        experience: null!,
        latestCertification: '',
        startDate: new Date(),
        endDate: new Date(),
    }

    const { getLabelByKey } = useScreenTranslation('createActivity')
    const navigate = useNavigate()
    const { getSchoolbyId } = useSchool()
    const [selectedFiles, setSelectedFiless] = useState<File | null>(null)
    const { handleCreateSubmit, Createmodal } = useActivity()
    const onSubmit = async (values: ActivityInitialValues): Promise<void> => {
        // Perform your form submission logic here

        console.log('data', 'values', values)
        const formattedValues = {
            ...values,
            latestCertification: selectedFiles,
        }
        //  console.log('values', formattedValues, selectedFiles)
        const file = values.latestCertification
            ? values.latestCertification
            : ' '
        await handleCreateSubmit(formattedValues, file, schoolId)
        // After successful form submission, show the modal
        setIsShowModal(true)
        //setIsActivityModalVisible(true)
        setTimeout(() => {
            setIsShowModal(false)
        }, 2000)

        // await editSchool(Number(loginData?.userDetails.id), values)
    }
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
    })

    const handleImagesUpload = (selectedFiless: any): void => {
        setSelectedFiless(selectedFiless)
    }
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
    const { activityData } = useSelector(
        (state: RootState) => state.activityData
    )
    console.log('activity data from redux', activityData)
    const [schoolData, setschoolData] = useState<SchoolDataType>()
    const [OwnerData, setOwnerData] = useState<OwnerDataTypes>()
    useEffect(() => {
        store.dispatch(getActivityBySchoolId(schoolId as string))
    }, [schoolId])
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response: any = await getSchoolbyId(Number(schoolId))
                setschoolData(response)
                setOwnerData(response.ownerData)

                console.log('response of school ', response)

                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
                // setError('Error fetching data')
            } finally {
                // setLoading(false)
            }
        }

        fetchData()
    }, [])

    const selectedActivities = schoolData
        ? schoolData?.activities?.split(',').map(String)
        : []

    const [beltId, setBeltId] = useState()
    const [experiencelevel, setExperienceLevel] = useState()

    useEffect(() => {
        if (selectedActivities.length > 0) {
            const checkAllActivitites = selectedActivities?.every((act) => {
                const exp = activityData.find(
                    (activity) => activity.activityId === +act
                )
                console.log({ exp })
                return !!(exp && (exp.experienceLevelId || exp.beltId))
            })
            checkAllActivitites && navigate(`/school/view/${schoolId}`)
        }
    }, [schoolId, selectedActivities])

    const showExperience = (activityId: string): SelectOptionsDataTypes[] => {
        const actIndex = activities.findIndex(
            (act: any) => act.id === activityId
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

    const showBelts = (activityId: any): SelectOptionsDataTypes[] => {
        console.log('Belts Id', activityId)

        const actIndex = activities.findIndex(
            (act: any) => act.id === activityId
        )
        const actData = activities[actIndex]
        const beltIds =
            typeof actData?.beltIds === 'string' ? actData.beltIds : ''
        const activitiesArr = beltIds.split(',').map(Number)
        console.log('belts ', beltIds, activitiesArr)
        let experienceItem = ''

        const options = activitiesArr?.reduce(
            (accumulator: any, activity: any) => {
                const index = Belts.findIndex((act) => +act.id === activity)
                console.log('belts  index', index, Belts)
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

        console.log({ options })
        return options
    }

    const showActivities = (activityId: any): any => {
        let activitiesName = ''
        const index = activities.findIndex((act: any) => act.id === activityId)
        const activity = activities[index]

        console.log('activity id', activity)
        setExperienceLevel(activity?.experienceLevelIds as any)
        setBeltId(activity?.beltIds as any)

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

    console.log('activityData.data', activityData, selectedActivities)

    const handleSubmitButton = (activityId: string): boolean => {
        const exp = activityData.find((act) => act.activityId === +activityId)
        console.log('exp', exp)
        return !!(exp && (exp.experienceLevelId || exp.beltId))
    }
    const getIntialValues = (activityId: string): ActivityInitialValues => {
        const exp = activityData.find((act) => act.activityId === +activityId)

        return {
            ...initialValues,
            ...(exp && {
                selectBelt: exp.beltId,
                experience: exp.experienceLevelId,
            }),
        }
    }

    return (
        <>
            {Createmodal().modalComponent}
            <Head title="Activity" />
            <ActivityStyle>
                <div className="mainWrapper">
                    <h3 className="tableTitle">{getLabelByKey('title')}</h3>
                </div>
            </ActivityStyle>
            {selectedActivities?.map((act) => {
                const exp = activityData.find(
                    (activity) => activity.activityId === +act
                )
                if (!!(exp && (exp.experienceLevelId || exp.beltId))) return
                return (
                    <ActivityStyle key={act}>
                        <Formik
                            initialValues={getIntialValues(act)}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                // Add 'activityName' to the submitted values using 'act'
                                const submittedValues = {
                                    ...values,
                                    activityId: act,
                                }
                                onSubmit(submittedValues) // Call the onSubmit function with the modified values
                            }}
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
                                                <Col className="mt-20">
                                                    <FormControl
                                                        type="text"
                                                        onChange={() => {}}
                                                        control="input"
                                                        className={
                                                            fontFamilyRegular
                                                        }
                                                        name="activityId"
                                                        label={getLabelByKey(
                                                            'activityName'
                                                        )}
                                                        padding="8px 10px"
                                                        placeholder={showActivities(
                                                            act
                                                        )}
                                                        disabled // Disable the input
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
                                                {!!showBelts(act).length && (
                                                    <Col className="mt-20">
                                                        <FormControl
                                                            control="select"
                                                            type="text"
                                                            name="selectBelt"
                                                            label={getLabelByKey(
                                                                'belts'
                                                            )}
                                                            fontSize="16px"
                                                            max={6}
                                                            placeholder="Select belt"
                                                            value={
                                                                formik.values
                                                                    .selectBelt
                                                            }
                                                            className={
                                                                formik.errors
                                                                    .selectBelt &&
                                                                formik.touched
                                                                    .selectBelt
                                                                    ? 'is-invalid'
                                                                    : 'customInput'
                                                            }
                                                            options={showBelts(
                                                                act
                                                            )}
                                                        />
                                                    </Col>
                                                )}
                                                {!!showExperience(act)
                                                    .length && (
                                                    <Col className="mt-20">
                                                        <FormControl
                                                            control="select"
                                                            type="text"
                                                            name="experience"
                                                            label="Experience Level"
                                                            value={
                                                                formik.values
                                                                    .experience
                                                            }
                                                            fontSize="16px"
                                                            max={6}
                                                            placeholder="Select Experience"
                                                            className={
                                                                formik.errors
                                                                    .experience &&
                                                                formik.touched
                                                                    .experience
                                                                    ? 'is-invalid'
                                                                    : 'customInput'
                                                            }
                                                            options={showExperience(
                                                                act
                                                            )}
                                                        />
                                                    </Col>
                                                )}
                                                <Col
                                                    md="3"
                                                    className="certificate mt-20"
                                                >
                                                    <FormControl
                                                        control="file"
                                                        type="file"
                                                        name="latestCertification"
                                                        fontFamily={
                                                            fontFamilyRegular
                                                        }
                                                        label={
                                                            <>
                                                                {getLabelByKey(
                                                                    'latestCertifications'
                                                                )}
                                                                <span className="ml-2">
                                                                    (optional)
                                                                </span>
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
                                                <Col md="2" className="mt-5 ">
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
                                                        disabled={handleSubmitButton(
                                                            act
                                                        )}
                                                        loading={false}
                                                        clicked={() => {
                                                            onsubmit
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </ActivityStyle>
                )
            })}
        </>
    )
}

export default CreateActivity
