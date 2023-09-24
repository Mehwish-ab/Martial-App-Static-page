import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const NewsfeedSkeleton = () => {
  return (
    <Wrapper>
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index}>
          <div className="d-flex align-items-center newsfeed">
            <Skeleton height={46} width={46} className="me-3" />
            <Skeleton count={2} containerClassName="w-100" />
          </div>
          <Skeleton height={400} className="w-100 my-2" />
        </div>
      ))}
    </Wrapper>
  );
};

export default NewsfeedSkeleton;

const Wrapper = styled.div`
  .newsfeed {
    margin-top: 12px;
  }
`;
