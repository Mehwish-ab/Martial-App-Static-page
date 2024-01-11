import { Card } from 'antd'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { ViewInstructorStyled } from './styles'
import { useLocation } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import { useState, useEffect } from 'react'
import FormControl from '../../../components/FormControl'
import useInstructor from '../../../hooks/useInstructor'
import { InstructorDataType } from '../../../redux/features/instructor/instructorSlice'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import useScreenTranslation from '../../../hooks/useScreenTranslation'

const ViewInstructor = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('instructorInformation')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
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

            <h3 className="ms-4">{getLabelByKey('title')}</h3>
            <Card>
                <Row>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                {getLabelByKey('instructorName')}
                            </div>
                            <div className="list-item-value">
                                {values?.instructorName}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            {/* <div className="list-item-title">{getLabelByKey('emailAddress')}</div> */}
                            <div className="list-item-title">Email Address</div>
                            <div className="list-item-value">
                                {values?.emailAddress}
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                {getLabelByKey('instructorMobileNumber')}
                            </div>
                            <div className="list-item-value">
                                {values?.phoneNumber}
                            </div>
                        </div>
                    </Col>

                    <Col md="4">
                        <div className="list-item">
                            <div className="list-item-title">
                                {getLabelByKey('address')}
                            </div>
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
                                        {getLabelByKey('yearsOfExperience')}
                                    </div>
                                    <div className="list-item-value">
                                        {values?.experience}
                                    </div>
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="list-item">
                                    <div className="list-item-title">
                                        {getLabelByKey('ranking')}
                                    </div>
                                    <div className="list-item-value">
                                        {Number(values?.rankId) === 1
                                            ? 'Yes'
                                            : 'No'}
                                    </div>
                                </div>
                            </Col>
                            <Col md="4">
                                <div className="list-item">
                                    <div className="list-item-title">
                                        {/* {getLabelByKey('latestCertification')} */}
                                        Latest Certification
                                    </div>
                                    <div className="list-item-value ">
                                        <span
                                            className="certificateLink"
                                            onClick={() =>
                                                openModal(
                                                    values?.certificationURL
                                                )
                                            }
                                        >
                                            {values?.certificationURL
                                                ? 'Certificate'
                                                : '--'}
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="6">
                        <div className="list-item">
                            <div className="list-item-title">
                                {getLabelByKey('specialisations')}
                            </div>
                            <div className="list-item-value">
                                {showFacilities(facilitiesToShow)}
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="list-item">
                            <div className="list-item-title">
                                {/* {getLabelByKey('activities')} */}
                                Activities
                            </div>
                            <div className="list-item-value">
                                {showActivities(activitiesToShow)}
                            </div>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className="list-item mb-0">
                            <div className="list-item-title">
                                {getLabelByKey('description')}
                            </div>
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
                                    id="termsAndConditions"
                                    name="termsAndConditions"
                                    checked
                                />
                                <p
                                    className="checkBoxPara"
                                    id="termsAndConditions"
                                >
                                    {getLegalLabelByKey('termsAndConditions')}
                                </p>
                            </form>
                        </label>
                        <label htmlFor="agreement">
                            <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                <FormControl
                                    control="checkbox"
                                    type="checkbox"
                                    id="AgreementGuidelines"
                                    name="AgreementGuidelines"
                                    checked
                                />
                                <p
                                    className="checkBoxPara"
                                    id="AgreementGuidelines"
                                >
                                    {getLegalLabelByKey('AgreementGuidelines')}
                                </p>
                            </form>
                        </label>
                        <label htmlFor="liability">
                            <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                <FormControl
                                    control="checkbox"
                                    type="checkbox"
                                    id="liabilityWaivers"
                                    name="liabilityWaivers"
                                    checked
                                />
                                <p
                                    className="checkBoxPara"
                                    id="liabilityWaivers"
                                >
                                    {getLegalLabelByKey('liabilityWaivers')}
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
