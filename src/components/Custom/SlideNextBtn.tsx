import { FiChevronRight } from 'react-icons/fi'
import styled from 'styled-components'

const Wrapper = styled.button`
    border-radius: 50%;
    top: 50%;
    right: 3%;
    height: 26px;
    width: 26px;
    font-size: 42px;
    position: absolute;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.3);
    color: black;
    display: grid;
    place-items: center;
    border-color: transparent;
    cursor: pointer;
    transition: all 0.3s linear;

    svg {
        font-size: 24px;
    }
    &:hover {
        background: rgba(255, 255, 255, 1);
    }
`

type slideNextBtnProps = {
    clicked: () => void
}
const SlideNextBtn: React.FC<slideNextBtnProps> = ({ clicked }) => {
    return (
        <Wrapper type="button" onClick={clicked}>
            <FiChevronRight />
        </Wrapper>
    )
}

export default SlideNextBtn
