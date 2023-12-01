import styled from "styled-components";
import { darkBlue, fontFamilyMedium, tertiaryBlue } from "../GlobalStyle";

export const SidebarStyle = styled.div`
  border-radius: 20px;
  position: relative;

  .logout-btn-container {
    width: 90%;
    margin: 150px auto 16px;

    button {
      font-size: 17px;
      font-weight: 500;
      font-family: ${fontFamilyMedium}
      background: ${tertiaryBlue};
    }
  }
`;

export const ActivitesStyled = styled.div`
  // width: 290px;
  background: white;
  border-radius: 20px;

  .row {
    widht: 85% !important;
    margin: 20px auto;
    padding: 20px 0;
  }
  h3,
  a {
    font-size: 24px;
    font-family: "EnnVisions", sans-serif;
    color: ${darkBlue};
    font-weight: 500;
  }
  a {
    font-size: 16px;
    margin-right: 20px;
    text-decoration: none;
  }
`;
