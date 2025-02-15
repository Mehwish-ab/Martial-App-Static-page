import React, { useEffect } from 'react'
import FormControl from '../../../components/FormControl'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { Col, Row } from 'react-bootstrap'
import { BELTS_SELECT_OPTIONS } from '../../../screens/Home/constants'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark,
} from '../../../components/GlobalStyle'
import moment from 'moment'
import { FilterTimeTableStyled } from './styles'
import CustomButton from '../../../components/CustomButton/CustomButton'
import useTimetable from '../../../hooks/useTimetable'
import { Formik } from 'formik'
import { CreateTimeTableInitialValues } from '../constant'
import { Form } from 'antd'
import { useAppSelector } from '../../../app/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import Head from '../../../components/Head/Head'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import useRoom from '../../../hooks/useRoom'
import { getInstructorByUserId } from '../../../redux/features/instructor/instructorSlice'
import useClass from '../../../hooks/useClass'

interface TimeTableFormProps {
    setNewTimetable: React.Dispatch<React.SetStateAction<any>>
}
const TimeTableForm: React.FC<TimeTableFormProps> = ({
    setNewTimetable,
}: any) => {
    const { getLabelByKey } = useScreenTranslation('createTImeTable')

    const { data: loginData } = useAppSelector((state) => state.loginData)
    const { classId } = useParams()
    const navigate = useNavigate()
    const { instructorData } = useSelector(
        (state: RootState) => state.instructorData
    )
    const { getClassbyid, classData } = useClass()
    useEffect(() => {
        getClassbyid(Number(classId))
    }, [classId])
    const {
        handleCreateSubmit,
        SuccessModal,
        WarningModal,
        loading,
        setIsShowModal,
    } = useTimetable()

    const initialValues: CreateTimeTableInitialValues = {
        userId: 0,
        title: '',
        isRepeated: 0,
        startDate: '',
        endDate: '',
        activities: [],
        roomId: [],
        instructorId: [],
        status: false,
    }
    const status = [
        { lable: 'Active', value: 'true' },
        // { lable: 'inActive', value: 'false' },
    ]
    const capacity = [
        { lable: '200', value: '200' },
        { lable: '100', value: '100' },
        { lable: '20', value: '20' },
        { lable: '30', value: '30' },
        { lable: '250', value: '250' },
        // { lable: 'inActive', value: 'false' },
    ]
    const { getallRoombyUC, room } = useRoom()
    const validationSchema = Yup.object({
        title: Yup.string().required('Please Enter Valid Name'),
        isRepeated: Yup.string()
            .oneOf(['1', '2'], 'Please select repeated or not')
            .required('Please select repeated or not'),
        startDate: Yup.string().required('Please select Start Time'),
        endDate: Yup.string()
            .typeError('You must specify a number')
            .when('isRepeated', {
                is: '1',
                then: Yup.string().required('Please select End Time'),
                otherwise: Yup.string().notRequired(),
            })
            .test(
                'is-greater-than-start-date',
                'End date must be greater than or equal to start date.',
                function (value) {
                    const { startDate } = this.parent // Accessing parent context

                    if (!startDate || !value) {
                        return true // Skip validation if either date is missing
                    }

                    // Compare dates using moment
                    return (
                        moment(value).isAfter(startDate) ||
                        moment(value).isSame(startDate)
                    )
                }
            ),
    })

    const onSubmit = async (values: any): Promise<void> => {
        if (values.isRepeated === '2') {
            values.endDate = null
        }
        const backendFormattedDate = moment(
            moment(values.endDate, 'dddd, MMM DD, YYYY')
        ).format('YYYY-MM-DD')
        const backendFormattedstartDate = moment(
            values.startDate,
            'dddd, MMM DD, YYYY'
        ).format('YYYY-MM-DD')
        console.log('values of timetable', values)
        const data = await handleCreateSubmit(
            {
                ...values,
                startDate: backendFormattedstartDate,
                endDate: backendFormattedDate,
            },
            Number(loginData?.userDetails.id),
            Number(classId)
        )

        // console.log(data.timetableId, 'dataaa')
        // const timeTableId = data?.timeTableId
        // setNewTimetable(data)
        // setIsShowModal(true)
        // navigate(`/timetable/slotss/${timeTableId}`)
    }
    const {
        statusData: { activities, facilities },
        dropdowns: { currency, language, businessTypes },
    } = useSelector((state: RootState) => state.appData.data)

    // Convert the act object into a Set for efficient lookup
    // Convert the act string into an array of activity IDs by splitting it at the comma
    const actArray = classData?.activities.split(',')

    // Filter the list array to include only items whose ID is present in the actArray
    // const filteredList = activities.filter((item) =>
    //     actArray?.includes(item.id)
    // )

    // Now you can use the filteredList array, which contains only items with IDs that match the act array

    // Now you can use the filteredList array, which contains only items with IDs that match the act object

    //console.log(filteredList, 'filterdlist')
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            store.dispatch(getInstructorByUserId())
            try {
                if (loginData?.schoolId) {
                    await getallRoombyUC(Number(loginData?.schoolId), 'SCHOOL')
                }
                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }

        fetchData()
    }, [])

    const showActivities = (_activities: string[]): string => {
        console.log({ _activities })
        let activitiesName = ''
        _activities.forEach((activity) => {
            const index = activities.findIndex((act) => act.id === activity)
            if (index !== -1) {
                const activityLabel = (activities[index] as any)[
                    selectedLanguage
                ]
                activitiesName =
                    activitiesName === ''
                        ? activityLabel
                        : `${activitiesName}, ${activityLabel}`
            }
        })
        if (activitiesName.length > 35) {
            return `${activitiesName.slice(0, 35)}...`
        }
        return activitiesName || getLabelByKey('activity')
    }
    console.log('activitiessss', activities, classData)
    return (
        <>
            <Head title="TimeTable Form" />
            {SuccessModal().modalComponent}
            {WarningModal().modalComponent}
            <FilterTimeTableStyled>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => {
                        console.log('formik values', formik.values)
                        return (
                            <>
                                <Form
                                    className="formPageMainContainer"
                                    name="basic"
                                    onFinish={formik.handleSubmit}
                                    autoComplete="off"
                                >
                                    <h3 className="timetable-heading">
                                        {getLabelByKey('titleScreen')}
                                    </h3>
                                    <Row>
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="title"
                                                label={getLabelByKey('title')}
                                                padding="10px"
                                                labelFamily={`${fontFamilyRegular}`}
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                max={6}
                                                placeholder={getLabelByKey(
                                                    'titlePlaceholder'
                                                )}
                                            />
                                        </Col>

                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                type="date"
                                                name="startDate"
                                                labelFamily={fontFamilyRegular}
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'startDate'
                                                )}
                                                fontSize="16px"
                                                placeholder={getLabelByKey(
                                                    'startDatePlaceholder'
                                                )}
                                                startDate={classData?.startDate}
                                                endDate={classData?.endDate}
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="date"
                                                disabled={
                                                    formik.values.isRepeated !==
                                                    1
                                                }
                                                type="date"
                                                name="endDate"
                                                labelFamily={fontFamilyRegular}
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey('endDate')}
                                                startDate={classData?.startDate}
                                                endDate={classData?.endDate}
                                                fontSize="16px"
                                                placeholder={getLabelByKey(
                                                    'endDatePlaceholder'
                                                )}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <CheckboxesSelect
                                                name="activities"
                                                label={getLabelByKey(
                                                    'activites'
                                                )}
                                                list={activities.filter(
                                                    (item) =>
                                                        actArray?.includes(
                                                            item.id
                                                        )
                                                )}
                                                showErrorMsgInList={false}
                                                placeholder={showActivities(
                                                    formik.values.activities
                                                )}
                                            />
                                        </Col>
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="roomId"
                                                label={getLabelByKey('room')}
                                                padding="8px 10px"
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                max={6}
                                                placeholder={getLabelByKey(
                                                    'roomPlaceHolder'
                                                )}
                                                selectionMode="multiple"
                                            >
                                                {classData?.roomResponseDTOList.map(
                                                    (Room: any) => (
                                                        <option
                                                            key={Room.roomId}
                                                            value={Room.roomId}
                                                        >
                                                            {Room.roomName}
                                                        </option>
                                                    )
                                                )}
                                            </FormControl>
                                        </Col>
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="instructorId"
                                                label={getLabelByKey(
                                                    'instructors'
                                                )}
                                                padding="8px 10px"
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                oi={6}
                                                placeholder={getLabelByKey(
                                                    'InstructorsPlaceholder'
                                                )}
                                                selectionMode="multiple"
                                            >
                                                {classData?.instructorsResponseDTOList.map(
                                                    (instructor: any) => (
                                                        <option
                                                            key={
                                                                instructor.instructorId
                                                            }
                                                            value={
                                                                instructor.instructorId
                                                            }
                                                        >
                                                            {
                                                                instructor.instructorName
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </FormControl>
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="isRepeated"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'repeatTimeTable'
                                                )}
                                                placeholder={getLabelByKey(
                                                    'repeatTimeTablePlaceholder'
                                                )}
                                                className={
                                                    formik.errors.isRepeated &&
                                                    formik.touched.isRepeated
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                                options={BELTS_SELECT_OPTIONS}
                                            />
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="status"
                                                label={getLabelByKey('status')}
                                                padding="8px 10px"
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                            >
                                                {status.map((s) => (
                                                    <option
                                                        key={s.lable}
                                                        value={s.value}
                                                    >
                                                        {s.lable}
                                                    </option>
                                                ))}
                                            </FormControl>
                                        </Col>
                                        <Col md="3" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="Capacity"
                                                label={getLabelByKey(
                                                    'capacity'
                                                )}
                                                padding="8px 10px"
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                placeholder="Select Capacity"
                                                options={capacity}
                                            />
                                        </Col>
                                    </Row>
                                    <div className="mt-20 d-flex justify-content-end">
                                        <CustomButton
                                            bgcolor={lightBlue3}
                                            textTransform="Captilize"
                                            color={pureDark}
                                            padding="11px 40.50px"
                                            fontFamily={`${fontFamilyMedium}`}
                                            width="fit-content"
                                            type="submit"
                                            title={getLabelByKey(
                                                'addTimeTableSlide'
                                            )}
                                            fontSize="17px"
                                            loading={loading}
                                        />
                                    </div>
                                </Form>
                            </>
                        )
                    }}
                </Formik>
            </FilterTimeTableStyled>
        </>
    )
}

export default TimeTableForm
