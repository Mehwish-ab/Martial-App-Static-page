import { VideoDescriptionStyled } from './styles'

const VideoDescription = ({
    heading,
    description,
    views,
    time,
}: any): JSX.Element => {
    return (
        <VideoDescriptionStyled>
            <h4 className="heading">{heading}</h4>
            <div className="views-and-likes">
                <p className="description">{description}</p>
            </div>
        </VideoDescriptionStyled>
    )
}

export default VideoDescription
