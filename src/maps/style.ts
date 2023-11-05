import styled from "styled-components";
import {
  fontFamilyMedium,
  fontFamilyRegular,
  lightGrey2,
} from "../components/GlobalStyle";

export const PlacesAutocompleteStyle = styled.div`
  label {
    font-family: ${fontFamilyMedium};
    margin-bottom: 10px;
  }
  input {
    // border: 1px solid ${lightGrey2};
    padding: 7px;
    width: 100%;
    border-radius: 10px;
    padding: 14px !important;

    &::placeholder {
      font-family: ${fontFamilyRegular};
      color: rgb(198, 198, 200);
      font-size: 16px;
    }
  }
`;

export const AutoCompleteSuggestionsStyle = styled.div`
  width: 100%;
  label {
    font-family: ${fontFamilyMedium};
    font-size: 14px;
  }
  input {
    padding: 8px;
    border: 1px solid #efeff4;
    width: 100%;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    border-radius: 4px;
  }
  .autocomplete-suggestions {
    background-color: red; // Set the background color of the suggestions dropdown
    border-radius: 4px; // Set the border radius of the suggestions dropdown
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); // Set the box shadow of the suggestions dropdown
    font-size: 14px; // Set the font size of the suggestions dropdown
    width: 100%; // Set the width
    font-family: ${fontFamilyMedium};
  }
  .autocomplete-item {
    /* Apply your desired styling here */
    background-color: red;
    padding: 8px;
    cursor: pointer;
    /* Add any additional CSS styles to customize the appearance of autocomplete suggestions */
  }
`;
