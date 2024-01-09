import React, { useEffect } from 'react'
import { Dropdown, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ListInstructorStyled } from './styles'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CustomDiv } from './CustomDiv'
import {
    fontFamilyMedium,
    pureDark,
    tertiaryBlue2,
} from '../../../components/GlobalStyle'
import { useNavigate } from 'react-router-dom'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import defaltimg from '../../../assets/images/create_school_user_profile.svg'
import { useSelector } from 'react-redux'
// import store, { RootState } from "../../../redux/store";
import store, { RootState } from '../../../redux/store'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import {
    getInstructorByUserId,
    InstructorDataType,
} from '../../../redux/features/instructor/instructorSlice'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import DateCalander from '../../../assets/images/dateCalander.svg'
import useInstructor from '../../../hooks/useInstructor'

const RenderTableTitle = (): JSX.Element => {
    const navigate = useNavigate()
    const { getLabelByKey } = useScreenTranslation('instructorList')

    return (
        <div className="d-flex justify-content-between">
            <h3 className="table-heading">{getLabelByKey('title')}</h3>
            <CustomDiv>
                <div className="instructorDateSection">
                    <div className="mainarrow">
                        <div className="arrowright">
                            <img
                                src={LeftArrow as string}
                                alt="Date"
                                width={18}
                                height={12}
                            />
                        </div>
                        <div className="arrowleft">
                            <img
                                src={RightArrow as string}
                                alt="Date"
                                width={18}
                                height={12}
                            />
                        </div>
                    </div>
                    <div className="dateRange">
                        <p>
                            <span>Mon,</span> Sep 11, 2023 - <span>Thu,</span>{' '}
                            Sep 21, 2023
                        </p>
                        <img
                            src={DateCalander as string}
                            alt="Calander"
                            width={21}
                            height={21}
                        />
                    </div>
                    <div className="dateToday">Today</div>
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
                    icon={
                        <img
                            src={plusIcon as string}
                            alt="edit icon"
                            width={17}
                            height={17}
                        />
                    }
                    clicked={() => {
                        navigate(`/instructor/create`)
                    }}
                />
            </CustomDiv>
        </div>
    )
}

const ListInstructor: React.FC = () => {
    const { getLabelByKey } = useScreenTranslation('instructorList')

    const navigate = useNavigate()
    const navigation = (
        record: InstructorDataType,
        redirectTo: string
    ): void => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/instructor/edit/${record.instructorId}`, {
                    state: {
                        branchToEdit: record as InstructorDataType,
                    },
                })
                break

            case 'view':
                navigate(`/instructor/view/${record.instructorId}`, {
                    state: {
                        branch: record as InstructorDataType,
                    },
                })
                break

            // case "subscribe":
            //   navigate(`/instructor/subscribe/${record.instructorId}`, {
            //     state: {
            //       branch: record as InstructorDataType,
            //     },
            //   });
        }
    }

    const { deleteInstructor, deletemodal } = useInstructor()
    const { instructorData, loading } = useSelector(
        (state: RootState) => state.instructorData
    )

    console.log('<<instructordata', instructorData)
    useEffect(() => {
        store.dispatch(getInstructorByUserId())
    }, [])

    const handleDelete = (record: number): void => {
        deleteInstructor(record)
        // store.dispatch(getInstructorByUserId())
    }
    const {
        statusData: { facilities },
    } = useSelector((state: RootState) => state.appData.data)
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const showSpecializations = (_Specializations: string): string => {
        const SpecializationArr = _Specializations.split(',')

        let SpecializationName = ''
        SpecializationArr.map((specilizations) => {
            const index = facilities.findIndex(
                (spec) => spec.id === specilizations
            )
            if (index !== -1) {
                SpecializationName =
                    SpecializationName === ''
                        ? (facilities[index] as any)[selectedLanguage]
                        : `${SpecializationName}, ${
                              (facilities[index] as any)[selectedLanguage]
                          }`
            }
        })
        if (SpecializationName.length > 35) {
            return `${SpecializationName.slice(0, 35)}...`
        }
        return SpecializationName
    }
    const columns: ColumnsType<InstructorDataType> = [
        {
            title: getLabelByKey('Id'),
            dataIndex: 'instructorId',
            key: 'instructorId',
        },
        {
            title: getLabelByKey('Image'),
            dataIndex: 'instructorImage',
            key: 'instructorImage',
            render: () => {
                return <img src={defaltimg as string} width={44} height={44} />
            },
        },
        {
            title: getLabelByKey('name'),
            dataIndex: 'instructorName',
            key: 'instructorName',
        },
        {
            title: getLabelByKey('specializations'),
            dataIndex: 'specializations',
            key: 'specializations',
            render: (DummyData) => {
                return (
                    <p className="sub-title">
                        {showSpecializations(DummyData)}
                    </p>
                )
            },
        },
        {
            title: getLabelByKey('ranking'),
            dataIndex: 'rankId',
            key: 'rankId',
            render: () => {
                return (
                    <div
                        className="progress"
                        style={{
                            background: '#386BB4',
                            borderRadius: '4px',
                            border: '1px solid #231F20',
                        }}
                    >
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '40%', background: '#231F20' }}
                            aria-valuenow={40}
                            aria-valuemin={10}
                            aria-valuemax={100}
                        ></div>
                    </div>
                )
            },
        },
        {
            // title: getLabelByKey("experiences"),
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
        },
        {
            title: getLabelByKey('phoneNumber'),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: getLabelByKey('status'),
            dataIndex: 'instructorStatus',
            key: 'instructorStatus',
            render: () => {
                return (
                    <div>
                        <button>Active</button>
                        <img src={StatusActiveError as string} alt="image" />
                    </div>
                )
            },
        },
        {
            title: getLabelByKey('actions'),
            key: 'instructoraction',
            render: (_, record) => {
                const items = [
                    {
                        key: '1',
                        label: 'View',
                        onClick: () => navigation(record, 'view'),
                    },
                    {
                        key: '2',
                        label: 'Edit',
                        onClick: () => navigation(record, 'edit'),
                    },
                    {
                        key: '4',
                        label: 'Delete',
                        onClick: () =>
                            //navigation(record, "delete"),
                            {
                                handleDelete(record.instructorId)
                            },
                    },
                    // {
                    //   key: "3",
                    //   label: "Subscribe",
                    //   onClick: () => navigation(record, "subscribe"),
                    // },
                ]
                return (
                    <Space size="middle">
                        <Dropdown menu={{ items }}>
                            <img
                                src={actionMenuTogglerIcon as string}
                                alt="action menu"
                                style={{ cursor: 'pointer' }}
                            />
                        </Dropdown>
                    </Space>
                )
            },
        },
    ]

    // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    // const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    //     console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    //     setSelectedRowKeys(newSelectedRowKeys)
    // }

    // const rowSelection = { selectedRowKeys, onChange: onSelectChange }

    return (
        <>
            {deletemodal().modalComponent}
            {/* {deleteConfirmation(_Id).modalComponent} */}

            {loading && <LoadingOverlay message="" />}
            <ListInstructorStyled>
                <Table
                    columns={columns}
                    dataSource={instructorData.data.map((data) => {
                        return data
                    })}
                    title={() => <RenderTableTitle />}
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
            </ListInstructorStyled>
        </>
    )
}

export default ListInstructor
