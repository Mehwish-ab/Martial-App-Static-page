import { Col, Container, Row } from 'react-bootstrap'
import BillSummaryStyle from './style'
import master from '../../assets/icons/ic_add_property_payment_master.svg'
import paypal from '../../assets/icons/ic_add_property_payment_paypal.svg'
import visa from '../../assets/icons/ic_add_property_payment_visa.svg'
import bitcoin from '../../assets/icons/ic_add_property_payment_bitcoin.svg'
import select from '../../assets/icons/ic_add_property_sel_payment.svg'
import unselect from '../../assets/icons/ic_add_property_payment.svg'
import plusIcon from '../../assets/icons/ic_add_property_add_card.svg'
import CustomButton from '../../components/CustomButton/CustomButton'
import { primaryColor } from '../../components/GlobalStyle'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/context'

const BillSummary = (): JSX.Element => {
    const navigate = useNavigate()
    const { createPropertyPlan, createPropertyReport } = useGlobalContext()

    const billSummaryData = [
        {
            title: 'Auto populate you home listing information',
            amount: '$50.00',
        },
        { title: 'Property Value Sales Report', amount: '$45.00' },
        { title: 'Comparable Report', amount: '$145.00' },
        { title: 'Sub-total', amount: '$18.85' },
        { title: 'Tax', amount: '$45.00' },
        { title: 'Total', amount: '$163.85' },
    ]
    const payments = [
        {
            icon: master,
            name: 'Master Card',
            number: '**** **** **** 4235',
            selection: select,
        },
        {
            icon: visa,
            name: 'Visa Card',
            number: '**** **** **** 4235',
            selection: select,
        },
        {
            icon: paypal,
            name: 'PayPal',
            number: 'ennvisisons@gmail.com',
            selection: unselect,
        },
        {
            icon: bitcoin,
            name: 'BitCoins',
            number: 'ennvisisons',
            selection: unselect,
        },
        {
            icon: bitcoin,
            name: 'BitCoins',
            number: 'ennvisisons',
            selection: unselect,
        },
    ]
    if (Object.keys(createPropertyPlan!).length == 0) {
        navigate('/create-property-plans')
    }
    if (Object.keys(createPropertyReport!).length == 0) {
        navigate('/create-property-reports')
    }
    return (
        <BillSummaryStyle>
            <div className="inner-container">
                <Container>
                    <Row>
                        <Col md={6}>
                            <div className="bill-info-side">
                                <div className="head-bar">
                                    <h6 className="head-bar-title">
                                        Billing Info
                                    </h6>
                                </div>

                                <div className="features">
                                    {billSummaryData.map(
                                        ({ title, amount }, index) => (
                                            <div
                                                key={index}
                                                className="feature d-flex justify-content-between"
                                            >
                                                <p className="feature-title mb-0">
                                                    {title}
                                                </p>
                                                <p className="feature-price mb-0">
                                                    {amount}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="checkout-btn d-flex justify-content-center pb-4 mt-3">
                                    <CustomButton
                                        bgcolor={primaryColor}
                                        color="white"
                                        padding="8px 8px"
                                        width="94%"
                                        type="submit"
                                        title="Check Out"
                                        margin="auto"
                                        fontSize="16px"
                                        clicked={() =>
                                            navigate('/property-info')
                                        }
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="p-0 p-md-auto">
                            <div className="credit-card-side mt-4 mt-md-0">
                                <div className="head-bar d-flex justify-content-between p-3">
                                    <h6 className="head-bar-title">
                                        Credit Card Info
                                    </h6>
                                    <img src={plusIcon as string} alt="plus" />
                                </div>
                                <div className="payments">
                                    {payments.map(
                                        (
                                            { icon, name, number, selection },
                                            index
                                        ) => (
                                            <div
                                                key={index}
                                                className="payments-type d-flex align-items-center align-items-center"
                                            >
                                                <img
                                                    src={icon as string}
                                                    alt="plus"
                                                />
                                                <div className="ms-3 d-flex justify-content-between w-100 align-items-center">
                                                    <div>
                                                        <h6 className="step-title mb-2">
                                                            {name}
                                                        </h6>
                                                        <p className="step-subtitle mb-0">
                                                            {number}
                                                        </p>
                                                    </div>
                                                    <img
                                                        src={
                                                            selection as string
                                                        }
                                                        alt="select"
                                                        className="select"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </BillSummaryStyle>
    )
}

export default BillSummary
