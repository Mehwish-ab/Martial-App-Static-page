import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { authorizationToken } from '../utils/api_urls'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { loginDataTypes } from '../redux/features/types'
import { CreateInstructorInitialValues } from '../../src/screens/Instructor/constant'
import EnnvisionModal from '../components/CustomModals/EnnvisionModal'
import CustomModal from '../components/Modal/CustomModal'
interface IUseInstructor {
    loading: boolean
    handleSubmit: (
        values: CreateInstructorInitialValues,
        file: any
    ) => Promise<void>
    deleteInstructor: (instructorId: number) => Promise<void>
    deletemodal: () => {
        modalComponent: JSX.Element
    }
    getInstructorbyid: (instructorId: number) => Promise<any>
    updateInstructor: () => Promise<void>
    errorMessage: string
}

const useInstructor = (): IUseInstructor => {
    const [loading, setLoading] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    // const [data, setData] = useState<unknown>({})
    const [errorMessage, setError] = useState('')
    const toastId = useRef<any>(null)

    const navigate = useNavigate()
    const { loginData } = useSelector((state: RootState) => state)
    //   const { data: logindata } = useAppSelector((state) => state.loginData);

    // const { schoolData } = useSelector(
    //     (state: RootState) => state.dashboardData
    // )
    // const dispatch = useDispatch()

    const handleSubmit = async (
        values: CreateInstructorInitialValues,
        file: any
    ): Promise<void> => {
        console.log('values from form:', values, file)
        const Payload = {
            instructorName: values.instructorName,
            emailAddress: values.emailAddress,
            phoneNumber: values.instructorPhoneNumber,
            address: values?.address || '',
            experience: values.yearsOfExperience,
            rankId: values.rankId,
            specializations: values.specializations.join(','),
            activities: values.activities.join(','),
            description: values.description,
        }
        const datas = JSON.stringify(Payload)
        try {
            setError('')
            setLoading(true)

            const formData = new FormData()
            formData.append(
                'data',
                new Blob([datas], { type: 'application/json' })
            )
            formData.append('file', file)

            console.log('Nada', formData)

            const { data } = await axios.post('/instructor/create', formData, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                    // ...axios.defaults.headers.post,
                    'Content-Type': 'application/json',
                },
            })

            if (data.responseCode === '500') {
                toast(data.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return
            }

            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/instructor/list')
            }, 3000)

            console.log({ data })
        } catch (error2: any) {
            console.error('Error:', error2.response.data.error)
            setLoading(false)
            setError(error2.message || 'An error occurred')
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(error2.message || 'An error occurred', {
                type: 'error',
                autoClose: 1000,
            })
        }
    }
    const deleteInstructor = async (instructorId: number): Promise<void> => {
        console.log('<<instructor id to delete', instructorId)
        const url = '/instructor/delete'
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                url,
                { instructorId },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (data.responseCode === '500') {
                toast(data.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return
            }
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/instructor/list')
            }, 3000)
            // setData('results: ' + data.results)
            console.log('data', { data })
            setLoading(false)
        } catch (error2: any) {
            console.log('api error', error2)
            setError(error2.response.data.responseMessage)
            setLoading(false)
            console.log(
                error2.response.data.responseMessage,
                'error in api data'
            )
        }
    }

    const getInstructorbyid = async (instructorId: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                '/instructor/getDetailsById',
                { instructorId },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data.responseCode === '500') {
                setLoading(false)
                return
            }
            console.log('Instructor info', data.results)
            setLoading(false)
            return data.results
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }
    const updateInstructor = async (): Promise<void> => {}

    const deletemodal = (): {
        modalComponent: JSX.Element
    } => {
        return {
            modalComponent: (
                <CustomModal
                    isModalVisible={isShowModal}
                    setIsModalVisible={setIsShowModal}
                    showCloseBtn={true}
                >
                    {' '}
                    <EnnvisionModal
                        doTask={() => {
                            // navigate("/school/view");
                            setIsShowModal(false)
                        }}
                        title="Successfully Account Instructor"
                        description="The Instructor class has been successfully removed, and please note that any associated data will be retained for a period of 30 days before it is permanently deleted from our system."
                    />
                </CustomModal>
            ),
        }
    }
    return {
        loading,
        handleSubmit,
        deleteInstructor,
        deletemodal,
        getInstructorbyid,
        updateInstructor,
        errorMessage,
    }
}

export default useInstructor
