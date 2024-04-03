import React from 'react'
import { Dropdown, Form, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ReportListStyle } from './style'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    pureDark,
    tertiaryBlue2,
} from '../../../components/GlobalStyle'
import { useNavigate } from 'react-router-dom'
import plusIcon from '../../../assets/icons/ic_plus.svg'
import actionMenuTogglerIcon from '../../../assets/icons/ic_action_menu_toggler.svg'
import LoadingOverlay from '../../../components/Modal/LoadingOverlay'
import { RulesDataType } from '../../../redux/features/Rules/RulesSlice'
import DummyData from './dummyData.json'
import StatusActiveError from '../../../assets/images/activeBtnError.svg'
import RightArrow from '../../../assets/images/rightArrow.svg'
import LeftArrow from '../../../assets/images/leftArrow.svg'
import { Formik } from 'formik'
import FormControl from '../../../components/FormControl'
import { CustomDiv } from '../../CreateSchool/ListSchool/CustomDiv'
import Head from '../../../components/Head/Head'

const ReportList: React.FC = () => {
    const navigate = useNavigate()

    const navigation = (record: RulesDataType, redirectTo: string): void => {
        switch (redirectTo) {
            case 'edit':
                navigate(`/Rules/edit/${record.RulesID}`, {
                    state: {
                        branchToEdit: record as RulesDataType,
                    },
                })
                break

            case 'view':
                navigate(`/Rules/view/${record.RulesID}`, {
                    state: {
                        branch: record as RulesDataType,
                    },
                })
                break

            case 'school':
                navigate(`/Rules/School-profile${record.RulesID}`, {
                    state: {
                        branch: record as RulesDataType,
                    },
                })
        }
    }
    const loading = false

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
                                    <h3 className="table-heading">Reports</h3>
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
                                                // clicked={() => {
                                                //     navigate(`/user/list`)
                                                // }}
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

    const columns: ColumnsType<RulesDataType> = [
        {
            title: 'Report By',
            dataIndex: 'RulesTitle',
            key: 'RulesTitle',
        },
        {
            title: 'Type',
            dataIndex: 'RulesMainCategory',
            key: 'RulesMainCategory',
        },
        {
            title: 'Type Name',
            dataIndex: 'RulesCategory',
            key: 'RulesCategory',
        },
        {
            title: 'Actions',
            key: 'RulesAction',
            render: (_, record) => {
                const items = [
                    {
                        key: '1',
                        label: 'View',
                        onClick: () => navigation(record, 'view'),
                    },
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

    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <Head title="Report List" />
            <RenderTableTitle />
            <ReportListStyle>
                <Table
                    columns={columns}
                    dataSource={
                        DummyData.map((item) => ({
                            ...item,
                            key: item.RulesID,
                        })) as unknown as RulesDataType[]
                    }
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
            </ReportListStyle>
        </>
    )
}

export default ReportList
