import { Card } from 'antd'
import OverlayImages from '../../Home/OverlayImages/OverlayImages'
import { ViewInstructorStyled } from './styles'
import { useLocation } from 'react-router-dom'
// import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { Col, Row } from 'react-bootstrap'
import { Field, Formik } from 'formik'
import { useState, useEffect } from 'react'
import FormControl from '../../../components/FormControl'
import useInstructor from '../../../hooks/useInstructor'
import { InstructorDataType } from '../../../redux/features/instructor/instructorSlice'

const ViewInstructor = () => {
    // const { getLabelByKey } = useScreenTranslation("branchCreate");
    const [initialValues, setInitialValues] = useState({
        termCondition: false,
        agreement: false,
        liability: false,
    })
    const { getInstructorbyid } = useInstructor()
    const [values, setValues] = useState<InstructorDataType | undefined>(
        undefined
    )
    const location = useLocation()
    const instructor: InstructorDataType = location.state?.branch
    console.log(instructor, 'Nadaaaaaa')

    useEffect(() => {
        getInstructor()
        async function getInstructor() {
            if (instructor) {
                const data = await getInstructorbyid(instructor.instructorId)
                setValues(data as InstructorDataType)
            }
        }
    }, [])
    console.log('getInstructor', values)

    // TODO: this state will be set after getting response from api
    // setInitialValues({
    //   termCondition: false, agreement: false, liability: false
    // });
    // return () => {
    //   setInitialValues({
    //     termCondition: false, agreement: false, liability: false
    //   });
    // };

    return (
        <ViewInstructorStyled>
            <OverlayImages
                overlayImg={instructor?.instructorImage || ''}
                backgroundImg={instructor?.instructorImage || ''}
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
                                {values?.instructorEmailAddress
                                    ? values.instructorEmailAddress
                                    : '--'}
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
                                    <div className="list-item-value">
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
                                {values?.specializations
                                    ? values.specializations
                                    : '--'}
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="list-item">
                            <div className="list-item-title">
                                Activities (to Instruct Within)
                            </div>
                            <div className="list-item-value">
                                {values ? values.activities : '--'}
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
                                    Agreement to follow the app's guidelines and
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
