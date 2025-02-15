import React, { useEffect, useState } from 'react'
import { Dropdown, Pagination, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ListClassStyled } from './style'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CustomDiv } from './CustomDiv'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    pureDark,
    tertiaryBlue2,
} from '../../../components/GlobalStyle'
import { useNavigate, useParams } from 'react-router-dom'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import {
    ClassDataType,
    getBranchBySchoolId,
} from '../../../redux/features/CLasses/ClassSlice'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
// import DateCalander from '../../../assets/images/dateCalander.svg'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'
import useClass from '../../../hooks/useClass'
import moment from 'moment'
import FormControl from '../../../components/FormControl'
import { Form, Formik } from 'formik'

const ListClass = (): JSX.Element => {
    const navigate = useNavigate()
    const { schoolId, branchId, franchiseId } = useParams()
    const {
        ClassStatus,
        deletemodal,
        deleteConfirmation,
        setIsShowModal,
        getInstructorstartenddate,
        getClassPegination,
        getClassbyschoolId,
        classData,
    } = useClass()
    const [Id, setId] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [CalculateDay, setCalculateDay] = useState(0)
    const [NextDays, setNextDays] = useState('')
    const { loginData } = useSelector((state: RootState) => state)
    // const [calenderData, setcalenderData] = useState<
    //     ClassDataType[] | undefined
    // >(undefined)
    const [Flag, setFlag] = useState(false)
    const calculateDaysDifference = (st: string, en: string): number => {
        const start = new Date(st)
        const end = new Date(en)
        console.log('as', st, en)

        if (endDate != null) {
            const differenceInTime = end.getTime() - start.getTime() + 1
            const differenceInDays = Math.ceil(
                differenceInTime / (1000 * 3600 * 24)
            )
            return differenceInDays
        } else {
            return 1
        }
    }

    const [error, setError] = useState<string | undefined>(undefined)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    const handlePaginationChange = async (page: number): Promise<any> => {
        try {
            //setLoading(true)
            // page = page - 1
            await getClassPegination(
                Number(schoolId || loginData.data?.schoolId),
                page - 1
            )
            // setAllClass(response)
            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: unknown) {
            setError('Error fetching data')
        } finally {
            //  setLoading(false)
        }
        setCurrentPage(page)
    }
    // const { g}=useCreateSchool()

    const { getLabelByKey } = useScreenTranslation('classesList')
    useEffect(() => {
        store.dispatch(getBranchBySchoolId())
    }, [])
    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            try {
                const res = await getClassbyschoolId(
                    Number(schoolId || loginData.data?.schoolId)
                )

                //setAllClass(res)
                console.log({ res }, classData)
            } catch (errors) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }

        fetchData()
    }, [])
    const getparam = async (
        startdate: string,
        enddate: string
    ): Promise<void> => {
        console.log('in get param')
        await getInstructorstartenddate(
            startdate,
            enddate,
            Number(schoolId || loginData.data?.schoolId)
        )
    }

    const handleDateChange = async (dates: any): Promise<void> => {
        setFlag(true)
        console.log('datesssss', dates)
        setCalculateDay(0)
        const [start, end] = dates?.map((date: any) =>
            moment(date).format('YYYY-MM-DD')
        )
        setStartDate(start)
        setEndDate(end)
        console.log('Start Date:', start)
        console.log('End Date:', end)

        await getparam(start, end)

        setCalculateDay(calculateDaysDifference(startDate, endDate))
        console.log('next day count', CalculateDay)

        const days = moment(endDate, 'YYYY-MM-DD').add(CalculateDay, 'd')
        console.log('zx', days)

        // Check the validity of the 'days' moment object
        console.log('Is Valid:', days.isValid())

        // If the 'days' object is valid, format the date
        if (days.isValid()) {
            const formattedDays = days.format('YYYY-MM-DD')
            console.log('Formatted Days:', formattedDays)
            setNextDays(formattedDays)
            console.log('nada', NextDays)
        } else {
            console.log('Invalid date')
        }
    }

    const handlenextdates = async (): Promise<void> => {
        console.log('next date', endDate, NextDays)
        console.log('day count', CalculateDay)

        //const dataaa = await getparam(endDate, NextDays)
        //console.log('p', dataaa)

        const days = moment(endDate, 'YYYY-MM-DD').add(CalculateDay, 'd')
        console.log('zx', days)
        // Check the validity of the 'days' moment object
        console.log('Is Valid:', days.isValid())

        // If the 'days' object is valid, format the date
        if (days.isValid()) {
            const formattedDays = days.format('YYYY-MM-DD')
            console.log('Formatted Days:', formattedDays)
            setEndDate(NextDays)
            setNextDays(formattedDays)
            console.log('nada', NextDays)
        } else {
            console.log('Invalid date')
        }
    }

    const { loading } = useSelector((state: RootState) => state.ClassData)
    const navigation = (record: ClassDataType, redirectTo: string): void => {
        switch (redirectTo) {
            case 'update':
                navigate(`/class/update/${record.classId}`, {
                    state: {
                        branchToEdit: record as ClassDataType,
                    },
                })
                break

            case 'view':
                navigate(`/class/view/${record.classId}`, {
                    state: {
                        branch: record as ClassDataType,
                    },
                })
                break

            case 'timeTable':
                navigate(`/timetable/list/${record.classId}`)
        }
    }

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
                                    <h3 className="table-heading">
                                        {getLabelByKey('title')}
                                    </h3>
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
                                            <div
                                                className="arrowLeft"
                                                onClick={handlenextdates}
                                            >
                                                <img
                                                    src={RightArrow}
                                                    alt="Date"
                                                    width={18}
                                                    height={12}
                                                />
                                            </div>
                                            {/* <div className="arrowLeft">
                                                <button
                                                    onClick={handlenextdates}
                                                >
                                                    {' '}
                                                    <img
                                                        src={RightArrow}
                                                        alt="Date"
                                                        width={18}
                                                        height={12}
                                                    />
                                                </button>{' '}
                                            </div> */}
                                        </div>
                                        <FormControl
                                            control="startEndDate"
                                            type="startEndDate"
                                            name="startDate"
                                            fontFamily={fontFamilyRegular}
                                            padding="8px 10px"
                                            onApply={(dates: any) => {
                                                handleDateChange(dates)
                                            }}
                                            startDate={startDate}
                                            endDate={endDate}
                                            // onChange={(dates: any) => {
                                            //     handleDateChange(dates)
                                            // }}
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
                                                    navigate(`/class/create`)
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

    const columns: ColumnsType<ClassDataType> = [
        {
            title: getLabelByKey('classTitle'),
            dataIndex: 'title',
            key: 'ClassTitle',
        },
        {
            title: '',
            dataIndex: 'instructorNamee',
            key: 'instructorId',
            render: (instructorName) => {
                return <div>{instructorName}</div>
            },
        },
        {
            title: getLabelByKey('startDate'),
            dataIndex: 'startDate',
            key: 'startDate',
            // eslint-disable-next-line @typescript-eslint/no-shadow
            render: (startDate) => {
                return (
                    <div className="list-item mb-0">
                        {moment(moment(startDate, 'YYYY-MM-DD')).format(
                            'dddd, MMM DD, YYYY'
                        )}
                    </div>
                )
            },
        },
        {
            title: getLabelByKey('endDate'),
            dataIndex: 'endDate',
            key: 'endDate',
            // eslint-disable-next-line @typescript-eslint/no-shadow
            render: (endDate) => {
                return (
                    <div>
                        {moment(moment(endDate, 'YYYY-MM-DD')).format(
                            'dddd, MMM DD, YYYY'
                        )}
                    </div>
                )
            },
        },
        {
            title: getLabelByKey('fees'),
            dataIndex: 'fee',
            key: 'fee',
        },

        {
            title: getLabelByKey('status'),
            dataIndex: 'classStatusId',
            key: 'classStatusId',
            render: (isActive, index) => {
                if (index?.classStatusId === 1) {
                    return (
                        <div className={'Active'}>
                            <button
                                onClick={() => {
                                    {
                                        ClassStatus(index.classId, 2)
                                    }
                                }}
                            >
                                Active
                            </button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                } else {
                    return (
                        <div className={'De-Active'}>
                            <button
                                onClick={() => {
                                    ClassStatus(index.classId, 1)
                                }}
                            >
                                De-Active
                            </button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                }
            },
        },
        {
            title: getLabelByKey('actions'),
            key: 'ClassAction',
            render: (_, record) => {
                const items = [
                    {
                        key: '1',
                        label: 'View',
                        onClick: () => navigation(record, 'view'),
                    },
                    {
                        key: '2',
                        label: 'Update',
                        onClick: () => navigation(record, 'update'),
                    },
                    {
                        key: '3',
                        label: 'Delete',
                        onClick: () => {
                            setId(record.classId)
                            setIsShowModal(true)
                        },
                    },
                    {
                        key: '4',
                        label: 'TimeTable',
                        onClick: () => navigation(record, 'timeTable'),
                    },
                ]
                return (
                    <Space size="middle">
                        <Dropdown menu={{ items }}>
                            <img
                                src={actionMenuTogglerIcon}
                                alt="action menu"
                                style={{ cursor: 'pointer' }}
                            />
                        </Dropdown>
                    </Space>
                )
            },
        },
    ]
    return (
        <>
            <Head title="Classes List" />
            {deletemodal().modalComponent}
            {deleteConfirmation(Id).modalComponent}
            {loading && <LoadingOverlay message="" />}
            <RenderTableTitle />
            <ListClassStyled>
                <Table
                    columns={columns}
                    // dataSource={
                    //     Flag === false
                    //         ? ClassData?.data[0].id !== 0
                    //             ? ClassData.data
                    //             : []
                    //         : calenderData === undefined
                    //           ? []
                    //           : calenderData
                    // }
                    dataSource={classData ? classData?.data : []}
                    // scroll={{ x: true }}
                    pagination={
                        classData &&
                        classData.totalItems &&
                        classData.totalItems > 10
                            ? {
                                  current: currentPage,
                                  total: classData ? classData.totalItems : 0,
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
                                  onChange: (page) =>
                                      handlePaginationChange(page),
                                  position: ['bottomRight'],
                              }
                            : false
                    }
                />
            </ListClassStyled>
        </>
    )
}

export default ListClass
