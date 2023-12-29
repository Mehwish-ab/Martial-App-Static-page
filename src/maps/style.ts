import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    pureDark2,
} from '../components/GlobalStyle'

export const PlacesAutocompleteStyle = styled.div`
    label {
        font-family: ${fontFamilyRegular};
        font-size: 16px;
        color: ${pureDark2};
        font-weight: 400;
        margin-bottom: 7px;
    }
    input {
        width: 100%;
        height: 50px;
        border-radius: 10px;
        color: ${lightDark2};
        font-family: ${fontFamilyRegular};
        font-size: 16px;
        font-weight: 400;
        padding: 12px 35px 12px 10px;
        &::placeholder {
            font-size: 16px;
            font-weight: 400;
            font-family: ${fontFamilyRegular};
            color: ${lightDark2};
        }
    }
    .PlacesAutocomplete {
        position: relative;
    }
    .PlacesAutocomplete span {
        position: absolute;
        top: 12px;
        right: 15px;
    }
`

export const AutoCompleteSuggestionsStyle = styled.div`
    width: 100%;
    label {
        font-family: ${fontFamilyMedium};
        font-size: 14px;
    }
    input {
        padding: 13px !important;
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
`
