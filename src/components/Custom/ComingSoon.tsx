import { Container } from 'react-bootstrap'
import placeholder from '../../assets/icons/ic_data_not found.svg'
import { ComingSoonStyle } from './style'

const ComingSoon = () => {
    return (
        <Container>
            <ComingSoonStyle className="right-side">
                <div className="inner-section">
                    <div className="center-section">
                        <img
                            src={placeholder}
                            className="right-side-placeholder"
                            alt="placeholder"
                        />
                        <h6 className="comming-soon-text">Comming Soon</h6>
                    </div>
                </div>
            </ComingSoonStyle>
        </Container>
    )
}

export default ComingSoon
