import { useNavigate } from 'react-router-dom'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import CustomButton from '../../components/CustomButton/CustomButton'
import { ListStudentStyling } from './styles'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    pureDark,
    tertiaryBlue2,
} from '../../components/GlobalStyle'
import plusIcon from '../../assets/icons/ic_plus.svg'
import dummyData from './dummyData.json'
import StatusActiveError from '../../assets/images/activeBtnError.svg'
import RightArrow from '../../assets/images/rightArrow.svg'
import LeftArrow from '../../assets/images/leftArrow.svg'
import DefaultImage from '../../assets/images/defaultProfileImage.svg'
import defaultPic from '../../assets/images/create_school_user_profile.svg'
import { Form, Formik } from 'formik'
import FormControl from '../../components/FormControl'
import { SchoolDataType } from '../../redux/features/dashboard/dashboardDataSlice'
import { CustomDiv } from '../CreateSchool/ListSchool/CustomDiv'
import Head from '../../components/Head/Head'
import useUser from '../../hooks/useUser'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../redux/store'
import { useEffect, useState } from 'react'
import {
    UserDataType,
    UserDataTypess,
    getAllUsers,
    setUserListId,
} from '../../redux/features/User/UserSlice'
import defaltimg from '../../assets/images/create_school_user_profile.svg'
import { updateUser } from '../../redux/features/admin/user/updateUserStatusSlice'
import useCreateSchool from '../../hooks/useCreateSchool'
import { RegisterUser } from '../pages'
import { Console } from 'console'
import CustomModal from '../../components/Modal/CustomModal'
import InviteUser from './InviteUser/inviteUser'

const UserList = (): JSX.Element => {
    const { getAllUser, getAllUserPagination } = useUser()
    const [AllUSer, setAllUSer] = useState<
        | {
              currentPage: number
              totalItems: number | undefined
              data: UserDataType[]
          }
        | undefined
    >(undefined)
    const [currentPage, setCurrentPage] = useState(1)
    const [error, setError] = useState<string | undefined>(undefined)

    const pageSize = 10

    const [loading, setLoading] = useState(true)

    const lengths: number = 0
    const { loginData } = useSelector((state: RootState) => state)
    const { userRole } = useSelector((state: RootState) => state.UserData)
    const [invite, sendInvitation] = useState(false)
    const handlePaginationChange = async (page: number): Promise<void> => {
        try {
            setLoading(true)
            // page = page - 1

            const response: any = await getAllUserPagination(
                String(loginData.data?.userDetails.countryName),
                page - 1
            )
            setAllUSer(response)
        } catch (errors: unknown) {
            setError('Error fetching data')
        } finally {
            setLoading(false)
        }
        setCurrentPage(page)
    }
    const navigate = useNavigate()

    useEffect(() => {
        store.dispatch(getAllUsers())
    }, [])

    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            try {
                const res = await getAllUser(
                    String(loginData.data?.userDetails.countryName)
                )
                console.log('resposne', res)
                setAllUSer(res)
            } catch (errors) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }

        fetchData()
    }, [])
    const columns: ColumnsType<UserDataType> = [
        {
            title: 'Image',
            dataIndex: 'schoolProfilePicture',
            key: 'schoolProfilePicture',
            render: (Dummydatas) => {
                if (!Dummydatas) {
                    return (
                        <img
                            // src={DefaultImage}
                            src={DefaultImage}
                            width={44}
                            height={44}
                        />
                    )
                } else {
                    return (
                        <img
                            src={`https://fistastore.com:444${Dummydatas}`}
                            width={44}
                            height={44}
                        />
                    )
                }
            },
        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (text) => (
                <p>{text > 10 ? `${text.slice(0, 10)}...` : text}</p>
            ),
        },
        {
            title: 'Email Address',
            dataIndex: 'emailAddress',
            key: 'emailAddress',
            // render: (_, { schoolType }) => {
            //     const item = businessTypes.find((b) => b.id === schoolType)
            //     return <p>{item?.en}</p>
            // },
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Status',
            dataIndex: 'statusId',
            key: 'statusId',
            render: (isActive, index) => {
                // if (index?.schoolStatusId === 1) {
                return (
                    <div className={'Active'}>
                        <button
                        // onClick={() => {
                        //     {
                        //         BranchStatus(index.studentId, 2)
                        //     }
                        // }}
                        >
                            Active
                        </button>
                        <img src={StatusActiveError} alt="image" />
                    </div>
                )
                // } else {
                return (
                    <div className={'De-Active'}>
                        <button
                        // onClick={() => {
                        //     BranchStatus(index.studentId, 1)
                        // }}
                        >
                            De-Active
                        </button>
                        <img src={StatusActiveError} alt="image" />
                    </div>
                )
                // }
            },
        },
        {
            title: 'Action',

            dataIndex: 'userId',
            key: 'status',
            render: (userId) => {
                // if (index?.schoolStatusId === 1) {
                console.log('UserId in userList', userId)
                if (userRole === 'school') {
                    return (
                        <div className="Active">
                            <button
                                style={{ background: '#006197' }}
                                onClick={() => {
                                    store.dispatch(setUserListId(userId))
                                    navigate('/school/create/')
                                }}
                            >
                                Create School
                            </button>
                        </div>
                    )
                } else if (userRole === 'instructor') {
                    return (
                        <div>
                            <button
                                style={{
                                    background: '#006197',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                    padding: '7px 10px',
                                    borderRadius: '4px',
                                    height: '30px',
                                    color: 'rgb(255, 255, 255)',
                                    fontSize: '14px !important',
                                    display: 'block',
                                    position: 'relative',
                                    textAlign: 'center',
                                    width: '130%',
                                }}
                                onClick={() => {
                                    store.dispatch(setUserListId(userId))
                                    navigate('/instructor/create/')
                                }}
                            >
                                Create Instructor
                            </button>
                        </div>
                    )
                } else if (userRole === 'invite') {
                    return (
                        <div>
                            <button
                                style={{
                                    background: '#006197',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                    padding: '7px 10px',
                                    borderRadius: '4px',
                                    height: '30px',
                                    color: 'rgb(255, 255, 255)',
                                    fontSize: '14px !important',
                                    display: 'block',
                                    position: 'relative',
                                    textAlign: 'center',
                                    width: '130%',
                                }}
                                onClick={() => {
                                    store.dispatch(setUserListId(userId))
                                    sendInvitation(true)
                                }}
                            >
                                Send Invitation
                            </button>
                        </div>
                    )
                }
            },
        },
    ]
    console.log('AllUSer', AllUSer)
    const initialValues = (): void => {}
    const handleCreateSubmit = (): void => {}
    const [schoolExist, setSchoolExist] = useState(false)
    console.log('school exist', schoolExist)
    const RenderTableTitle = (): JSX.Element => {
        return (
            <CustomDiv>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleCreateSubmit}
                >
                    {(formik) => {
                        return (
                            <Form
                                name="basic"
                                // onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="mainWrapper">
                                    <h3 className="table-heading">Users</h3>
                                    <div className="FilterMainContainer">
                                        <div className="arrowsMain">
                                            <div className="arrowRight">
                                                <img
                                                    src={LeftArrow}
                                                    alt="Date"
                                                    width={18}
                                                    height={12}
                                                />
                                            </div>
                                            <div className="arrowLeft">
                                                <img
                                                    src={RightArrow}
                                                    alt="Date"
                                                    width={18}
                                                    height={12}
                                                />
                                            </div>
                                        </div>
                                        <FormControl
                                            control="startEndDate"
                                            type="startEndDate"
                                            name="startDate"
                                            fontFamily={fontFamilyRegular}
                                            padding="8px 10px"
                                        />
                                        <div className="todayPlusContainer">
                                            <div className="dateToday">
                                                <p>Today</p>
                                            </div>
                                            <CustomButton
                                                bgcolor={tertiaryBlue2}
                                                textTransform="Captilize"
                                                color={pureDark}
                                                padding="6.5px 0px"
                                                fontFamily={`${fontFamilyMedium}`}
                                                width="40px"
                                                type="submit"
                                                title=""
                                                fontSize="17px"
                                                // loading={loading}
                                                icon={
                                                    <img
                                                        src={plusIcon}
                                                        alt="edit icon"
                                                        width={17}
                                                        height={17}
                                                    />
                                                }
                                                clicked={() => {
                                                    loginData.data?.userDetails
                                                        .roleName === 'ADMIN' &&
                                                        navigate('/register')
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </CustomDiv>
        )
    }
    console.log('all the class data', AllUSer)

    return (
        <>
            <Head title="User List" />
            <RenderTableTitle />
            <ListStudentStyling>
                <Table
                    columns={columns}
                    // dataSource={
                    //     UserData?.data[0]?.userId !== 0 ? UserData?.data : []
                    // }
                    dataSource={AllUSer ? AllUSer?.data : []}
                    scroll={{ x: true }}
                    pagination={{
                        current: currentPage,
                        total: AllUSer ? AllUSer.totalItems : 0,
                        pageSize: pageSize,
                        showTotal: (total, range) => (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: `Page <span className='paginationVal'>${currentPage}</span> of ${Math.ceil(
                                        total / pageSize
                                    )}`,
                                }}
                            />
                        ),
                        onChange: (page) => handlePaginationChange(page),
                        // itemRender: customItemRender,
                    }}
                />
            </ListStudentStyling>
            {schoolExist && <RegisterUser />}
            {invite && (
                <CustomModal
                    isModalVisible={invite}
                    setIsModalVisible={sendInvitation}
                >
                    {' '}
                    <InviteUser />{' '}
                </CustomModal>
            )}
        </>
    )
}

export default UserList
