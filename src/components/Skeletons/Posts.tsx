import { Col, Row } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

const PostsSkeleton = () => {
    return (
        <Wrapper>
            <Row>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Col sm={6} md={4} lg={3} key={index} className="property">
                        <div className="inner-container">
                            <Skeleton height={200} />
                            <Skeleton count={3} width="86%" className="mt-1" />
                        </div>
                    </Col>
                ))}
            </Row>
        </Wrapper>
    )
}

export default PostsSkeleton

const Wrapper = styled.div`
    .property {
        .inner-container {
            box-shadow: rgba(0, 0, 0, 0.07) 0px 0px 20px;
            padding: 4px 10px;
            border-radius: 7px;
        }
    }
`
