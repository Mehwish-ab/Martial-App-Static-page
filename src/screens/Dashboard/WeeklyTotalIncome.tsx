import { Card, Col, Row } from 'react-bootstrap'
import { TertiaryHeadingMini } from '../../components/GlobalStyle'
import { WeeklyTotalIncomeStyled } from './style'
import avatar from '../../assets/icons/ic_add_property_type.svg'

const WeeklyTotalIncome = (): JSX.Element => {
    const rolesAndCommissionsData = [
        {
            title: 'Admin',
            week_income: '$455',
            monthly_income: '$75000',
        },
        {
            title: 'Fleet',
            week_income: '$455',
            monthly_income: '$75000',
        },
        {
            title: 'Vendor',
            week_income: '$455',
            monthly_income: '$75000',
        },
        {
            title: 'Helper',
            week_income: '$455',
            monthly_income: '$75000',
        },
        {
            title: 'Advertiser',
            week_income: '$455',
            monthly_income: '$75000',
        },
    ]
    return (
        <WeeklyTotalIncomeStyled>
            <TertiaryHeadingMini>Weekly & Total Income</TertiaryHeadingMini>
            <div className="red-line" />
            {[1, 2, 3].map((_title, index) => (
                <Row key={index}>
                    {rolesAndCommissionsData.map(
                        ({ title, week_income, monthly_income }, ind) => (
                            <Col
                                xs={12}
                                sm={6}
                                md={3}
                                className="col-lg"
                                key={ind}
                            >
                                <Card>
                                    <Row className="d-flex align-items-center justify-content-between">
                                        <Col xs={9}>
                                            <p className="mb-2 title">
                                                {title}
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-2 sub_title">
                                                    Weekly Income
                                                </p>
                                                <p className="title mb-2">
                                                    {week_income}
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p className="sub_title">
                                                    Total Income
                                                </p>
                                                <p className="title">
                                                    {monthly_income}
                                                </p>
                                            </div>
                                        </Col>
                                        <Col xs={3}>
                                            <img
                                                style={{
                                                    width: '37px',
                                                    height: '37px',
                                                }}
                                                src={avatar as string}
                                                alt="avatar"
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        )
                    )}
                </Row>
            ))}
        </WeeklyTotalIncomeStyled>
    )
}

export default WeeklyTotalIncome
