import { SidebarStyle } from './style'

import { Layout } from 'antd'
import CustomButton from '../CustomButton/CustomButton'
import { fontFamilyMedium, pureDark, tertiaryBlue } from '../GlobalStyle'

import { auth_token_key } from '../../utils/api_urls'
import { removeLoginData } from '../../redux/features/loginDataSlice'
import { removeUserLogin } from '../../redux/features/admin/user/loginDataSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../app/hooks'
import AdminNavigationMenu from '../NavigationMenu/adminNavigationMenu'
import UserNavigationMenu from '../NavigationMenu/userNavigationMenu'
import SchoolNavigationMenu from '../NavigationMenu/schoolNavigationMenu'
import BranchesFranchiesNavigationMenu from '../NavigationMenu/branchesFranchiesNavmenu'
import { useParams } from 'react-router-dom'
import InstructorNavigationMenu from '../NavigationMenu/instructorNavigationMenu'
const { Sider } = Layout

const Sidebar = (): JSX.Element => {
    const dispatch = useDispatch()
    const logoutHandler = (): void => {
        localStorage.removeItem(auth_token_key)
        dispatch(removeUserLogin())
        dispatch(removeLoginData())
        window.location.reload()
    }
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
    } else if (logindata && logindata.userDetails.roleName === 'INSTRUCTOR') {
        NavigationMenu = <InstructorNavigationMenu />
    }
    console.log('naviigation menu', NavigationMenu)

    return (
        <Sider
            breakpoint="lg"
            theme="light"
            trigger={null}
            collapsedWidth="0"
            width={'280px'}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 10,
            }}
        >
            <SidebarStyle>
                <div
                    style={{
                        background: 'white',
                        borderRadius: 20,
                        paddingBottom: 16,
                        paddingTop: 9,
                    }}
                >
                    {NavigationMenu}
                    <div className="logout-btn-container">
                        <CustomButton
                            bgcolor={tertiaryBlue}
                            textTransform="Captilize"
                            color={pureDark}
                            padding="8px"
                            fontFamily={`${fontFamilyMedium}`}
                            width="100%"
                            type="submit"
                            title={'Logout'}
                            fontSize="16px"
                            clicked={logoutHandler}
                        />
                    </div>
                </div>

                {/* <ActivitesStyled>
          <div className="row">
            <div className="col-md-6">
              <h3>Activities</h3>
            </div>
            <div className="col-md-6 text-end">
              <a href="#">View All</a>
              <img src={arrowRight} alt="" />
            </div>
            <div className="col-md-6 mb-3 pe-0">
              <img src={jujistu} alt="" />
            </div>
            <div className="col-md-6 mb-3 ">
              <img src={wrestling} alt="" />
            </div>
            <div className="col-md-6 pe-0">
              <img src={karate} alt="" />
            </div>
            <div className="col-md-6 ">
              <img src={yoga} alt="" />
            </div>
          </div>
        </ActivitesStyled> */}
            </SidebarStyle>
        </Sider>
    )
}

export default Sidebar
