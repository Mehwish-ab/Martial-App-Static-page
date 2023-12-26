import { ActivitesStyled, SidebarStyle } from './style'

import { Layout } from 'antd'
import CustomButton from '../CustomButton/CustomButton'
import { fontFamilyMedium, pureDark, tertiaryBlue } from '../GlobalStyle'

import jujistu from '../../assets/images/Jiu_Jitsu.svg'
import wrestling from '../../assets/images/Wrestling.svg'
import karate from '../../assets/images/Karate.svg'
import yoga from '../../assets/images/Yoga.svg'
import arrowRight from '../../assets/icons/ic_arrow_right.svg'
import { auth_token_key } from '../../utils/api_urls'
import { removeLoginData } from '../../redux/features/loginDataSlice'
import { removeUserLogin } from '../../redux/features/admin/user/loginDataSlice'
import { useDispatch } from 'react-redux'
import NavigationMenu from '../NavigationMenu/NavigationMenu'
const { Sider } = Layout

const Sidebar = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        localStorage.removeItem(auth_token_key)
        dispatch(removeUserLogin())
        dispatch(removeLoginData())
        window.location.reload()
    }

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
                    <NavigationMenu />
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
