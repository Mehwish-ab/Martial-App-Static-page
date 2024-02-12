import { Dispatch, SetStateAction } from 'react'
import Head from '../../../components/Head/Head'
import CustomModal from '../../../components/Modal/CustomModal'
import { ReportCreateStyle } from './ReportCreateStyle'
import { Formik } from 'formik'
import { Form } from 'antd'
import RightArrow from '../../../assets/icons/ic_rightArrow.svg'

interface ReportCreateProps {
    isReportCreateModalVisible: boolean
    setIsReportCreateModalVisible: Dispatch<SetStateAction<boolean>>
    setIsReportSubmitModalVisible: Dispatch<SetStateAction<boolean>>
}

const ReportCreate: React.FC<ReportCreateProps> = ({
    isReportCreateModalVisible,
    setIsReportCreateModalVisible,
    setIsReportSubmitModalVisible,
}) => {
    const ReportItems = [
        {
            Key: '1',
            Item: 'Nudity',
        },
        {
            Key: '2',
            Item: 'Violence',
        },
        {
            Key: '3',
            Item: 'Harassment',
        },
        {
            Key: '4',
            Item: 'Suicide or Self-Injury',
        },
        {
            Key: '5',
            Item: 'False Information',
        },
        {
            Key: '6',
            Item: 'Spam',
        },
        {
            Key: '7',
            Item: 'Unauthorized Sales',
        },
        {
            Key: '8',
            Item: 'Hate Speech',
        },
        {
            Key: '9',
            Item: 'Eating Disorder',
        },
        {
            Key: '10',
            Item: 'Involves a Child',
        },
        {
            Key: '11',
            Item: 'Terrorism',
        },
        {
            Key: '12',
            Item: 'Something Else',
        },
    ]

    const initialValues = (): void => {}
    const onsubmit = (): void => {}
    return (
        <>
            <Head title="Report Create" />
            <CustomModal
                isModalVisible={isReportCreateModalVisible}
                setIsModalVisible={setIsReportCreateModalVisible}
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
                                            Please select a problem
                                        </h4>
                                        <p className="description">
                                            If someone is in immediate danger,
                                            get help before reporting to
                                            Martial. Don&apos;t wait.
                                        </p>
                                    </div>
                                    <ul className="list-unstyled mt-10 reportList">
                                        {ReportItems.map((item) => (
                                            <li
                                                key={item.Key}
                                                onClick={() => {
                                                    setIsReportSubmitModalVisible(
                                                        true
                                                    )
                                                    setIsReportCreateModalVisible(
                                                        false
                                                    )
                                                }}
                                            >
                                                <p>{item.Item}</p>
                                                <img
                                                    src={RightArrow}
                                                    alt="RightArrow"
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </ReportCreateStyle>
                            </Form>
                        )
                    }}
                </Formik>
            </CustomModal>
        </>
    )
}
export default ReportCreate
