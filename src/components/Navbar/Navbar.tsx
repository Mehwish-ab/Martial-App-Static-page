import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import {
    Avatar,
    Badge,
    Button,
    Drawer,
    Dropdown,
    Input,
    InputRef,
    MenuProps,
} from 'antd'
import { MenuOutlined } from '@ant-design/icons'

import { useGlobalContext } from '../../context/context'
import AdminNavigationMenu from '../NavigationMenu/adminNavigationMenu'
import UserNavigationMenu from '../NavigationMenu/userNavigationMenu'
import SchoolNavigationMenu from '../NavigationMenu/schoolNavigationMenu'
import BranchesFranchiesNavigationMenu from '../NavigationMenu/branchesFranchiesNavmenu'
import NavbarStyle, { NavbarRow2Styled, DropDownStyling } from './style'

import CustomButton from '../CustomButton/CustomButton'

import dropDownArrow from '../../assets/icons/ic_drop_down.svg'
import searchIcon from '../../assets/icons/ic_search(1).svg'
import notificationIcon from '../../assets/icons/ic_notitfication.svg'
import profileIcon from '../../assets/icons/ic_profile_avatar.svg'
import ukIcon from '../../assets/icons/ic_uk_flag.svg'
// import cloudIcon from "../../assets/icons/ic_cloud.svg";
// import logo from "../../assets/icons/logo.svg";
// import { fontFamilyMedium, pureDark2 } from "../GlobalStyle";
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useAppSelector } from '../../app/hooks'

//import useCreateSchool from '../../hooks/useCreateSchool'
function Navbar(): JSX.Element {
    // const { selectedLanguage } = useSelector(
    //     (state: RootState) => state.selectedLanguage
    // )
    // const [defaultCountry, setDefaultCountry] = useState<string>('GB')

    // useEffect(() => {
    //     // Adjust default country based on selected language
    //     if (selectedLanguage === 'ur' || selectedLanguage === 'ar') {
    //         setDefaultCountry('AE') // Change to the appropriate ISO code
    //     } else {
    //         setDefaultCountry('GB')
    //     }
    // }, [selectedLanguage])
    const { data: loginData } = useAppSelector((state) => state.loginData)

    console.log({ loginData })

    const { searchText, setSearchText } = useGlobalContext()
    const searchRef = useRef<InputRef>(null)
    const { schoolId } = useSelector(
        (state: RootState) => state.dashboardData.schoolData
    )
    //const { deleteSchool } = useCreateSchool()
    const [drawerVisible, setDrawerVisible] = useState(false)
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to={'#'} style={{ textDecoration: 'none' }}>
                    Profile
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link
                    to={`/school/edit/${schoolId}`}
                    style={{ textDecoration: 'none' }}
                >
                    Edit
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link
                    to={`/school/add-payment-information/${schoolId}`}
                    style={{ textDecoration: 'none' }}
                >
                    Payment
                </Link>
            ),
        },
        // {
        //   key: "4",
        //   label:(deleteSchool(schoolId))
        // },
    ]

    const { data: logindata } = useAppSelector((state) => state.loginData)
    let NavigationMenu

    if (
        (logindata && logindata.userDetails.roleName === 'ADMIN ') ||
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
        <>
            <NavbarStyle>
                <Drawer
                    visible={drawerVisible}
                    placement="left"
                    onClick={() => setDrawerVisible(false)}
                    onClose={() => setDrawerVisible(false)}
                    width={300}
                >
                    {NavigationMenu}
                </Drawer>
                <div className="top-side d-flex align-items-center justify-content-between">
                    <div className="menu-toggler">
                        <Button
                            className="menu"
                            icon={<MenuOutlined />}
                            onClick={() => setDrawerVisible(true)}
                        />
                    </div>
                    <div className="navbarSearchField left-bar d-flex align-items-center justify-content-end">
                        <Input
                            ref={searchRef}
                            value={searchText}
                            placeholder="Search..."
                            onChange={(e) => setSearchText(e.target.value)}
                            suffix={
                                <img
                                    src={searchIcon}
                                    alt="search-icon"
                                    width={21}
                                    height={21}
                                />
                            }
                            className="custom-input"
                        />
                    </div>
                    <div className="right-bar d-flex  align-items-center">
                        <div className="notification-area">
                            <CustomButton
                                title=""
                                icon={
                                    <img
                                        src={notificationIcon}
                                        alt="notification"
                                        width={17}
                                        height={19}
                                    />
                                }
                                type="button"
                                bgcolor={'white'}
                                width="40px"
                                color=""
                                padding=""
                            />
                            <span className="notification-count">4</span>
                        </div>
                        <div className="profile-area">
                            <Badge
                                dot
                                color="green"
                                className="profile-area-badge"
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    top: '10px',
                                }}
                            >
                                <Avatar
                                    src={profileIcon}
                                    shape="square"
                                    style={{ width: '45px', height: '45px' }}
                                />
                            </Badge>
                            <h3 className="profileName">
                                {loginData?.userDetails.userFirstName}{' '}
                                {loginData?.userDetails.userLastName}
                            </h3>
                        </div>
                        <div className="d-flex align-items-start  ">
                            <div className="language-area">
                                <Badge>
                                    <Avatar
                                        src={ukIcon}
                                        shape="square"
                                        style={{
                                            width: '26px',
                                            height: '16px',
                                            borderRadius: '3px',
                                        }}
                                    />
                                </Badge>
                            </div>
                            <DropDownStyling>
                                <Dropdown
                                    menu={{ items }}
                                    placement="bottomLeft"
                                    arrow
                                >
                                    <Button
                                        icon={
                                            <img
                                                src={dropDownArrow}
                                                alt="dropdown"
                                                width={10}
                                                height={7}
                                                style={{ marginBottom: '4px' }}
                                            />
                                        }
                                        style={{ border: 'none' }}
                                    />
                                </Dropdown>
                            </DropDownStyling>
                        </div>
                    </div>
                </div>
                <NavbarRow2Styled>
                    <div className="d-flex align-items-center justify-content-between row2">
                        <div className="left-bar d-flex align-items-center">
                            <Input
                                ref={searchRef}
                                value={searchText}
                                placeholder="Search ..."
                                onChange={(e) => setSearchText(e.target.value)}
                                suffix={
                                    <img src={searchIcon} alt="search-icon" />
                                }
                                className="custom-input"
                            />
                        </div>
                    </div>
                </NavbarRow2Styled>
            </NavbarStyle>
        </>
    )
}

export default Navbar
