import React, { useEffect, useState } from 'react'
import { Form } from 'antd'
import { Formik, FormikValues } from 'formik'
import { useSelector } from 'react-redux'
import { CreateTimeTableInitialValues } from '../constant'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { RootState } from '../../../redux/store'
import InformationTimeTableSheet from './InformationTimeTableSheet'
import InformationTimeTableForm from './InformationTimeTableForm'
import useTimetable from '../../../hooks/useTimetable'
import { useParams } from 'react-router-dom'

const InformationTimeTable: React.FC = () => {
    const { loading } = useSelector((state: RootState) => state.timeTableData)
    const { timeTableId } = useParams()
    const [allTimeTableDetail, setAllTimeTableDetail] = useState<any>()

    const { getTimetableById } = useTimetable()
    useEffect(() => {
        async function fetchTimeTableById(): Promise<void> {
            const response = await getTimetableById(Number(timeTableId))
            console.log('checking response: ', response)
            if (response.results) {
                setAllTimeTableDetail(response.results)
            }
        }
        fetchTimeTableById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeTableId])

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
                            <InformationTimeTableForm
                                allTimeTableDetail={allTimeTableDetail}
                            />
                            <InformationTimeTableSheet
                                allTimeTableDetails={allTimeTableDetail}
                            />
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default InformationTimeTable
