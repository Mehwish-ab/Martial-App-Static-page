import React from 'react'

import { MenuOutlined } from '@ant-design/icons'
import Dropdown from 'react-bootstrap/Dropdown'

import { NavbarContainer } from './style'
import logo from '../../../assets/icons/ic_logo.svg'
import {
    FlexContainer,
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark2,
} from '../../GlobalStyle'

import { useNavigate, useLocation } from 'react-router-dom'
import CustomButton from '../../CustomButton/CustomButton'
import useScreenTranslation from '../../../hooks/useScreenTranslation'

const AppNavbar = (): JSX.Element => {
    const navigate = useNavigate()
    const location = useLocation()
    const { getLabelByKey } = useScreenTranslation('welcomeScreen')

    const isHomePage = location.pathname === '/'
    const isVideosPage = location.pathname === '/videos'

    const NAVBAR_ITEMS = [
        { id: 2, label: 'School', link: '/login' },
        { id: 1, label: 'Technology', link: '/videos' },
        { id: 3, label: 'Academies & Trainers' },
        { id: 4, label: 'Digital Learning' },
    ]

    const navbarLinks = NAVBAR_ITEMS.map(
        (item): JSX.Element => (
            <div
                className="app-nav-link cursor-pointer"
                key={item.id}
                onClick={() => navigate(`${item.link}`)}
            >
                {item.label}
            </div>
        )
    )

    return (
        <NavbarContainer>
            <FlexContainer className="container app-navbar-container py-2 px-0 justify-content-between">
                <FlexContainer
                    className="app-logo gap-3 cursor-pointer justify-content-start"
                    onClick={() => navigate('/')}
                >
                    <img src={logo} alt="" />
                </FlexContainer>
                <div className="app-navbar gap-4 d-lg-flex d-none">
                    {navbarLinks}
                </div>

                <div className="d-flex justify-content-between">
                    <div
                        className=" loginBtn"
                        style={{
                            background:
                                'linear-gradient(270deg, #33AFE5 0%, #63C6EF 100%)',
                            fontFamily: fontFamilyMedium,
                            textTransform: 'capitalize',
                            padding: '10px',
                            alignContent: 'center',
                            width: 'auto',
                        }}
                    >
                        <button
                            style={{ background: 'none' }}
                            type="submit"
                            title="Login"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </button>
                        <span className="separator">|</span>
                        <button
                            style={{ background: 'none' }}
                            type="submit"
                            title="Login"
                            onClick={() => navigate('/login')}
                        >
                            {' '}
                            Login
                        </button>
                    </div>
                </div>
                <Dropdown className="d-lg-none d-block">
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                        <MenuOutlined />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="ps-3">
                        {NAVBAR_ITEMS.map((item) => (
                            <Dropdown.Item
                                key={item.id}
                                // onClick={() => handleClick(item)}
                            >
                                {item.label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </FlexContainer>
        </NavbarContainer>
    )
}

// const AppNavbar = ({ scrollToSection }) => {
//   const navigate = useNavigate();
//   const NAVBAR_ITEMS = [
//     { id: 7, label: "Home", ref: "homepage" },
//     { id: 1, label: "Curriculum", ref: "curriculumSection" },
//     { id: 3, label: "Time Table", ref: "timeTableSection" },
//     { id: 4, label: "Membership", ref: "membershipSection" },
//     { id: 6, label: "Contact Us", ref: "contactUsSection" },
//   ];

//   const handleClick = () => {};

//   const navbarLinks = NAVBAR_ITEMS.map((item) => (
//     <div
//       className="app-nav-link cursor-pointer "
//       key={item.id}
//       onClick={() => scrollToSection(item.ref)}
//     >
//       {item.label}
//     </div>
//   ));

//   return (
//     <NavbarContainer>
//       <FlexContainer
//         className="container app-navbar-container py-2 px-0"
//         justifycontent="space-between"
//       >
//         <FlexContainer
//           className="app-logo gap-3 cursor-pointer"
//           onClick={() => navigate("/")}
//           justifycontent="space-between"
//         >
//           <img src={logo} alt="" />
//           <h4 className="brand_text">Brighton Marina Jiu Jitsu Academy</h4>
//         </FlexContainer>

//         <div className="app-navbar gap-4 d-lg-flex d-none">{navbarLinks}</div>
//         <button
//           //className="app-nav-link cursor-pointer"
//           onClick={handleClick}
//           style={{ padding: "10px 20px", borderRadius: "10px",  background:'none',fontFamily:fontFamilyRegular}}
//         >
//           Call To Book <br />{" "}
//           <span style={{ fontFamily: fontFamilyMedium }}>07846997004</span>
//         </button>

//         <Dropdown className="d-lg-none d-block">
//           <Dropdown.Toggle variant="" id="dropdown-basic">
//             <MenuOutlined />
//           </Dropdown.Toggle>

//           <Dropdown.Menu className="ps-3">{navbarLinks}</Dropdown.Menu>
//         </Dropdown>
//       </FlexContainer>
//     </NavbarContainer>
//   );
// };

export default AppNavbar
