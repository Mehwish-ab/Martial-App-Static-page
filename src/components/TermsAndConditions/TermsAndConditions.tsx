import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  fontFamilyMedium,
  lightGrey9,
  primaryColor,
  tertiaryGrey7,
} from "../GlobalStyle";
import FormControl from "../FormControl";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import useScreenTranslation from "../../hooks/useScreenTranslation";

type termsAndConditionsProps = {
  terms: boolean;
  setTerms: React.Dispatch<React.SetStateAction<boolean>>;
  showTermsError: boolean;
  screen: string;
};
const TermsAndConditions: React.FC<termsAndConditionsProps> = ({
  terms,
  setTerms,
  showTermsError,
  screen,
}) => {
  const { getLabelByKey } = useScreenTranslation(screen);
  return (
    <Wrapper>
      <div className="d-flex justify-content-start mt-3 gap-2">
        <span className="">
          <FormControl
            control="checkbox"
            type="checkbox"
            id="terms"
            name="terms"
            checked={terms}
            onChange={(e: CheckboxChangeEvent) => setTerms(e.target.checked)}
          />
        </span>

        <label
          htmlFor="terms"
          className="terms d-flex flex-column justify-content-center cursor-pointer"
        >
          <span>
            {getLabelByKey("legalNote")}
            <Link to="#" className="ms-1 me-1">
              {getLabelByKey("legalNoteTerm")}
            </Link>
            {getLabelByKey("legalNoteAnd")}

            <Link className="ms-1 me-1" to="#">
              {getLabelByKey("legalNotePolicy")}
            </Link>
          </span>
        </label>
      </div>
      <p className="text-danger text-center">
        {showTermsError && "Please Accept terms and conditions"}
      </p>
    </Wrapper>
  );
};

export default TermsAndConditions;

const Wrapper = styled.div`
  // width: 100%;

  .terms {
    // max-width: 390px;
    // width: 100%;
    font-size: 14px;
    span {
      font-size: 14px;
      &:first-child {
        color: ${lightGrey9};
      }
      &:last-child {
        color: ${tertiaryGrey7};
        font-size: 14px;
      }
    }
  }
  a {
    font-family: ${fontFamilyMedium};
    text-decoration: underline;
    color: ${primaryColor};
    margin: 0 2px;
    font-size: 14px;
  }
`;
