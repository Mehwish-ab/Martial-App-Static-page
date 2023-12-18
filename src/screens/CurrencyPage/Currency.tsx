import { Col, Row } from "react-bootstrap";
import { CurrencyStyling } from "./style";
import UK_Flag from "../../assets/icons/ic_uk_flag.svg"
import Check from "../../assets/icons/list-style-check.png"


const Currency = () => {
    return (
        <CurrencyStyling>
            <div className="curreny">
                <h3 className="curreny-title">Select Your Currency</h3>
                <p className="curreny-text mt-20">When applicable, prices will be converted to and shown in the currency that you select. The currency you pay in may differ based on your reservation, and a service fee may also apply.</p>
                <h4 className="curreny-subtitle mt-20">Suggested for you</h4>
                <Row>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Euro</h4>
                                <p className="curreny-text m-0 text-uppercase">EUR</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">United States Dollar</h4>
                                <p className="curreny-text m-0 text-uppercase">USD</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Pound Sterling</h4>
                                <p className="curreny-text m-0 text-uppercase">GBP</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">United Arab Emirates Dirham</h4>
                                <p className="curreny-text m-0 text-uppercase">AED</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Saudi Arabian Riyal</h4>
                                <p className="curreny-text m-0 text-uppercase">SAR</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Canadian Dollar</h4>
                                <p className="curreny-text m-0 text-uppercase">CAD</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>

                </Row>


                <h4 className="curreny-subtitle mt-20">All Currencies</h4>
                <Row>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Pakistani Rupee</h4>
                                <p className="curreny-text m-0 text-uppercase">PKR</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Property Currency</h4>
                                <p className="curreny-text m-0 text-uppercase">€$£</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Argentine Peso</h4>
                                <p className="curreny-text m-0 text-uppercase">ARS</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Australian Dollar</h4>
                                <p className="curreny-text m-0 text-uppercase">AUD</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className="currency-heading">Azerbaijani Manat</h4>
                                <p className="curreny-text m-0 text-uppercase">AZN</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Bahraini Dinar</h4>
                                <p className="curreny-text m-0 text-uppercase">BHD</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Brazilian Real</h4>
                                <p className="curreny-text m-0 text-uppercase">BRL</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Bulgarian Lev</h4>
                                <p className="curreny-text m-0 text-uppercase">BGN</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Canadian Dollar</h4>
                                <p className="curreny-text m-0 text-uppercase">CAD</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Chilean Peso</h4>
                                <p className="curreny-text m-0 text-uppercase">CLP</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Chinese Yuan</h4>
                                <p className="curreny-text m-0 text-uppercase">CNY</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Colombian Peso</h4>
                                <p className="curreny-text m-0 text-uppercase">COP</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Czech Koruna</h4>
                                <p className="curreny-text m-0 text-uppercase">CZK</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Danish Krone</h4>
                                <p className="curreny-text m-0 text-uppercase">DKK</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Egyption Pound</h4>
                                <p className="curreny-text m-0 text-uppercase">EGP</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="card-mainContainer d-flex align-items-center justify-content-between ">
                            <div>
                                <h4 className="currency-heading">Euro</h4>
                                <p className="curreny-text m-0 text-uppercase">EUR</p>
                            </div>
                            <img src={Check} className="activeCheck" alt="check" width={14} height={10} />
                        </div>
                    </Col>
                </Row>
            </div>
        </CurrencyStyling>
    );
};
export default Currency;