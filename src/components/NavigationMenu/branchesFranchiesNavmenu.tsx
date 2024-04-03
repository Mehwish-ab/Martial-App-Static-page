import { Menu, MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/icons/ic_logo.svg'
import { childListOfSetting } from '../Sidebar/constants'
// import { SidebarStyle } from "../Sidebar/style";
import { NavigationMenuStyled } from './styles'
import { useEffect, useState } from 'react'
type MenuItem = Required<MenuProps>['items'][number]
const branchFranchiesMenuLinks: any = {
    dashboard: '/dashboard',
    // createSchool: '/school/list',
    classes: '/class/list',
    timeTable: '/timetable/list',
    transactionsHistory: '/transaction-history/list',
    listInstructor: '/instructor/list',
    listBranch: '/branch/list',
    listFranchise: '/franchise/list',
    membership: '/membership/list',
    payment: '/payment',
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

const menuLinksKeys: any = {
    dashboard: 'dashboard',
    createSchool: 'createSchool',
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

const BranchesFranchiesNavigationMenu = (): JSX.Element => {
    const location = useLocation()
    const navigate = useNavigate()

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

    const [selectedKey, setSelectedKey] = useState('')
    const branchFranchiesSidebarData: MenuItem[] = [
        {
            key: menuLinksKeys.dashboard,
            label: getLabel(
                'Dashboard',
                branchFranchiesMenuLinks.dashboard,
                menuLinksKeys.dashboard
            ),
        },
        {
            key: menuLinksKeys.user,
            label: getLabel(
                'Users',
                branchFranchiesMenuLinks.user,
                menuLinksKeys.user
            ),
        },
        {
            key: menuLinksKeys.classes,
            label: getLabel(
                'Classes',
                branchFranchiesMenuLinks.classes,
                menuLinksKeys.classes
            ),
        },
        {
            key: menuLinksKeys.timeTable,
            label: getLabel(
                'TimeTable',
                branchFranchiesMenuLinks.timeTable,
                menuLinksKeys.timeTable
            ),
        },
        {
            key: menuLinksKeys.membership,
            label: getLabel(
                'Memberships',
                branchFranchiesMenuLinks.membership,
                menuLinksKeys.membership
            ),
        },
        {
            key: menuLinksKeys.listInstructor,
            label: getLabel(
                'Instructors',
                branchFranchiesMenuLinks.listInstructor,
                menuLinksKeys.listInstructor
            ),
        },
        {
            key: menuLinksKeys.transactionsHistory,
            label: getLabel(
                'Transactions History',
                branchFranchiesMenuLinks.transactionsHistory,
                menuLinksKeys.transactionsHistory
            ),
            // children: childListOfBooking,
        },
        {
            key: menuLinksKeys.subscriptionHistory,
            label: getLabel(
                'Subscription History',
                branchFranchiesMenuLinks.subscriptionHistory,
                menuLinksKeys.subscriptionHistory
            ),
            // children: childListOfBooking,
        },
        {
            key: menuLinksKeys.notification,
            label: getLabel(
                'Notifications',
                branchFranchiesMenuLinks.notification,
                menuLinksKeys.notification
            ),
        },
        {
            key: menuLinksKeys.reports,
            label: getLabel(
                'Reports',
                branchFranchiesMenuLinks.reports,
                menuLinksKeys.reports
            ),
        },
        {
            key: menuLinksKeys.attendance,
            label: getLabel(
                'Attendance ',
                branchFranchiesMenuLinks.attendance,
                menuLinksKeys.attendance
            ),
        },
        {
            key: menuLinksKeys.qrCode,
            label: getLabel(
                'QR Code',
                branchFranchiesMenuLinks.qrCode,
                menuLinksKeys.qrCode
            ),
        },
        {
            key: menuLinksKeys.rules,
            label: getLabel(
                'Rules',
                branchFranchiesMenuLinks.rules,
                menuLinksKeys.rules
            ),
        },
        {
            key: menuLinksKeys.listBranch,
            label: getLabel(
                'Branches',
                branchFranchiesMenuLinks.listBranch,
                menuLinksKeys.listBranch
            ),
        },
        {
            key: menuLinksKeys.listFranchise,
            label: getLabel(
                'Franchises',
                branchFranchiesMenuLinks.listFranchise,
                menuLinksKeys.listFranchise
            ),
        },
        {
            key: menuLinksKeys.setting,
            label: getLabel(
                'Settings',
                branchFranchiesMenuLinks.setting,
                menuLinksKeys.setting
            ),
            children: childListOfSetting,
        },
        {
            key: menuLinksKeys.language,
            label: getLabel(
                'Language',
                branchFranchiesMenuLinks.language,
                menuLinksKeys.language
            ),
        },
        {
            key: menuLinksKeys.helpAndSupport,
            label: getLabel(
                'Help & Support',
                branchFranchiesMenuLinks.helpAndSupport,
                menuLinksKeys.helpAndSupport
            ),
        },
        {
            key: menuLinksKeys.customerServices,
            label: getLabel(
                'Customer Services',
                branchFranchiesMenuLinks.customerServices,
                menuLinksKeys.customerServices
            ),
        },
    ]

    useEffect(() => {
        if (location.pathname !== '/') {
            const tempSidebar = [...branchFranchiesSidebarData]
            const listWithNoDashboard = tempSidebar.filter(
                (item: any) => item.key !== 'dashboard'
            )
            const key =
                listWithNoDashboard.find((item: any) => {
                    return location.pathname.startsWith(
                        branchFranchiesMenuLinks[item.key]
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
                items={branchFranchiesSidebarData}
            />
        </NavigationMenuStyled>
    )
}

export default BranchesFranchiesNavigationMenu
