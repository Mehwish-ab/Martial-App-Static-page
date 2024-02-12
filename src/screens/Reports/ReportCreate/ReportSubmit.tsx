import { Dispatch, SetStateAction } from 'react'
import CustomModal from '../../../components/Modal/CustomModal'
import { Formik } from 'formik'
import { Form } from 'antd'
import { ReportCreateStyle } from './ReportCreateStyle'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark2,
} from '../../../components/GlobalStyle'
import FormControl from '../../../components/FormControl'
import CustomButton from '../../../components/CustomButton/CustomButton'

interface ReportSubmitProps {
    isReportSubmitModalVisible: boolean
    setIsReportSubmitModalVisible: Dispatch<SetStateAction<boolean>>
}

const ReportSubmit: React.FC<ReportSubmitProps> = ({
    isReportSubmitModalVisible,
    setIsReportSubmitModalVisible,
}) => {
    const initialValues = (): void => {}
    const onsubmit = (): void => {}
    return (
        <>
            <CustomModal
                isModalVisible={isReportSubmitModalVisible}
                setIsModalVisible={setIsReportSubmitModalVisible}
                showCloseBtn={true}
            >
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={onsubmit}
                >
                    {(formik) => {
                        console.log('for', formik.values)
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <ReportCreateStyle>
                                    <h3 className="title">Reports</h3>
                                    <div className="mt-10">
                                        <h4 className="sub-title">
                                            False Information
                                        </h4>
                                        <p className="description">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Inventore, animi. Dicta, voluptatum!
                                            Distinctio dignissimos, eos aut quis
                                            molestias eaque natus, similique sit
                                            recusandae id at vitae odio sed
                                            rerum consectetur?
                                        </p>
                                    </div>
                                    <div className="mt-20">
                                        <FormControl
                                            control="textarea"
                                            type="text"
                                            name="description"
                                            fontFamily={fontFamilyRegular}
                                            label="Tell Us More About"
                                            padding="10px"
                                            placeholder="Enter Here"
                                            height="100px"
                                        />
                                    </div>
                                    <div className="mt-20 loginBtn">
                                        <CustomButton
                                            bgcolor={lightBlue3}
                                            textTransform="Capitalize"
                                            color={pureDark2}
                                            padding="10.5px"
                                            fontFamily={fontFamilyMedium}
                                            width="100%"
                                            type="submit"
                                            title="Submit"
                                            fontSize="16px"
                                            loading={false}
                                        />
                                    </div>
                                </ReportCreateStyle>
                            </Form>
                        )
                    }}
                </Formik>
            </CustomModal>
        </>
    )
}

export default ReportSubmit
