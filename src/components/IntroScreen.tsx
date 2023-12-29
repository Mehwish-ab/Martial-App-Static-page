import styled from 'styled-components'
// import martial_logo from "../assets/icons/logo.svg";
import martial_logo from '../assets/icons/ic_logo_splash.svg'
import Loader from './Loader/Loader'

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #1f74a3;
    img {
        height: 200px;
        width: 200px;
    }
`

const IntroScreen = (): JSX.Element => {
    return (
        <Wrapper>
            <img src={martial_logo} alt="martial-logo" />
            <div className="mt-3">
                <Loader color={'#fff'} />
            </div>
        </Wrapper>
    )
}

export default IntroScreen
