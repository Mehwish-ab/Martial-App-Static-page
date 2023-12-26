import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

const UsersSkeleton = () => {
    return (
        <Wrapper>
            <div className="d-flex align-items-center user">
                <Skeleton circle height={46} width={46} className="me-3" />
                <Skeleton count={2} containerClassName="w-100" />
            </div>
            <Skeleton height={0} className="w-100 my-2" />
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="d-flex align-items-center user">
                    <Skeleton circle height={46} width={46} className="me-3" />
                    <Skeleton count={2} containerClassName="w-100" />
                </div>
            ))}
        </Wrapper>
    )
}

export default UsersSkeleton

const Wrapper = styled.div`
    .user {
        margin-top: 12px;
    }
`
