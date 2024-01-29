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
// import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../assets/images/rightArrow.svg'
import LeftArrow from '../../assets/images/leftArrow.svg'
import defaultPic from '../../assets/images/create_school_user_profile.svg'
import { Form, Formik } from 'formik'
import FormControl from '../../components/FormControl'
import { SchoolDataType } from '../../redux/features/dashboard/dashboardDataSlice'
import { CustomDiv } from '../CreateSchool/ListSchool/CustomDiv'
const ListStudent = (): JSX.Element => {
    // const { schoolData } = useSelector(
    //     (state: RootState) => state.dashboardData
    // )

    const navigate = useNavigate()

    // const { schoolData, loading } = useSelector(
    //     (state: RootState) => state.schoolData
    // )

    // const {
    //     dropdowns: { businessTypes },
    // } = useSelector((state: RootState) => state.appData.data)

    const columns: ColumnsType<SchoolDataType> = [
        {
            title: 'Id',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: 'Image',
            dataIndex: 'profilePicture',
            key: 'profilePicture',
            render: (Dummydatas) => {
                // if (Dummydatas.profilePicture === null) {
                return <img src={Dummydatas} width={44} height={44} />
                // }
                // else {
                //     return (
                //         <img
                //             src={`https://fistastore.com:444${Dummydatas?.profilePicture}`}
                //             width={44}
                //             height={44}
                //         />
                //     )
                // }
            },
        },
        {
            title: 'Name',
            dataIndex: 'studentName',
            key: 'studentName',
            render: (text) => (
                <p>{text.length > 10 ? `${text.slice(0, 10)}...` : text}</p>
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
            dataIndex: 'status',
            key: 'status',
            // render: (isActive, index) => {

            //     if (index?.schoolStatusId === 1) {
            //         return (
            //             <div className={'Active'}>
            //                 <button
            //                 // onClick={() => {
            //                 //     {
            //                 //         BranchStatus(index.studentId, 2)
            //                 //     }
            //                 // }}
            //                 >
            //                     Active
            //                 </button>
            //                 <img src={StatusActiveError} alt="image" />
            //             </div>
            //         )
            //     } else {
            //         return (
            //             <div className={'De-Active'}>
            //                 <button
            //                 // onClick={() => {
            //                 //     BranchStatus(index.studentId, 1)
            //                 // }}
            //                 >
            //                     De-Active
            //                 </button>
            //                 <img src={StatusActiveError} alt="image" />
            //             </div>
            //         )
            //     }
            // },
        },
    ]

    const initialValues = (): void => {}
    const handleCreateSubmit = (): void => {}

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
                                    <h3 className="table-heading">Schools</h3>
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
                                                    navigate(`/school/create`)
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

    // useEffect(() => {
    //     store.dispatch(getBranchBySchoolId())
    // }, [])

    // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    // const [current, setCurrent] = useState(1)

    // const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    //     setSelectedRowKeys(newSelectedRowKeys)
    // }

    // const rowSelection = { selectedRowKeys, onChange: onSelectChange }

    return (
        <>
            {/* {deletemodal().modalComponent}
            {deleteConfirmation(Id).modalComponent} */}

            {/* {loading && <LoadingOverlay message="" />} */}
            <RenderTableTitle />
            <ListStudentStyling>
                <Table
                    columns={columns}
                    // dataSource={
                    //     schoolData?.data[0].studentId !== 0
                    //         ? schoolData.data
                    //         : []
                    // }
                    dataSource={
                        dummyData.map((item) => ({
                            ...item,
                            key: item.studentId, // Make sure studentId is present in the 'item'
                        })) as any
                    }
                    scroll={{ x: true }}
                    pagination={{
                        showTotal: (total, range) => (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: `Page <span className='paginationVal'>${range[0]}</span> of ${range[1]}`,
                                }}
                            />
                        ),
                    }}
                />
            </ListStudentStyling>
        </>
    )
}

export default ListStudent
