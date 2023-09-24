import styled from "styled-components";
import { lightGrey4, secondaryDark3 } from "../GlobalStyle";

const SidebarStyle = styled.div`
  width: 250px;
  background-color: ${secondaryDark3};
  height: 93vh;
  position: fixed;
  padding: 20px;
  overflow-y: auto;
  z-index: 20;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .expand-menu {
    transition: all 1s ease-out;
    transform-origin: top;
  }
  p {
    color: ${lightGrey4};
    margin: 0;
    cursor: pointer;
  }
  .inner-container {
    img {
      cursor: pointer;
    }
  }
`;

export default SidebarStyle;
