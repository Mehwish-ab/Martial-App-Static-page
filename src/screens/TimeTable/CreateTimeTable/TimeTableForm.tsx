import React from "react";
import { useNavigate } from "react-router-dom";
import useScreenTranslation from "../../../hooks/useScreenTranslation";
import FormControl from "../../../components/FormControl";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";

import DateCalander from "../../../assets/images/dateCalander.svg";
import {
    fontFamilyMedium,
} from "../../../components/GlobalStyle";
import { FilterTimeTableStyled } from "./styles";
import LoadingOverlay from "../../../components/Modal/LoadingOverlay";
import { RootState } from "../../../redux/store";
// import { FormControl } from "react-bootstrap";

const TimeTableForm: React.FC = () => {
    const { getLabelByKey } = useScreenTranslation("listTimeTable");

    const navigate = useNavigate();

    const { loading } = useSelector(
        (state: RootState) => state.timeTableData
    );

    return (
        <>
            {loading && <LoadingOverlay message="" />}
            <FilterTimeTableStyled>
                <h3 className="timetable-heading">Time Table</h3 >
                <Row>
                    <Col md="4">
                        <FormControl
                            control="input"
                            type="text"
                            name="title"
                            label="Title"
                            padding="10px"
                            fontFamily={fontFamilyMedium}
                            fontSize="16px"
                            max={6}
                            placeholder="Enter Title Name"
                        />
                    </Col>
                    <Col md="8">
                        <Row>
                            <Col md="4">
                                <FormControl
                                    control="select"
                                    type="text"
                                    name="repeattimetable"
                                    label="Repeat Time Table"
                                    padding="7px"
                                    fontFamily={fontFamilyMedium}
                                    fontSize="16px"
                                    max={6}
                                    placeholder="Yes"
                                />
                            </Col>
                            <Col md="4">
                                <FormControl
                                    control="input"
                                    type="text"
                                    name="repeattimetable"
                                    label="Start Date"
                                    padding="7px"
                                    fontFamily={fontFamilyMedium}
                                    fontSize="16px"
                                    suffix={<img src={DateCalander} alt="" style={{ width: "23px", height: "23px" }} />}
                                    placeholder="Monday, October 27, 2023"
                                />
                            </Col>
                            <Col md="4">
                                <FormControl
                                    control="input"
                                    type="text"
                                    name="repeattimetable"
                                    label="End Date"
                                    padding="7px"
                                    fontFamily={fontFamilyMedium}
                                    fontSize="16px"
                                    suffix={<img src={DateCalander} alt="" style={{ width: "23px", height: "23px" }} />}
                                    placeholder="Monday, October 27, 2023"
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </FilterTimeTableStyled>

        </>
    );
};

export default TimeTableForm;

