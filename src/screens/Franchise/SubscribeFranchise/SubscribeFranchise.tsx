import { SubscribeFranchiseStyled } from './styles'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
const SubscribeFranchise = (): JSX.Element => {
    const CarouselItem = (key: any): JSX.Element => {
        return (
            <div key={key} className="plan">
                <div className="plan-heading">
                    Apex Martial Arts Academy Subscription Plans
                </div>
                <div className="plan-price">
                    £30.00<span> PerMonth</span>
                </div>
                <div className="plan-description">
                    <div className="plan-description-heading">Description:</div>
                    <div className="plan-description-para">
                        This plan is designed for beginners and individuals
                        looking to explore the world of martial arts. It offers
                        access to fundamental martial arts classes and training.
                    </div>
                </div>
                <div className="plan-features">
                    <div className="plan-features-heading">Features:</div>
                    <ul className="plan-features-list">
                        <li className="plan-features-list-item">
                            Access to basic martial arts classes, such as
                            karate, taekwondo, or judo.
                        </li>
                        <li className="plan-features-list-item">
                            Weekly group training sessions.
                        </li>
                        <li className="plan-features-list-item">
                            Access to instructional videos and tutorials for
                            fundamental techniques.
                        </li>
                        <li className="plan-features-list-item">
                            Progress tracking and goal setting.
                        </li>
                        <li className="plan-features-list-item">
                            Basic martial arts uniform (gi) included.
                        </li>
                        <li className="plan-features-list-item">
                            Monthly belt testing and certification.
                        </li>
                    </ul>
                </div>
                <div className="plan-button">
                    <CustomButton
                        bgcolor={lightBlue3}
                        textTransform="Captilize"
                        color={maastrichtBlue}
                        padding="12px 100px"
                        fontFamily={`${fontFamilyMedium}`}
                        width="100%"
                        type="submit"
                        title={'Subscribe'}
                        fontSize="18px"
                    />
                </div>
            </div>
        )
    }
    const Subsrcibedata = [
        <CarouselItem key="1" />,
        <CarouselItem key="2" />,
        <CarouselItem key="3" />,
        <CarouselItem key="4" />,
        <CarouselItem key="5" />,
    ]
    return (
        <>
            <SubscribeFranchiseStyled>
                <h3>Franchise Subscription Plans</h3>
                <div className="subscriptions">
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                </div>
            </SubscribeFranchiseStyled>
            <div
                // className="pay-btn "
                style={{
                    width: '310px',
                    height: ' 50px',
                    top: ' 868px',
                    left: '1419px',
                    gap: ' 0px',
                    borderRadius: '6px 0px 0px 0px',
                    opacity: ' 0px',
                    alignSelf: 'center',
                }}
            >
                <CustomButton
                    bgcolor={lightBlue3}
                    textTransform="Captilize"
                    color={maastrichtBlue}
                    padding="11px 40.50px"
                    fontFamily={`${fontFamilyMedium}`}
                    width="fit-content"
                    type="submit"
                    title={'Pay Now'}
                    fontSize="18px"
                />
            </div>
        </>
    )
}

export default SubscribeFranchise
