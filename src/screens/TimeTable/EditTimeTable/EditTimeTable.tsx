import React from 'react'
import { Form } from 'antd'
import { Formik, FormikValues } from 'formik'
import { useSelector } from 'react-redux'
import { CreateTimeTableInitialValues } from '../constant'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { RootState } from '../../../redux/store'
import EditTimeTableForm from './EditTimeTableForm'
import EditTimeTableSheet from './EditTimeTableSheet'

const EditTimeTable: React.FC = () => {
    const { loading } = useSelector((state: RootState) => state.timeTableData)

    const initialValues: CreateTimeTableInitialValues = {
        userId: 0,
        title: '',
        isRepeated: '',
        startDate: '',
        endDate: '',
    }
    return (
        <>
            {loading && <LoadingOverlay message="" />}
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
                            <EditTimeTableForm />
                            <EditTimeTableSheet />
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default EditTimeTable
