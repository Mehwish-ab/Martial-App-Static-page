import React, { useEffect, useState } from 'react'
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
import BlueBelt from '../../../assets/icons/BlueBelt.svg'

const RenderTableTitle = (): JSX.Element => {
    const navigate = useNavigate()
    const { getLabelByKey } = useScreenTranslation('instructorList')

    return (
        <CustomDiv>
            <div className="mainWrapper">
                <h3 className="table-heading">{getLabelByKey('title')}</h3>
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
                    <div className="dateRange">
                        <p>
                            {' '}
                            <span>Mon,</span> Sep 11, 2023 - <span>Thu,</span>{' '}
                            Sep 21, 2023
                        </p>
                        <img
                            src={DateCalander}
                            alt="calander"
                            width={21}
                            height={21}
                        />
                    </div>
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
                                navigate(`/instructor/create`)
                            }}
                        />
                    </div>
                </div>
            </div>
        </CustomDiv>
    )
}

const ListInstructor: React.FC = () => {
    const { getLabelByKey } = useScreenTranslation('instructorList')
    const {
        belts: { adult },
    } = useSelector((state: RootState) => state.appData.data)

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

    const {
        deletemodal,
        deleteConfirmation,
        setIsShowModal,
        InstructorStatus,
    } = useInstructor()
    const { instructorData, loading } = useSelector(
        (state: RootState) => state.instructorData
    )

    console.log('<<instructordata', instructorData)
    useEffect(() => {
        store.dispatch(getInstructorByUserId())
    }, [])
    const [Id, setId] = useState(0)

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
        if (SpecializationName.length > 26) {
            return `${SpecializationName.slice(0, 26)}...`
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
            render: (Dummydatas) => {
                console.log('>>images', Dummydatas?.profilePicture)
                if (Dummydatas.profilePicture === null) {
                    return <img src={defaltimg} width={44} height={44} />
                } else {
                    return (
                        <img
                            src={`https://fistastore.com:444${Dummydatas?.profilePicture}`}
                            width={44}
                            height={44}
                        />
                    )
                }
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
            render: (image) => {
                const selectedBelt = adult.find((belt) => belt.id === image)
                if (selectedBelt) {
                    return (
                        <div className="blueBeltContainer">
                            {selectedBelt && (
                                <img
                                    src={`https://fistastore.com:444/${selectedBelt?.imageUrl}`} // alt={selectedBelt.en}
                                />
                            )}
                        </div>
                    )
                } else {
                    return '--'
                }
            },
        },
        {
            // title: getLabelByKey("experiences"),
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
            render: (experience) => {
                if (experience === 0 || experience === null) return '--'
                else {
                    return experience
                }
            },
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
            render: (isActive, index) => {
                console.log('Status', isActive, index)

                if (index?.instructorStatusId === 1) {
                    return (
                        <div className={'Active'}>
                            <button
                                onClick={() => {
                                    {
                                        InstructorStatus(index.instructorId, 2)
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
                                    InstructorStatus(index.instructorId, 1)
                                }}
                            >
                                De-Active
                            </button>
                            <img src={StatusActiveError} alt="image" />
                        </div>
                    )
                }
            },
            // render: () => {
            //     return (
            //         <div>
            //             <button>Active</button>
            //             <img src={StatusActiveError as string} alt="image" />
            //         </div>
            //     )
            // },
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
                        onClick: () => {
                            setId(record.instructorId)
                            setIsShowModal(true)
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
            {deleteConfirmation(Id).modalComponent}

            {loading && <LoadingOverlay message="" />}
            <RenderTableTitle />
            <ListInstructorStyled>
                <Table
                    columns={columns}
                    dataSource={instructorData.data.map((data) => {
                        return data
                    })}
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
