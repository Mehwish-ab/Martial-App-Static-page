import React from 'react'
import { Container } from 'react-bootstrap'
import ic_instagram from '../../assets/icons/ic_instagram.svg'
import ic_linkedin from '../../assets/icons/ic_linkedin.svg'
import ic_twitter from '../../assets/icons/ic_twitter.svg'
import ic_facebook from '../../assets/icons/ic_facebook.svg'
import { SocialFooterStyled } from './style'

const SocialFooter = (): JSX.Element => {
    return (
        <SocialFooterStyled>
            <div className="hero-footer p-4 w-100">
                <Container>
                    <span className="icon">
                        <img src={ic_facebook as string} alt="icon" />
                    </span>
                    <span className="icon">
                        {' '}
                        <img src={ic_instagram as string} alt="icon" />
                    </span>
                    <span className="icon">
                        {' '}
                        <img src={ic_linkedin as string} alt="icon" />
                    </span>
                    <span className="icon">
                        {' '}
                        <img src={ic_twitter as string} alt="icon" />
                    </span>
                </Container>
            </div>
        </SocialFooterStyled>
    )
}

export default SocialFooter
