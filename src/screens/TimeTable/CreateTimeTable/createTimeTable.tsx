import React from 'react'
// import { Form } from 'antd'
// import { Formik, FormikValues } from 'formik'
import { useSelector } from 'react-redux'
// import { CreateTimeTableInitialValues } from '../constant'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { RootState } from '../../../redux/store'
//  import TimeTableForm from './TimeTableForm'
// import TimeTableSheet from './TimeTableSheet'

const CreateTimeTable: React.FC = () => {
    const { loading } = useSelector((state: RootState) => state.timeTableData)
    // const [NewTimetable, setNewtimetable] = useState<any>()
    // const initialValues: CreateTimeTableInitialValues = {
    //     userId: 0,
    //     title: '',
    //     isRepeated: '',
    //     startDate: '',
    //     endDate: '',
    // }
    return (
        <>
            {loading && <LoadingOverlay message="" />}

            {/* <TimeTableForm setNewTimetable={setNewtimetable} />
            <TimeTableSheet setNewTimetable={NewTimetable} /> */}
        </>
    )
}

export default CreateTimeTable
