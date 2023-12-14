import React, { FC, Fragment } from "react";
import { Col, Row } from "react-bootstrap";

const EmailNotification: FC<{}> = () => {
    return (
        <Fragment>
            <div className="panel-heading">
                <h3>Email Notification</h3>
                <p>
                    Coming Soon
                </p>
            </div>
            <div>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading"></h4>
                    </Col>
                    <Col md="8">
                        <p className="m-0 panel-body-text"></p>
                    </Col>
                    <Col md="2" className="text-end">
                        <span className="panel-body-link">

                        </span>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};
export default EmailNotification;