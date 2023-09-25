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
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

type termsAndConditionsProps = {
  terms: boolean;
  setTerms: React.Dispatch<React.SetStateAction<boolean>>;
  showTermsError: boolean;
};
const TermsAndConditions: React.FC<termsAndConditionsProps> = ({
  terms,
  setTerms,
  showTermsError,
}) => {
  return (
    <Wrapper>
      <div className="d-flex justify-content-start mt-3">
        <span className="me-2">
          <FormControl
            control='checkbox'
            type="checkbox"
            id="terms"
            name="terms"
            checked={terms}
            onChange={(e:CheckboxChangeEvent) => setTerms(e.target.checked)}
          />
          
        </span>

        <label
          htmlFor="terms"
          className="terms d-flex flex-column justify-content-center cursor-pointer"
        >
          <span>
            Agree to Martial App's
            <Link to="#" className="me-1">
              Terms of Use.
            </Link>
            &
            <Link className="ms-1" to="#">
              Privacy Policy.
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
  width: 96%;

  .terms {
    max-width: 390px;
    width: 98%;
    font-size: 16px;
    span {
      font-size: 16px;
      &:first-child {
        color: ${lightGrey9};
      }
      &:last-child {
        color: ${tertiaryGrey7};
        font-size: 16px;
      }
    }
  }
  a {
    font-family: ${fontFamilyMedium};
    text-decoration: underline;
    color: ${primaryColor};
    margin: 0 2px;
  }
`;
