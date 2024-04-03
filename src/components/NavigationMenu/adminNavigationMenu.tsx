import { Menu, MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/icons/ic_logo.svg'
import { childListOfSetting } from '../Sidebar/constants'
// import { SidebarStyle } from "../Sidebar/style";
import { NavigationMenuStyled } from './styles'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
type MenuItem = Required<MenuProps>['items'][number]

const menuLinksKeys: any = {
    dashboard: 'dashboard',
    createSchool: 'createSchool',
    trainingRoom: 'trainingRoom',
    listBranch: 'listBranch',
    listFranchise: 'listFranchise',
    listInstructor: 'listInstructor',
    instructor: 'instructor',
    timeTable: 'timeTable',
    classes: 'classes',
    membership: 'membership',
    rules: 'rules',
    notification: 'notification',
    transactionsHistory: 'transactionsHistory',
    subscriptionHistory: 'subscriptionHistory',
    setting: 'setting',
    language: 'language',
    currency: 'currency',
    helpAndSupport: 'helpAndSupport',
    customerServices: 'customerServices',
    reports: 'reports',
    user: 'user',
    attendance: 'attendance',
    qrCode: 'qrCode',
}

const AdminNavigationMenu = (): JSX.Element => {
    const location = useLocation()
    const navigate = useNavigate()
    const { loginData } = useSelector((state: RootState) => state)
    // const getMenuIcon = (file: any) => <img src={file} alt="" />;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation = (link: string, key: string): void => {
        navigate(link)
    }

    const getLabel = (
        label: string,
        link: string,
        key: string
    ): JSX.Element => (
        <div onClick={() => (link ? navigation(link, key) : '')}>{label}</div>
    )
    const adminMenuLinks: any = {
        dashboard: '/dashboard',
        createSchool: '/school/list',
        classes: '/class/list',
        membership: '/membership/list',
        timeTable: '/timetable/list',
        trainingRoom: `/school/room/list/${loginData.data?.schoolId}`,
        listInstructor: '/instructor/list',
        transactionsHistory: '/transaction-history/list',
        payment: '/payment',
        listBranch: '/branch/list',
        listFranchise: '/franchise/list',
        rules: '/rules/list',
        helpAndSupport: '/help-support',
        booking: '',
        language: '/language',
        qrCode: '/qr-code',
        setting: '/settings',
        user: '/user/list',
        attendance: '',
        reports: '/reports/list',
    }

    const adminSidebarData: MenuItem[] = [
        {
            key: menuLinksKeys.dashboard,
            label: getLabel(
                'Dashboard',
                adminMenuLinks.dashboard,
                menuLinksKeys.dashboard
            ),
        },
        {
            key: menuLinksKeys.createSchool,
            label: getLabel(
                'School',
                adminMenuLinks.createSchool,
                menuLinksKeys.createSchool
            ),
        },
        {
            key: menuLinksKeys.classes,
            label: getLabel(
                'Classes',
                adminMenuLinks.classes,
                menuLinksKeys.classes
            ),
        },
        // {
        //     key: menuLinksKeys.user,
        //     label: getLabel('Users', adminMenuLinks.user, menuLinksKeys.user),
        // },
        {
            key: menuLinksKeys.membership,
            label: getLabel(
                'Memberships',
                adminMenuLinks.membership,
                menuLinksKeys.membership
            ),
        },
        {
            key: menuLinksKeys.timeTable,
            label: getLabel(
                'TimeTable',
                adminMenuLinks.timeTable,
                menuLinksKeys.timeTable
            ),
        },
        {
            key: menuLinksKeys.trainingRoom,
            label: getLabel(
                'Training Rooms',
                adminMenuLinks.trainingRoom,
                menuLinksKeys.trainingRoom
            ),
        },

        {
            key: menuLinksKeys.listInstructor,
            label: getLabel(
                'Instructors',
                adminMenuLinks.listInstructor,
                menuLinksKeys.listInstructor
            ),
        },
        {
            key: menuLinksKeys.subscriptionHistory,
            label: getLabel(
                'Subscription History',
                adminMenuLinks.subscriptionHistory,
                menuLinksKeys.subscriptionHistory
            ),
            // children: childListOfBooking,
        },
        {
            key: menuLinksKeys.transactionsHistory,
            label: getLabel(
                'Transactions History',
                adminMenuLinks.transactionsHistory,
                menuLinksKeys.transactionsHistory
            ),
            // children: childListOfBooking,
        },
        {
            key: menuLinksKeys.subscriptionHistory,
            label: getLabel(
                'Payment Options',
                adminMenuLinks.paymentOptions,
                menuLinksKeys.paymentOptions
            ),
            // children: childListOfBooking,
        },
        {
            key: menuLinksKeys.notification,
            label: getLabel(
                'Notifications',
                adminMenuLinks.notification,
                menuLinksKeys.notification
            ),
        },
        {
            key: menuLinksKeys.setting,
            label: getLabel(
                'Settings',
                adminMenuLinks.setting,
                menuLinksKeys.setting
            ),
            children: childListOfSetting,
        },
        {
            key: menuLinksKeys.waiver,
            label: getLabel(
                'Waiver',
                adminMenuLinks.waiver,
                menuLinksKeys.waiver
            ),
            children: childListOfSetting,
        },
        {
            key: menuLinksKeys.setting,
            label: getLabel(
                'Grading',
                adminMenuLinks.setting,
                menuLinksKeys.setting
            ),
            children: childListOfSetting,
        },
        {
            key: menuLinksKeys.setting,
            label: getLabel(
                'Leads',
                adminMenuLinks.setting,
                menuLinksKeys.setting
            ),
            children: childListOfSetting,
        },
        {
            key: menuLinksKeys.setting,
            label: getLabel(
                'Belts',
                adminMenuLinks.setting,
                menuLinksKeys.setting
            ),
            children: childListOfSetting,
        },
        {
            key: menuLinksKeys.reports,
            label: getLabel(
                'Reports',
                adminMenuLinks.reports,
                menuLinksKeys.reports
            ),
        },
        // {
        //     key: menuLinksKeys.attendance,
        //     label: getLabel(
        //         'Attendance ',
        //         adminMenuLinks.attendance,
        //         menuLinksKeys.attendance
        //     ),
        // },
        {
            key: menuLinksKeys.qrCode,
            label: getLabel(
                'QR Code',
                adminMenuLinks.qrCode,
                menuLinksKeys.qrCode
            ),
        },
        {
            key: menuLinksKeys.setting,
            label: getLabel(
                'Setting',
                adminMenuLinks.setting,
                menuLinksKeys.setting
            ),
            children: childListOfSetting,
        },
        {
            key: menuLinksKeys.reports,
            label: getLabel(
                'Report',
                adminMenuLinks.reports,
                menuLinksKeys.reports
            ),
        },
        // {
        //     key: menuLinksKeys.rules,
        //     label: getLabel('Rules', adminMenuLinks.rules, menuLinksKeys.rules),
        // },
        // {
        //     key: menuLinksKeys.listBranch,
        //     label: getLabel(
        //         'Branches',
        //         adminMenuLinks.listBranch,
        //         menuLinksKeys.listBranch
        //     ),
        // },
        // {
        //     key: menuLinksKeys.listFranchise,
        //     label: getLabel(
        //         'Franchises',
        //         adminMenuLinks.listFranchise,
        //         menuLinksKeys.listFranchise
        //     ),
        // },

        // {
        //     key: menuLinksKeys.language,
        //     label: getLabel(
        //         'Language',
        //         adminMenuLinks.language,
        //         menuLinksKeys.language
        //     ),
        // },
        // {
        //     key: menuLinksKeys.helpAndSupport,
        //     label: getLabel(
        //         'Help & Support',
        //         adminMenuLinks.helpAndSupport,
        //         menuLinksKeys.helpAndSupport
        //     ),
        // },
        // {
        //     key: menuLinksKeys.customerServices,
        //     label: getLabel(
        //         'Customer Services',
        //         adminMenuLinks.customerServices,
        //         menuLinksKeys.customerServices
        //     ),
        // },
        {
            key: menuLinksKeys.user,
            label: getLabel(
                'Students',
                adminMenuLinks.user,
                menuLinksKeys.user
            ),
        },
    ]

    const [selectedKey, setSelectedKey] = useState('')

    useEffect(() => {
        if (location.pathname !== '/') {
            const tempSidebar = [...adminSidebarData]
            const listWithNoDashboard = tempSidebar.filter(
                (item: any) => item.key !== 'dashboard'
            )
            const key =
                listWithNoDashboard.find((item: any) => {
                    return location.pathname.startsWith(
                        adminMenuLinks[item.key]
                    )
                })?.key || ''
            setSelectedKey(key.toString())
        }
    }, [location.pathname])
    return (
        <NavigationMenuStyled>
            <div className="logo text-center">
                <img src={logo} alt="" />
            </div>
            <Menu
                defaultSelectedKeys={[selectedKey]}
                mode="inline"
                items={adminSidebarData}
            />
        </NavigationMenuStyled>
    )
}

export default AdminNavigationMenu
