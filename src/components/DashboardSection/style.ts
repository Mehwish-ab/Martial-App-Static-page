import styled from 'styled-components'
import { fontFamilyMedium, secondaryDark4 } from '../GlobalStyle'

export const DashboardSectionStyle = styled.div`
    .title {
        font-size: 18px;
        font-family: ${fontFamilyMedium};
    }
    .subtitle {
        font-size: 15px;
        color: ${secondaryDark4};
        font-family: ${fontFamilyMedium};
    }
`

export default DashboardSectionStyle
