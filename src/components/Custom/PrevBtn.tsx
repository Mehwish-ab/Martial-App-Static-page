import { FiChevronLeft } from 'react-icons/fi'
import { PrevBtnStyle } from './style'

type prevBtnProps = {
    clicked: () => void
}
const PrevBtn: React.FC<prevBtnProps> = ({ clicked }) => {
    return (
        <PrevBtnStyle type="button" onClick={clicked}>
            <FiChevronLeft />
        </PrevBtnStyle>
    )
}

export default PrevBtn
