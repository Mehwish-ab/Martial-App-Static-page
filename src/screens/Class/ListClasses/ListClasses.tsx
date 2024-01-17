import React from 'react'
import { Dropdown, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ListClassStyled } from './style'
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
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { ClassDataType } from '../../../redux/features/CLasses/ClassSlice'
import DummyData from './dummyData.json'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import DateCalander from '../../../assets/images/dateCalander.svg'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import Head from '../../../components/Head/Head'

const ListClass = (): JSX.Element => {
    const navigate = useNavigate()
    const { getLabelByKey } = useScreenTranslation('classesList')
    const { loading } = useSelector((state: RootState) => state.branchData)
    const navigation = (record: ClassDataType, redirectTo: string): void => {
        switch (redirectTo) {
            case 'update':
                navigate(`/class/update/${record.ClassId}`, {
                    state: {
                        branchToEdit: record as ClassDataType,
                    },
                })
                break

            case 'view':
                navigate(`/class/view`, {
                    state: {
                        branch: record as ClassDataType,
                    },
                })
                break

            case 'delete':
                navigate(`/Class/subscribe/${record.ClassId}`, {
                    state: {
                        branch: record as ClassDataType,
                    },
                })
        }
    }

    const RenderTableTitle = (): JSX.Element => {
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
                                <span>Mon,</span> Sep 11, 2023 -{' '}
                                <span>Thu,</span> Sep 21, 2023
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
                                    navigate(`/class/create`)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </CustomDiv>
        )
    }

    const columns: ColumnsType<ClassDataType> = [
        {
            title: getLabelByKey('id'),
            dataIndex: 'ClassId',
            key: 'ClassId',
        },
        {
            title: getLabelByKey('classTitle'),
            dataIndex: 'ClassTitle',
            key: 'ClassTitle',
        },
        {
            title: getLabelByKey('instructor'),
            dataIndex: 'ClassInstructor',
            key: 'ClassInstructor',
        },
        {
            title: getLabelByKey('startDate'),
            dataIndex: 'ClassStartDate',
            key: 'ClassStartDate',
        },
        {
            title: getLabelByKey('endDate'),
            dataIndex: 'ClassEndDate',
            key: 'ClassEndDate',
        },
        {
            title: getLabelByKey('fees'),
            dataIndex: 'ClassFee',
            key: 'ClassFee',
        },

        {
            title: getLabelByKey('status'),
            dataIndex: 'ClassStatus',
            key: 'ClassStatus',
            render: (DummyDatas) => {
                return (
                    <div>
                        <button>{DummyDatas}</button>
                        <img src={StatusActiveError} alt="images" />
                    </div>
                )
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
                        onClick: () => navigation(record, 'delete'),
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
            {loading && <LoadingOverlay message="" />}
            <RenderTableTitle />
            <ListClassStyled>
                <Table
                    columns={columns}
                    dataSource={
                        DummyData.map((item) => ({
                            ...item,
                            key: item.ClassId,
                        })) as any
                    }
                    // scroll={{ x: true }}
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
            </ListClassStyled>
        </>
    )
}

export default ListClass
