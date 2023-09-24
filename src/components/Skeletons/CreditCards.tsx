import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const CreditCardSkeleton = () => {
  return (
    <Wrapper>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <div className="d-flex align-items-center credit-card">
            <Skeleton circle height={26} width={26} className="me-3" />
            <Skeleton height={36} width={36} className="me-3" />
            <Skeleton count={2} containerClassName="w-100" />
            <Skeleton height={36} width={36} className="ms-3" />
          </div>
        </div>
      ))}
    </Wrapper>
  );
};

export default CreditCardSkeleton;

const Wrapper = styled.div`
  padding: 0 10px;
  .credit-card {
    margin-top: 12px;
  }
`;
