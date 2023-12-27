import videoPlayIcon from '../../assets/icons/ic_play_video.svg'
import videoPlayIconWithBg from '../../assets/icons/ic_video_play_with_bg.svg'
import videoThumbnail from '../../assets/images/Event_Image.svg'
import { SectionVideosBodyStyled } from './styesl'
import TitleWithAnchor from '../Common/Typography/TitleWithAnchor/TitleWithAnchor'
import Card from './Card'
const SectionVideos = (): JSX.Element => {
    return (
        <Card className="videos-box">
            <TitleWithAnchor title="Videos" linkLabel="View All" href="#" />

            <SectionVideosBodyStyled>
                {[1, 2, 3, 4, 5].map((item) => {
                    return (
                        <div
                            className="one-video d-flex align-items-center mt-2 mb-3"
                            key={item}
                        >
                            <div className="video-details">
                                <span className="video-heading">Jiu Jitsu</span>
                                <p className="video-description">
                                    Jiu Jitsu, also known as Brazilian Jiu-Jitsu
                                    (BJJ), is a martial art and self-defense
                                    system that focuses on ground combat and
                                    submis...
                                </p>
                                <div className="video-time d-flex gap-2 align-items-center">
                                    <img src={videoPlayIcon as string} alt="" />
                                    <span className="time">15 m 10 s</span>
                                </div>
                            </div>
                            <div className="video-thumbnail">
                                <img src={videoThumbnail as string} alt="" />
                                <img
                                    src={videoPlayIconWithBg as string}
                                    className="play-icon"
                                    alt=""
                                />
                            </div>
                        </div>
                    )
                })}
            </SectionVideosBodyStyled>
        </Card>
    )
}

export default SectionVideos
