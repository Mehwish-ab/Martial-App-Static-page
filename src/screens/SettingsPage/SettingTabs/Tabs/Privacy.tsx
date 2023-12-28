import { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'

const Privacy = (): JSX.Element => {
    return (
        <Fragment>
            <div className="panel-heading">
                <h3>Email notifications</h3>
                <p>
                    Decide what you want to be notified about, and unsubscribe
                    from what you don&apos;t.
                </p>
            </div>
            <div>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading">
                            Email preferences
                        </h4>
                    </Col>
                    <Col md="8">
                        <h4 className="m-0 panel-body-heading">
                            adnan.ahsan21@gmail.com
                        </h4>
                        <p className="m-0 panel-body-text">
                            This is the email address you use to sign in. It’s
                            also where we send your confirmations..
                        </p>
                    </Col>
                    <Col md="2" className="text-end"></Col>
                </Row>
            </div>
        </Fragment>
    )
}
export default Privacy
