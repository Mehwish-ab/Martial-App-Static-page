import React from 'react'
import { Form } from 'antd'
import { Formik, FormikValues } from 'formik'
import { useSelector } from 'react-redux'
import { CreateTimeTableInitialValues } from '../constant'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { RootState } from '../../../redux/store'
import InformationTimeTableSheet from './InformationTimeTableSheet'
import InformationTimeTableForm from './InformationTimeTableForm'

const InformationTimeTable: React.FC = () => {
    // const { loading } = useSelector((state: RootState) => state.timeTableData)

    const initialValues: CreateTimeTableInitialValues = {
        userId: 0,
        title: '',
        isRepeated: '',
        startDate: '',
        endDate: '',
        activities: [],
        roomId: [],
        instructorId: [],
        status: false,
    }
    return (
        <>
            {/* {loading && <LoadingOverlay message="" />} */}
            <Formik
                initialValues={initialValues as FormikValues}
                onSubmit={() => {}}
            >
                {(formik) => {
                    return (
                        <Form
                            name="basic"
                            onFinish={formik.handleSubmit}
                            autoComplete="off"
                        >
                            <InformationTimeTableForm />
                            <InformationTimeTableSheet />
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default InformationTimeTable
