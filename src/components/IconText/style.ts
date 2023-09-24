import styled from "styled-components";

const IconWithTextStyle = styled.div<any>`
  .author-bio {
    margin-top: ${(props) => props.marginTop};
    img {
      height: 18px;
      vertical-align: baseline;
    }
    .title {
      font-size: 14px;
      margin-bottom: 0;
      margin-left: 8px;
    }
  }
`;
export default IconWithTextStyle;
