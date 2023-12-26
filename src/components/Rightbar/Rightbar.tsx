import { RightbarStyled } from './styesl'
import SectionVideos from './SectionVideos'
import SectionUpcomingBooking from './SectionUpcomingBooking'
import TitleWithAnchor from '../Common/Typography/TitleWithAnchor/TitleWithAnchor'
import Card from './Card'
const Rightbar = () => {
    return (
        <RightbarStyled>
            <Card className="jiu-jitsu-box">
                <TitleWithAnchor
                    title="Jiu Jitsu"
                    linkLabel="View All"
                    href="#"
                />
            </Card>
            <SectionUpcomingBooking />

            <SectionVideos />
        </RightbarStyled>
    )
}
export default Rightbar
