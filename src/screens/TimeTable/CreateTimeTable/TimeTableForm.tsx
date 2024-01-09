import React, { useEffect } from 'react'
import FormControl from '../../../components/FormControl'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { Col, Row } from 'react-bootstrap'
import { BELTS_SELECT_OPTIONS } from '../../../screens/Home/constants'
import DateCalander from '../../../assets/images/dateCalander.svg'
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
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

interface TimeTableFormProps {
    setNewTimetable: React.Dispatch<React.SetStateAction<any>>
}
const TimeTableForm: React.FC<TimeTableFormProps> = ({
    setNewTimetable,
}: any) => {
    const { getLabelByKey } = useScreenTranslation('createTImeTable')

    const { data: loginData } = useAppSelector((state) => state.loginData)

    const navigate = useNavigate()

    useEffect(() => {}, [])
    const { handleCreateSubmit, Createmodal, loading, setIsShowModal } =
        useTimetable()

    const initialValues: CreateTimeTableInitialValues = {
        userId: 0,
        title: '',
        isRepeated: 0,
        startDate: '',
        endDate: '',
    }

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
            }),
    })

    const onSubmit = async (values: any): Promise<void> => {
        if (values.isRepeated === '2') {
            values.endDate = null
        }
        const backendFormattedDate = moment(
            moment(values.endDate, 'DD-MM-YYYY')
        ).format('YYYY-MM-DD')
        const backendFormattedstartDate = moment(
            values.startDate,
            'DD-MM-YYYY'
        ).format('YYYY-MM-DD')
        const data = await handleCreateSubmit(
            {
                ...values,
                startDate: backendFormattedstartDate,
                endDate: backendFormattedDate,
            },
            Number(loginData?.userDetails.id)
        )

        console.log(data.timetableId, 'dataaa')
        const timeTableId = data?.timeTableId
        setNewTimetable(data)
        setIsShowModal(true)
        navigate(`/timetable/slots/${timeTableId}`)
    }

    return (
        <>
            {Createmodal().modalComponent}
            <FilterTimeTableStyled>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => {
                        return (
                            <Form
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
                                            labelFamily={`${fontFamilyMedium}`}
                                            fontFamily={fontFamilyRegular}
                                            fontSize="16px"
                                            max={6}
                                            placeholder={getLabelByKey(
                                                'titlePlaceholder'
                                            )}
                                        />
                                    </Col>
                                    <Col md="6" className="mt-20">
                                        <FormControl
                                            control="select"
                                            type="text"
                                            name="isRepeated"
                                            fontFamily={fontFamilyRegular}
                                            label={getLabelByKey(
                                                'repeatTimeTable'
                                            )}
                                            placeholder={getLabelByKey(
                                                'repeatTimeTable'
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
                                    <Col md="6" className="mt-20">
                                        <FormControl
                                            control="date"
                                            type="date"
                                            name="startDate"
                                            labelFamily={fontFamilyMedium}
                                            fontFamily={fontFamilyRegular}
                                            label={getLabelByKey('startDate')}
                                            fontSize="16px"
                                            suffixIcon={
                                                <img
                                                    src={DateCalander as string}
                                                    alt="calender-icon"
                                                />
                                            }
                                            max={6}
                                        />
                                    </Col>
                                    <Col md="6" className="mt-20">
                                        <FormControl
                                            control="date"
                                            disabled={
                                                formik.values.isRepeated !== 1
                                            }
                                            type="date"
                                            name="endDate"
                                            labelFamily={fontFamilyMedium}
                                            fontFamily={fontFamilyRegular}
                                            label="End Date"
                                            fontSize="16px"
                                            suffixIcon={
                                                <img
                                                    src={DateCalander as string}
                                                    alt="calender-icon"
                                                />
                                            }
                                            max={6}
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
                                        title="Add Time Table Slide"
                                        fontSize="17px"
                                        loading={loading}
                                    />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </FilterTimeTableStyled>
        </>
    )
}

export default TimeTableForm
