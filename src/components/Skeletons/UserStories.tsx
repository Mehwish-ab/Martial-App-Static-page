import { Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import { mediaDeviceMax } from "../GlobalStyle";

const UserStoriesSkeleton = () => {
  return (
    <Wrapper>
      <div className="stories">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} height={400} />
        ))}
      </div>
    </Wrapper>
  );
};

export default UserStoriesSkeleton;

const Wrapper = styled.div`
  .stories {
    display: grid;
    grid-gap: 6px;
    grid-template-columns: repeat(5, 1fr);
    @media ${mediaDeviceMax.tabletL} {
      grid-template-columns: repeat(4, 1fr);
    }
    @media ${mediaDeviceMax.tablet} {
      grid-template-columns: repeat(3, 1fr);
    }
    @media ${mediaDeviceMax.mobileBS} {
      grid-template-columns: repeat(2, 1fr);
    }
    @media ${mediaDeviceMax.mobileL} {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
