import styled from "styled-components";

type CustomFileInputStyleProps = {
  labelFamily: string;
  labelFont: string;
};
const CustomFileInputStyle = styled.div<CustomFileInputStyleProps>`
  label {
    font-family: ${(props) => props.labelFamily};
    font-size: ${(props) => props.labelFont};
  }
`;
export default CustomFileInputStyle;

export const CustomizedFileInputStyle = styled.div`
  .upload-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
    &-item {
      color: gray;
      background-color: white;
      padding: 8px 20px;
      border-radius: 7px;
      font-size: 20px;
      font-weight: bold;
    }

    input[type="file"] {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
`;
