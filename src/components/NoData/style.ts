import styled from "styled-components";

const NoDataAvailableStyle = styled.div`
  img {
    height: 180px;
    width: 150px;
  }
  .title {
    font-family: "EnnVisionsMedium";
    font-size: 18px;
  }
`;

export default NoDataAvailableStyle;

export const NoDataFoundStyle = styled.div`
  img {
    height: 180px;
    width: 150px;
  }
  .title {
    font-family: "EnnVisionsMedium";
    font-size: 18px;
  }
`;

export const NoDataModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    height: 100px;
    width: 100px;
  }
  h4 {
    color: #726565;
    font-size: 17px;
  }
`;
