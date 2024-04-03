import { NavbarSmallScreenStyled } from './style'

import logo from '../../assets/icons/ic_logo.svg'
import { Avatar, Badge, Button, Drawer } from 'antd'
import { useState } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import CustomButton from '../CustomButton/CustomButton'
import notificationIcon from '../../assets/icons/ic_notitfication.svg'
import profileIcon from '../../assets/icons/ic_profile_avatar.svg'
import { useAppSelector } from '../../app/hooks'
import AdminNavigationMenu from '../NavigationMenu/adminNavigationMenu'
import UserNavigationMenu from '../NavigationMenu/userNavigationMenu'
import SchoolNavigationMenu from '../NavigationMenu/schoolNavigationMenu'
import BranchesFranchiesNavigationMenu from '../NavigationMenu/branchesFranchiesNavmenu'

const NavbarSmallScreen = (): JSX.Element => {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const { data: logindata } = useAppSelector((state) => state.loginData)
    let NavigationMenu

    if (
        (logindata && logindata.userDetails.roleName === 'ADMIN') ||
        logindata?.userDetails.roleName === 'SUPER_ADMIN'
    ) {
        NavigationMenu = <AdminNavigationMenu />
    } else if (logindata && logindata.userDetails.roleName === 'USER') {
        NavigationMenu = <UserNavigationMenu />
    } else if (logindata && logindata.userDetails.roleName === 'SCHOOL') {
        NavigationMenu = <SchoolNavigationMenu />
    } else if (
        (logindata && logindata.userDetails.roleName === 'BRANCH') ||
        logindata?.userDetails.roleName === 'FRANCHIES'
    ) {
        NavigationMenu = <BranchesFranchiesNavigationMenu />
    }
    console.log('naviigation menu', NavigationMenu)

    return (
        <NavbarSmallScreenStyled>
            <div className="d-flex justify-content-between align-items-center">
                <Drawer
                    visible={drawerVisible}
                    placement="right"
                    onClick={() => setDrawerVisible(false)}
                    onClose={() => setDrawerVisible(false)}
                    width={300}
                >
                    {NavigationMenu}
                </Drawer>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="notification-area">
                    <CustomButton
                        title=""
                        icon={
                            <img src={notificationIcon} alt="notification " />
                        }
                        type="button"
                        bgcolor={'white'}
                        width="50px"
                        color=""
                        padding=""
                    />
                    <span className="notification-count">4</span>
                </div>
                <div className="profile-area">
                    <Badge dot color="green">
                        <Avatar size={50} src={profileIcon} shape="square" />
                    </Badge>
                </div>
                <div className="menu-toggler">
                    <Button
                        className="menu"
                        icon={<MenuOutlined />}
                        onClick={() => setDrawerVisible(true)}
                    />
                </div>
            </div>
        </NavbarSmallScreenStyled>
    )
}

export default NavbarSmallScreen
