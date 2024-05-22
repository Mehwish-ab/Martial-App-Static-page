import { Menu, MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/icons/ic_logo.svg'
import { childListOfSetting } from '../Sidebar/constants'
// import { SidebarStyle } from "../Sidebar/style";
import { NavigationMenuStyled } from './styles'
import { useEffect, useState } from 'react'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
type MenuItem = Required<MenuProps>['items'][number]

const SchoolNavigationMenu = (): JSX.Element => {
    const location = useLocation()
    const navigate = useNavigate()
    const { loginData } = useSelector((state: RootState) => state)
    // const getMenuIcon = (file: any) => <img src={file} alt="" />;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigation = (link: string, key: string): void => {
        navigate(link)
    }

    const menuLinks: any = {
        dashboard: '/dashboard',
        createSchool: `/school/view/${loginData?.data?.schoolId}`,
        classes: '/class/list',
        timeTable: '/timetable/list',
        trainingRoom: `/school/room/list/${loginData.data?.schoolId}`,
        transactionsHistory: '/transaction-history/list',
        listInstructor: '/instructor/list',
        //listBranch: '/branch/list',
        // listFranchise: '/franchise/list',
        membership: '/membership/list',
        payment: '/payment',
        //  rules: '/rules/list',
        notification: '',
        wavier: '',
        setting: '/settings',
        grading: '',
        leads: '',
        belts: '',
        reports: '/reports/list',
        helpAndSupport: '/help-support',
        booking: '',
        language: '/language',
        qrCode: '/qr-code',
        students: '',
        SubAccount: '',
        // user: '/user/list',
        //  attendance: '',
    }

    const menuLinksKeys: any = {
        dashboard: 'dashboard',
        createSchool: 'createSchool',
        listBranch: 'listBranch',
        listFranchise: 'listFranchise',
        trainingRoom: 'trainingRoom',
        listInstructor: 'listInstructor',
        instructor: 'instructor',
        timeTable: 'timeTable',
        classes: 'classes',
        membership: 'membership',
        rules: 'rules',
        notification: 'notification',
        pament: 'payment',
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

    const getLabel = (
        label: string,
        link: string,
        key: string
    ): JSX.Element => (
        <div onClick={() => (link ? navigation(link, key) : '')}>{label}</div>
    )
    const sidebarData: MenuItem[] = [
        {
            key: menuLinksKeys.dashboard,
            label: getLabel(
                'Dashboard',
                menuLinks.dashboard,
                menuLinksKeys.dashboard
            ),
        },
        {
            key: menuLinksKeys.createSchool,
            label: getLabel(
                'School',
                menuLinks.createSchool,
                menuLinksKeys.createSchool
            ),
        },
        // {
        //     key: menuLinksKeys.user,
        //     label: getLabel('Users', menuLinks.user, menuLinksKeys.user),
        // },
        {
            key: menuLinksKeys.classes,
            label: getLabel(
                'Classes',
                menuLinks.classes,
                menuLinksKeys.classes
            ),
        },
        {
            key: menuLinksKeys.membership,
            label: getLabel(
                'Membership',
                menuLinks.membership,
                menuLinksKeys.membership
            ),
        },
        {
            key: menuLinksKeys.timeTable,
            label: getLabel(
                'TimeTable',
                menuLinks.timeTable,
                menuLinksKeys.timeTable
            ),
        },
        {
            key: menuLinksKeys.trainingRoom,
            label: getLabel(
                'Training Rooms',
                menuLinks.trainingRoom,
                menuLinksKeys.trainingRoom
            ),
        },

        {
            key: menuLinksKeys.listInstructor,
            label: getLabel(
                'Instructors',
                menuLinks.listInstructor,
                menuLinksKeys.listInstructor
            ),
        },
        {
            key: menuLinksKeys.subscriptionHistory,
            label: getLabel(
                'Subscription Records',
                menuLinks.subscriptionHistory,
                menuLinksKeys.subscriptionHistory
            ),
            // children: childListOfBooking,
        },
        {
            key: menuLinksKeys.transactionsHistory,
            label: getLabel(
                'Transactions History',
                menuLinks.transactionsHistory,
                menuLinksKeys.transactionsHistory
            ),
            // children: childListOfBooking,
        },
        {
            key: menuLinksKeys.payment,
            label: getLabel(
                'Payment Options',
                menuLinks.payment,
                menuLinksKeys.payment
            ),
            // children: childListOfBooking,
        },

        {
            key: menuLinksKeys.notification,
            label: getLabel(
                'Notifications',
                menuLinks.notification,
                menuLinksKeys.notification
            ),
        },
        {
            key: menuLinksKeys.waviers,
            label: getLabel(
                'Waviers',
                menuLinks.waviers,
                menuLinksKeys.waviers
            ),
        },
        {
            key: menuLinksKeys.setting,
            label: getLabel(
                'Settings',
                menuLinks.setting,
                menuLinksKeys.setting
            ),
            children: childListOfSetting,
        },
        {
            key: menuLinksKeys.grading,
            label: getLabel(
                'Gradings',
                menuLinks.grading,
                menuLinksKeys.grading
            ),
        },
        {
            key: menuLinksKeys.leads,
            label: getLabel('Leads', menuLinks.leads, menuLinksKeys.leads),
        },
        {
            key: menuLinksKeys.belts,
            label: getLabel('Belts', menuLinks.belts, menuLinksKeys.belts),
        },
        {
            key: menuLinksKeys.reports,
            label: getLabel(
                'Reports',
                menuLinks.reports,
                menuLinksKeys.reports
            ),
        },
        // {
        //     key: menuLinksKeys.attendance,
        //     label: getLabel(
        //         'Attendance ',
        //         menuLinks.attendance,
        //         menuLinksKeys.attendance
        //     ),
        // },
        {
            key: menuLinksKeys.qrCode,
            label: getLabel('QR Code', menuLinks.qrCode, menuLinksKeys.qrCode),
        },
        {
            key: menuLinksKeys.rules,
            label: getLabel('Students', menuLinks.rules, menuLinksKeys.rules),
        },
        // {
        //     key: menuLinksKeys.listBranch,
        //     label: getLabel(
        //         'Branches',
        //         menuLinks.listBranch,
        //         menuLinksKeys.listBranch
        //     ),
        // },
        // {
        //     key: menuLinksKeys.listFranchise,
        //     label: getLabel(
        //         'Franchises',
        //         menuLinks.listFranchise,
        //         menuLinksKeys.listFranchise
        //     ),
        // },

        // {
        //     key: menuLinksKeys.language,
        //     label: getLabel(
        //         'Language',
        //         menuLinks.language,
        //         menuLinksKeys.language
        //     ),
        // },
        // {
        //     key: menuLinksKeys.helpAndSupport,
        //     label: getLabel(
        //         'Help & Support',
        //         menuLinks.helpAndSupport,
        //         menuLinksKeys.helpAndSupport
        //     ),
        // },
        {
            key: menuLinksKeys.customerServices,
            label: getLabel(
                'Sub Account',
                menuLinks.customerServices,
                menuLinksKeys.customerServices
            ),
        },
    ]

    const [selectedKey, setSelectedKey] = useState('')

    useEffect(() => {
        if (location.pathname !== '/') {
            const tempSidebar = [...sidebarData]
            const listWithNoDashboard = tempSidebar.filter(
                (item: any) => item.key !== 'dashboard'
            )
            const key =
                listWithNoDashboard.find((item: any) => {
                    return location.pathname.startsWith(menuLinks[item.key])
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
                items={sidebarData}
            />
        </NavigationMenuStyled>
    )
}

export default SchoolNavigationMenu
