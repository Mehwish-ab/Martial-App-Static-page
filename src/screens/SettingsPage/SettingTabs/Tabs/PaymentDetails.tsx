import React, { FC, Fragment } from "react";
import { Col, Row } from "react-bootstrap";

const PaymentDetails: FC<{}> = () => {
    return (
        <Fragment>
            <div className="panel-heading">
                <h3>Payment Details</h3>
                <p>
                    Securely add or remove payment methods to make it easier when you book.
                </p>
            </div>
            <div>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading">Payment cards</h4>
                    </Col>
                    <Col md="8">
                        <p className="m-0 panel-body-text">Pay with new card</p>
                    </Col>
                    <Col md="2" className="text-end">
                        <span className="panel-body-link">
                            Add Card
                        </span>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};
export default PaymentDetails;