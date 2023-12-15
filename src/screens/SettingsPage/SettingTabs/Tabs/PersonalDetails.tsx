import { FC, Fragment } from "react";
import { Col, Row } from "react-bootstrap";

const PersonalDetails: FC<{}> = () => {
    return (
        <Fragment>
            <div className="panel-heading">
                <h3>Personal Details</h3>
                <p>
                    Coming Soon
                </p>
            </div>
            <div>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading">Coming Soon</h4>
                    </Col>
                    <Col md="8">
                        <p className="m-0 panel-body-text">Coming Soon</p>
                    </Col>
                    <Col md="2" className="text-end">
                        <span className="panel-body-link">
                            Coming Soon
                        </span>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};
export default PersonalDetails;