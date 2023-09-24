import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "antd";
import ResetPasswordStyle from "./style";
import FormControl from "../../components/FormControl";
import CustomButton from "../../components/CustomButton/CustomButton";
import { primaryColor } from "../../components/GlobalStyle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

const Index = ({ logIn }: any) => {
  const navigation = useNavigate();

  const moveToLogin = () => {
    navigation("/");
  };

  const onSubmit = (value: any) => {
    console.log(value, "value");
  };

  return (
    <Container fluid className="p-0 overflow-hidden">
      <ResetPasswordStyle>
        <Row>
          <Col md={5}>
            <div className="left-side-img" />
          </Col>
          <Col md={7}>
            <div className="right-side">
              <div className="text-center img-logo">
                <img src={ic_logo} alt="logo" />
              </div>
              <h4 className="main-heading mt-5">Reset password</h4>

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
                      <Row className="mt-2">
                        <Col md={12}>
                          <div className="password-input position-relative">
                            <FormControl
                              control="largeInput"
                              type="password"
                              name="password"
                              placeholder="Enter Password"
                              className={
                                formik.errors.email && formik.touched.email
                                  ? "is-invalid"
                                  : "customInput"
                              }
                            />
                            <h6 className="show-text position-absolute">
                              SHOW
                            </h6>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className="password-input position-relative">
                            <FormControl
                              control="largeInput"
                              type="password"
                              name="password"
                              placeholder="Enter Password"
                              className={
                                formik.errors.email && formik.touched.email
                                  ? "is-invalid"
                                  : "customInput"
                              }
                            />
                            <h6 className="show-text position-absolute">
                              SHOW
                            </h6>
                          </div>
                        </Col>

                        <div className="mt-2">
                          <CustomButton
                            bgcolor={primaryColor}
                            color="white"
                            padding="15 8"
                            width="100%"
                            type="submit"
                            title="SIGN IN"
                            fontSize="24"
                            clicked={moveToLogin}
                          />
                        </div>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
              <div className="reset-footer d-flex  justify-content-center">
                <div className="position-absolute bottom-0 d-flex">
                  <p className="policy">Terms And Conditions</p>
                  <p className="policy ms-4">Privacy Policy</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </ResetPasswordStyle>
    </Container>
  );
};

export default Index;
