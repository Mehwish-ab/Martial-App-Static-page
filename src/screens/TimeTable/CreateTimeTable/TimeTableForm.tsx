import React, { useEffect } from 'react'
import FormControl from '../../../components/FormControl'
// import { useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { BELTS_SELECT_OPTIONS } from '../../../screens/Home/constants'
import DateCalander from '../../../assets/images/dateCalander.svg'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark,
} from '../../../components/GlobalStyle'
import { FilterTimeTableStyled } from './styles'
// import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
// import { RootState } from '../../../redux/store'
import CustomButton from '../../../components/CustomButton/CustomButton'
import useTimetable from '../../../hooks/useTimetable'
import { Formik } from 'formik'
import { CreateTimeTableInitialValues } from '../constant'
import { Form } from 'antd'
import { useAppSelector } from '../../../app/hooks'
// import TimeTableSheet from './TimeTableSheet'
import { useNavigate } from 'react-router-dom'
// import { FormControl } from "react-bootstrap";

interface TimeTableFormProps {
    setNewTimetable: React.Dispatch<React.SetStateAction<any>>
}

const TimeTableForm: React.FC<TimeTableFormProps> = ({
    setNewTimetable,
}: any) => {
    const { data: loginData } = useAppSelector((state) => state.loginData)
    const navigate = useNavigate()
    // console.log('user id', loginData?.userDetails.id)

    useEffect(() => {
        // GetUserid()
    }, [])
    // const { loading } = useSelector((state: RootState) => state.timeTableData)
    const { handleCreateSubmit, Createmodal, loading, setIsShowModal } =
        useTimetable()
    const initialValues: CreateTimeTableInitialValues = {
        userId: 0,
        title: '',
        isRepeated: 'No',
        startDate: '',
        endDate: '',
    }
    // const [NewTTimetable, setNewttimetable] = useState<any>()

    const onSubmit = async (values: any): Promise<void> => {
        console.log('im handle submit button')
        const data = await handleCreateSubmit(
            values,
            Number(loginData?.userDetails.id)
        )
        console.log(data.timetableId, 'dataaa')
        const timeTableId = data?.timeTableId
        setNewTimetable(data)
        navigate(`/timetable/slots/${timeTableId}`)
    }
    return (
        <>
            {Createmodal().modalComponent}
            {/* {loading && <LoadingOverlay message="" />} */}
            <FilterTimeTableStyled>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => {
                        console.log('formik values', formik.values)

                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <h3 className="timetable-heading">
                                    Time Table
                                </h3>
                                <Row>
                                    <Col md="6">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="title"
                                            label="Title"
                                            padding="10px"
                                            fontFamily={fontFamilyMedium}
                                            fontSize="16px"
                                            max={6}
                                            placeholder="Enter Title Name"
                                        />
                                    </Col>

                                    <Col md="6">
                                        <FormControl
                                            control="select"
                                            type="text"
                                            name="isRepeated"
                                            fontFamily={fontFamilyRegular}
                                            label={'Repeat Time Table'}
                                            placeholder={'No'}
                                            className={
                                                formik.errors.isRepeated &&
                                                formik.touched.isRepeated
                                                    ? 'is-invalid'
                                                    : 'customInput'
                                            }
                                            options={BELTS_SELECT_OPTIONS}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <FormControl
                                            control="date"
                                            type="date"
                                            name="startDate"
                                            labelFamily={`${fontFamilyMedium}`}
                                            label="Start Date"
                                            fontSize="16px"
                                            suffixIcon={
                                                <img
                                                    src={DateCalander as string}
                                                    alt="calender-icon"
                                                />
                                            }
                                            max={6}
                                            placeholder="12-05-1989"
                                        />
                                    </Col>
                                    <Col md="6">
                                        <FormControl
                                            control="date"
                                            disabled={
                                                formik.values.isRepeated !== 1
                                            }
                                            type="date"
                                            name="endDate"
                                            labelFamily={`${fontFamilyMedium}`}
                                            label="End Date"
                                            fontSize="16px"
                                            suffixIcon={
                                                <img
                                                    src={DateCalander as string}
                                                    alt="calender-icon"
                                                />
                                            }
                                            max={6}
                                            placeholder="12-05-1989"
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
                                        title={'Submit'}
                                        fontSize="17px"
                                        // disabled={!formik.isValid}
                                        loading={loading}
                                        clicked={() => {
                                            setIsShowModal(true)
                                        }}
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
