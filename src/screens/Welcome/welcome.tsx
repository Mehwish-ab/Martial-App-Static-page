import { useNavigate } from 'react-router-dom'
import CustomButton from '../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    lightBlue3,
    pureDark2,
} from '../../components/GlobalStyle'
import WelcomeStyle from './style'
import Logo from '../../assets/icons/ic_logo.svg'
import Head from '../../components/Head/Head'
import useScreenTranslation from '../../hooks/useScreenTranslation'
import logo from '../../assets/images/welcomeLogo.png'
import welcome from '../../assets/images/welcome.png'
import Navbar from '../../components/Navbar/Navbar'
import { Layout } from 'antd'
const { Header, Content } = Layout
// initial values types

const Login = (): JSX.Element => {
    const navigate = useNavigate()
    const { getLabelByKey } = useScreenTranslation('welcomeScreen')

    // validations from redux appData

    return (
        <>
            <Head title="Welcome" />
            <Layout className="content-left-width">
                <Header
                    style={{
                        padding: '16px',
                        background: 'white',
                        marginBottom: 20,
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        // height: 90,
                    }}
                    className="navbar-styles"
                >
                    <Navbar />
                    {/* <NavbarSmallScreen /> */}
                </Header>
                <WelcomeStyle>
                    <div className="login-container overflow-auto">
                        <div className="login-container-card">
                            <div className="logo text-center">
                                <img src={logo} alt="logo" />
                            </div>
                            <div className="divider"></div>
                            <h6 className="text-center title">
                                {getLabelByKey('title')}
                            </h6>
                            <p className="subtitle text-center">
                                {getLabelByKey('subtitle')}
                            </p>
                            <div className="welcome">
                                <img src={welcome} alt="welcome" />
                            </div>
                            <div className="login-container-card-inner">
                                <div className="mt-20 loginBtn">
                                    <CustomButton
                                        bgcolor={lightBlue3}
                                        textTransform="Captilize"
                                        color={pureDark2}
                                        padding="16.5px"
                                        fontFamily={fontFamilyMedium}
                                        width="100%"
                                        type="submit"
                                        title={getLabelByKey('button')}
                                        fontSize="16px"
                                        clicked={() => navigate('/dashboard')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </WelcomeStyle>
            </Layout>
        </>
    )
}

export default Login
