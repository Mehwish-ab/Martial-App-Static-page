import { Card } from 'antd'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { ViewInstructorStyled } from './styles'
import { useLocation } from 'react-router-dom'
// import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { Col, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import { useState, useEffect } from 'react'
import FormControl from '../../../components/FormControl'
import useInstructor from '../../../hooks/useInstructor'
import { InstructorDataType } from '../../../redux/features/instructor/instructorSlice'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'

const ViewInstructor = (): JSX.Element => {
    // const { getLabelByKey } = useScreenTranslation("branchCreate");
    const [initialValues] = useState({
        termCondition: false,
        agreement: false,
        liability: false,
    })
    const { getInstructorbyid, setIsShowModal, ImageModal, setImageURL } =
        useInstructor()
    const [values, setValues] = useState<InstructorDataType | undefined>(
        undefined
    )
    const location = useLocation()
    const { selectedLanguage } = useSelector(
        (state: RootState) => state?.selectedLanguage
    )
    const instructor: InstructorDataType = location.state?.branch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getInstructor = async (): Promise<void> => {
        if (instructor) {
            const data = await getInstructorbyid(instructor.instructorId)
            setValues(data as InstructorDataType)
        }
    }
    useEffect(() => {
        getInstructor()
    }, [])

    const { activities } = useSelector(
        (state: RootState) => state.appData.data.statusData
    )
    const { facilities } = useSelector(
        (state: RootState) => state.appData.data.statusData
    )

    console.log('getInstructor', values?.emailAddress, instructor.emailAddress)
    const openModal = (certificationURL: string | undefined): void => {
        setImageURL(certificationURL || '')
        setIsShowModal(true)
        console.log('inside the modal')
    }
    const showActivities = (_activities: string): string => {
        const activitiesArr = _activities.split(',')

        let activitiesName = ''
        activitiesArr.map((activity) => {
            const index = activities.findIndex((act) => act.id === activity)
            if (index !== -1) {
                activitiesName =
                    activitiesName === ''
                        ? (activities[index] as any)[selectedLanguage]
                        : `${activitiesName}, ${
                              (activities[index] as any)[selectedLanguage]
                          }`
            }
        })
        if (activitiesName !== '') return activitiesName
        return '--'
    }
    const activitiesToShow = values?.activities || ''
    const facilitiesToShow = values?.specializations || ''
    const showFacilities = (_Facilities: string): string => {
        const activitiesArr = _Facilities.split(',')

        let activitiesName = ''
        activitiesArr.map((facility) => {
            const index = facilities.findIndex(
                (acts: any) => acts.id === facility
            )
            if (index !== -1) {
                activitiesName =
                    activitiesName === ''
                        ? (facilities[index] as any)[selectedLanguage]
                        : `${activitiesName},${
                              (facilities[index] as any)[selectedLanguage]
                          }`
            }
        })

        if (activitiesName !== '') return activitiesName
        return '--'
    }

    // TODO: this state will be set after getting response from api
    // setInitialValues({
    //   termCondition: false, agreement: false, liability: false
    // });
    // return () => {
    //   setInitialValues({
    //     termCondition: false, agreement: false, liability: false
    //   });
    // }

    return (
        <ViewInstructorStyled>
            {ImageModal().modalComponent}
            <OverlayImages
                overlayImg={values?.profilePicture || ''}
                backgroundImg={values?.bannerPicture || ''}
                isEditable={true}
            />

            <h3 className="ms-4">Instructor Information</h3>
            <Card>
                <Row>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                Instructor Name
                            </div>
                            <div className="list-item-value">
                                {values?.instructorName}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Email Address</div>
                            <div className="list-item-value">
                                {values?.emailAddress}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                Instructor Mobile Number
                            </div>
                            <div className="list-item-value">
                                {values?.phoneNumber}
                            </div>
                        </div>
                    </Col>

                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">Address</div>
                            <div className="list-item-value">
                                {values?.address}
                            </div>
                        </div>
                    </Col>
                    <Col md="8">
                        <Row>
                            <Col md="4">
                                <div className="list-item">
                                    <div className="list-item-title">
                                        Years of experience
                                    </div>
                                    <div className="list-item-value">
                                        {values?.experience}
                                    </div>
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="list-item">
                                    <div className="list-item-title">
                                        Ranking
                                    </div>
                                    <div className="list-item-value">
                                        {/* {values ? values.rankId : "--"} */}
                                        {Number(values?.rankId) === 1
                                            ? 'Yes'
                                            : 'No'}
                                    </div>
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="list-item">
                                    <div className="list-item-title">
                                        Latest Certification (Optional)
                                    </div>
                                    <div
                                        className="list-item-value "
                                        style={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            openModal(values?.certificationURL)
                                        }
                                    >
                                        {values?.certificationURL
                                            ? values.certificationURL
                                            : '--'}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="6">
                        <div className="list-item">
                            <div className="list-item-title">
                                Specializations
                            </div>
                            <div className="list-item-value">
                                {showFacilities(facilitiesToShow)}
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="list-item">
                            <div className="list-item-title">
                                Activities (to Instruct Within)
                            </div>
                            <div className="list-item-value">
                                {showActivities(activitiesToShow)}
                            </div>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className="list-item mb-0">
                            <div className="list-item-title">Description</div>
                            <div className="list-item-value">
                                {values ? values.description : '--'}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Formik
                    initialValues={initialValues}
                    onSubmit={() => {
                        console.log('')
                    }}
                >
                    <div className="d-flex flex-column">
                        <label htmlFor="termCondition">
                            <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                <FormControl
                                    control="checkbox"
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked
                                />
                                <p className="checkBoxPara" id="termCondition">
                                    Terms and conditions
                                </p>
                            </form>
                        </label>
                        <label htmlFor="agreement">
                            <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                <FormControl
                                    control="checkbox"
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked
                                />
                                <p className="checkBoxPara" id="agreement">
                                    Agreement to follow the apps guidelines and
                                    policies
                                </p>
                            </form>
                        </label>
                        <label htmlFor="liability">
                            <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                <FormControl
                                    control="checkbox"
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                    checked
                                />
                                <p className="checkBoxPara" id="liability">
                                    Liability waivers
                                </p>
                            </form>
                        </label>
                    </div>
                </Formik>
            </Card>
        </ViewInstructorStyled>
    )
}

export default ViewInstructor
