import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const BookingsSkeleton = () => {
  return (
    <Wrapper>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="booking">
          <div className="d-flex align-items-center booking-profile">
            <Skeleton height={46} width={46} className="me-3" />
            <Skeleton count={2} containerClassName="w-75" />
          </div>
          <Skeleton width="80%" />
          <Skeleton width="100%" />
          <Skeleton count={3} />
        </div>
      ))}
    </Wrapper>
  );
};

export default BookingsSkeleton;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 10px;
  margin-top: 16px;
  @media screen and (max-width: 1366px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .booking {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 10px;
    border-radius: 7px;
    &-profile {
    }
  }
`;
