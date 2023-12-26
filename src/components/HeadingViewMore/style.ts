import styled from 'styled-components'

type HeadingViewMore = {
    textTransform?: string
}
const HeadingViewMoreStyle = styled.div<HeadingViewMore>`
    h6 {
        text-transform: ${(props) => props.textTransform || 'unset'};
    }
`

export default HeadingViewMoreStyle
