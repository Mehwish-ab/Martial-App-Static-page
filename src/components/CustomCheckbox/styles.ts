import styled from "styled-components";
import { mediaDeviceMin } from "../GlobalStyle";

export const CustomCheckboxListStyled = styled.div`
  .checkboxes_row {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(1, 1fr);
  }
  .checkbox_col {
    label {
      white-space: nowrap;
      input[type="checkbox"] {
        width: 24px;
        height: 24px;
        cursor: pointer;
        border-radius: 1px;
        accent-color: #3d86af;
      }
    }
  }

  @media screen and ${mediaDeviceMin.mobileL} {
    .checkboxes_row {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and ${mediaDeviceMin.tabletL} {
    .checkboxes_row {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and ${mediaDeviceMin.laptop} {
    .checkboxes_row {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and ${mediaDeviceMin.laptopL} {
    .checkboxes_row {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  @media screen and ${mediaDeviceMin.desktop} {
    .checkboxes_row {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(8, 1fr);
    }
  }

  .invalid-activity {
    color: red;
    text-align: start;
    margin-left: 3px;
    font-size: 12px;
    letter-spacing: 1px;
  }
`;
