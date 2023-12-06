import { Card } from "antd";
import OverlayImages from "../../Home/OverlayImages/OverlayImages";
import { ViewInstructorStyled } from "./styles";
import { useLocation } from "react-router-dom";
import { BranchDataType } from "../../../redux/features/branch/branchSlice";
// import useScreenTranslation from "../../../hooks/useScreenTranslation";
import { Col, Row } from "react-bootstrap";
import { Field, Formik } from "formik";
import { useState, useEffect } from "react";
import FormControl from "../../../components/FormControl";




const ViewInstructor = () => {
  // const { getLabelByKey } = useScreenTranslation("branchCreate");
  const [initialValues, setInitialValues] = useState({
    termCondition: false, agreement: false, liability: false
  });

  const location = useLocation();
  const branch: BranchDataType = location.state?.branch;


  useEffect(() => {

    // TODO: this state will be set after getting response from api
    setInitialValues({
      termCondition: false, agreement: false, liability: false
    });
    return () => {
      setInitialValues({
        termCondition: false, agreement: false, liability: false
      });
    };
  }, []);



  return (
    <ViewInstructorStyled>
      <OverlayImages
        overlayImg={branch?.profilePicture || ""}
        backgroundImg={branch?.bannerPicture || ""}
        isEditable={true}
      />

      <h3 className="ms-4">Instructor Information</h3>
      <Card>
        <Row>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                Instructor Name
              </div>
              <div className="list-item-value">O’Neil Mclean</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                Email Address
              </div>
              <div className="list-item-value">mclean@kaimeramedia.com</div>
            </div>
          </Col>
          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">
                Instructor Mobile Number
              </div>
              <div className="list-item-value">
                +41 7911 123456
              </div>
            </div>
          </Col>

          <Col md="4">
            <div className="list-item">
              <div className="list-item-title">Address</div>
              <div className="list-item-value">7250 Keele St, Vaughan, ON L4K 1Z8, Canada</div>
            </div>
          </Col>
          <Col md="8">
            <Row>
              <Col md="4">
                <div className="list-item">
                  <div className="list-item-title">Years of experience</div>
                  <div className="list-item-value">
                    Monday, 17th October 2023.
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="list-item">
                  <div className="list-item-title">
                    Ranking
                  </div>
                  <div className="list-item-value">
                    Yes
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="list-item">
                  <div className="list-item-title">
                    Latest Certification (Optional)
                  </div>
                  <div className="list-item-value">
                    certification.png
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <div className="list-item">
              <div className="list-item-title">Specializations</div>
              <div className="list-item-value">Jiu Jitsu, Karate, Judo, Krav Maga, Taekwondo</div>
            </div>
          </Col>
          <Col md="6">
            <div className="list-item">
              <div className="list-item-title">
                Activities (to Instruct Within)
              </div>
              <div className="list-item-value">Jiu Jitsu, Karate, Judo,</div>
            </div>
          </Col>
          <Col md="12">
            <div className="list-item mb-0">
              <div className="list-item-title">
                Description
              </div>
              <div className="list-item-value">
                Judo: a relatively modern Japanese martial art (created in 1882). The goal of judo is to either throw or takedown one’s opponent to the ground and immobilize or subdue them with a grappling maneuver, joint lock, strangle hold, or choke. Strikes and thrusts by hands and feet or weapons are only allowed in pre-arranged forms (kata), and are not allowed in competition or free practice.
                Jiu Jitsu (Jujitsu, Jujutsu): a Japanese martial art for defeating an armed and armored opponent in which one uses no weapon, or only a short weapon. Practitioners neutralize an enemy with pins, joint locks, and throws by using an attacker’s energy against him, rather than directly opposing it (as with other martial arts such as karate). There are five main areas or arts of training: blocking, fulcrum throw, non-fulcrum throw, escaping, and striking.
              </div>
            </div>
          </Col>
        </Row>
        <Formik initialValues={initialValues} onSubmit={() => { console.log("") }}>
          <div className="d-flex flex-column">
            <label htmlFor="termCondition">
              <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                <FormControl
                  control="checkbox"
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked
                />
                <p className="checkBoxPara" id="termCondition">Terms and conditions</p>
              </form>
            </label>
            <label htmlFor="agreement">
              <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                <FormControl
                  control="checkbox"
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked
                />
                <p className="checkBoxPara" id="agreement">Agreement to follow the app's guidelines and policies</p>
              </form>
            </label>
            <label htmlFor="liability">
              <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                <FormControl
                  control="checkbox"
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked
                />
                <p className="checkBoxPara" id="liability">Liability waivers</p>
              </form>
            </label>
          </div>
        </Formik>
      </Card>
    </ViewInstructorStyled>
  );
};

export default ViewInstructor;
