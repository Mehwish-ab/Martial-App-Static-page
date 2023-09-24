import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import ForgetPasswordStyle from "./style";
import FormControl from "../../components/FormControl";
import CustomButton from "../../components/CustomButton/CustomButton";
import { primaryColor } from "../../components/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import ic_logo from "../../assets/icons/ic_logo.svg";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required!")
    .email("Valid email address is required"),
  password: Yup.string()
    .required("Invalid credentials. Please try again!")
    .min(6, "Minimum six character is required"),
});

const ForgetPasword = () => {
  const navigate = useNavigate();

  const moveToResetPassword = () => {
    navigate("/reset-password");
  };
  const onSubmit = (value: any) => {
    console.log(value, "value");
  };

  return (
    <Container fluid className="p-0 overflow-hidden">
      <ForgetPasswordStyle>
        <Row>
          <Col md={5}>
            <div className="left-side-img" />
          </Col>
          <Col md={7}>
            <div className="right-side d-flex flex-column justify-content-center">
              <div className="text-center img-logo">
                <img src={ic_logo} alt="logo" />
              </div>
              <h4 className="main-heading">
                <span className="d-block">Want To Be A Ennvisions</span>
                <span>Merchant? (CANADA)</span>
              </h4>
              <p className="mini-heading">
                Leave your restaurant details here and we will be in touch
                shortly.
              </p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form
                      name="basic"
                      onFinish={formik.handleSubmit}
                      autoComplete="off"
                      // validateMessages={validationSchema}
                    >
                      <Row className="login-input-fields">
                        <Col md={12}>
                          <FormControl
                            control="largeInput"
                            type="email"
                            name="email"
                            placeholder="Enter Email Address"
                            className={
                              formik.errors.email && formik.touched.email
                                ? "is-invalid"
                                : "customInput"
                            }
                          />
                        </Col>
                        <div className="mt-2">
                          <CustomButton
                            bgcolor={primaryColor}
                            color="white"
                            padding="15 8"
                            width="100%"
                            type="submit"
                            title="NEXT"
                            fontSize="24"
                            clicked={moveToResetPassword}
                          />
                        </div>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
              <div className="forget-footer d-flex  justify-content-center">
                <div className="position-absolute bottom-0 d-flex">
                  <p className="policy">Terms And Conditions</p>
                  <p className="policy ms-4">Privacy Policy</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </ForgetPasswordStyle>
    </Container>
  );
};

export default ForgetPasword;
