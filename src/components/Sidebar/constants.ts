import type { MenuProps } from 'antd'
type MenuItem = Required<MenuProps>['items'][number]

export const childListOfSetting: MenuItem[] = [
    {
        key: 'sub-account',
        label: 'Sub Account',
    },
    {
        key: 'change-password',
        label: 'Change Password',
    },
    {
        key: 'delete-account',
        label: 'Delete Account',
    },
    {
        key: 'enrolled-school',
        label: 'Enrolled School',
    },
]

// export const childListOfBooking: MenuItem[] = [
//     {
//         key: 'current',
//         label: 'Current',
//     },
//     {
//         key: 'previous',
//         label: 'Previous',
//     },
// ]
