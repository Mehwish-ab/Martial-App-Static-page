import { Card, Col, Row } from "react-bootstrap";
import { TertiaryHeadingMini } from "../../components/GlobalStyle";
import { RoleAndCommisionsSytled } from "./style";
import avatar from "../../assets/icons/ic_placehoher.svg";

const RoleAndCommisions = () => {
  const rolesAndCommissionsData = [
    {
      title: "Admin",
      sub_title: "Our Commissions",
    },
    {
      title: "Helper",
      sub_title: "Our Commissions",
    },
    {
      title: "Fleet",
      sub_title: "Our Commissions",
    },
    {
      title: "Vendor",
      sub_title: "Our Commissions",
    },
    {
      title: "Helper",
      sub_title: "Our Commissions",
    },
  ];
  return (
    <RoleAndCommisionsSytled>
      <TertiaryHeadingMini>User Roles & Commissions</TertiaryHeadingMini>
      {[1, 2, 3].map((title, index) => (
        <Row key={index}>
          {rolesAndCommissionsData.map(({ title, sub_title }, index) => (
            <Col xs={12} sm={6} md={3} className="col-lg" key={index}>
              <Card>
                <Row className="d-flex align-items-center justify-content-between">
                  <Col xs={9}>
                    <div className="d-flex justify-content-between">
                      <p className="title mb-2">{title}</p>
                      <p className="title  mb-2">20</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>{sub_title}</p>
                      <p>20%</p>
                    </div>
                  </Col>
                  <Col xs={3}>
                    <img
                      src={avatar}
                      alt="avatar"
                      style={{
                        width: "37px",
                        height: "37px",
                      }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </RoleAndCommisionsSytled>
  );
};

export default RoleAndCommisions;
