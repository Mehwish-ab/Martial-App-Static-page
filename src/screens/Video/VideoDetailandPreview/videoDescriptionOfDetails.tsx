import React from 'react'
// import dot from '../../../assets/icons/dot.png'
import { VideoDescriptionStyled } from './styles'

const VideoDescriptionOfDetail = ({
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
                <div>
                    <p>Brighton Marina</p>
                    <p>
                        {views} . {time}
                    </p>
                </div>
            </div>
        </VideoDescriptionStyled>
    )
}

export default VideoDescriptionOfDetail
