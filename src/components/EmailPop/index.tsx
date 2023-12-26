import React, { useState } from 'react'
import { EmailTemplateContainer } from './style'
import ic_logo_pdf from '../../Assets/icons/ic_logo_pdf.svg'
import FormControl from '../FormControl'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Form, Modal } from 'antd'
import CustomButton from '../CustomButton/CustomButton'
import SuccessfullModal from '../Delete/SuccessfullModal'

const initialValues = {
    to: '',
    subject: '',
    message: '',
}

const validationSchema = Yup.object({
    to: Yup.string().email('Email should be valid').required('required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
})

const Index = ({ user, setemailReportPopup }: any) => {
    const [emailSuccessReportModal, setemailSuccessReportModal] =
        useState(false)

    const handleCancel = () => {
        setemailSuccessReportModal(false)
    }

    const onSubmit = (data1: any) => {
        const finalData = { ...data1, estimateId: user.id }
    }

    return (
        <EmailTemplateContainer>
            <img src={ic_logo_pdf} alt="ic_logo_pdf" />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    return (
                        <Form
                            style={{
                                height: '100%',
                            }}
                            name="basic"
                            onFinish={formik.handleSubmit}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <div className="main-container">
                                <div className="form-field">
                                    <FormControl
                                        control="input"
                                        type="text"
                                        name="to"
                                        placeholder="Email"
                                        className={
                                            formik.errors.to &&
                                            formik.touched.to
                                                ? 'is-invalid'
                                                : 'customInput'
                                        }
                                    />
                                </div>
                                <div className="form-field">
                                    <FormControl
                                        control="input"
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        className={
                                            formik.errors.subject &&
                                            formik.touched.subject
                                                ? 'is-invalid'
                                                : 'customInput'
                                        }
                                    />
                                </div>
                                <div className="form-field">
                                    <FormControl
                                        control="textarea"
                                        type="text"
                                        name="message"
                                        placeholder="Message"
                                        className={
                                            formik.errors.message &&
                                            formik.touched.message
                                                ? 'is-invalid'
                                                : 'customInput'
                                        }
                                    />
                                </div>
                                <div className="form-btn">
                                    <CustomButton
                                        bgcolor="#156985"
                                        color="white"
                                        padding="8px 8px"
                                        width="100%"
                                        type="submit"
                                        title="SUBMIT"
                                        margin="auto"
                                        fontSize="16px"
                                    />
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
            <Modal
                open={emailSuccessReportModal}
                footer={null}
                onCancel={handleCancel}
                centered={true}
            >
                <SuccessfullModal
                    handleCancel={handleCancel}
                    message="Successfully Send"
                    deleteUser={null}
                    toLocation="/client"
                />
            </Modal>
        </EmailTemplateContainer>
    )
}

export default Index
