import React, { useEffect, useMemo } from 'react'
import { VideoDetailsStyled } from './styles'
import { Container } from 'react-bootstrap'
import { SmallHeadingBlack } from '../../../components/GlobalStyle'
import { useNavigate, useParams } from 'react-router-dom'
import VideoDescriptionOfDetail from './videoDescriptionOfDetails'
import useVideo from '../../../hooks/useVideo'
import ReactPlayer from 'react-player'

const VideoCard = ({ img, title, id }: any): JSX.Element => {
    const navigate = useNavigate()
    return (
        <div
            className="video-card d-flex align-items-center justify-content-start"
            onClick={() => navigate(`/video-detail/${id}`)}
        >
            <div className="image">
                <img src={`https://fistastore.com:444${img}`} />
            </div>
            <VideoDescriptionOfDetail
                heading={title}
                views={'3.5M'}
                time={'1 year ago'}
            />
        </div>
    )
}

const VideoDetails = (): JSX.Element => {
    const { id } = useParams()
    const { getAllVideos, AllVideos } = useVideo()

    console.log({ id })

    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            try {
                await getAllVideos()
            } catch (errors) {
                /// setError('Error fetching data')
            } finally {
                //  setLoading(false)
            }
        }
        fetchData()
    }, [id])

    const videoData = useMemo(() => {
        return AllVideos.find((v: any) => v.videoId === Number(id))
    }, [AllVideos])

    console.log({ videoData })
    const stripHtmlTags = (html: any): any => {
        const tmp = document.createElement('DIV')
        tmp.innerHTML = html
        return tmp.textContent || tmp.innerText || ''
    }

    const descriptionPlainText = stripHtmlTags(videoData?.description)

    return (
        <VideoDetailsStyled>
            <Container>
                <div className="d-flex flex-wrap gap-3">
                    <div className="video-details-section">
                        <div className="video-container">
                            <ReactPlayer
                                width="100%"
                                height="100%"
                                url={videoData?.videoURL}
                            />
                        </div>
                        <div className="title my-3">
                            <SmallHeadingBlack style={{ fontSize: '24px' }}>
                                {videoData?.title}
                            </SmallHeadingBlack>
                        </div>
                        <div className="details">{descriptionPlainText}</div>
                    </div>

                    <div className="videos-section d-flex flex-column gap-3">
                        {AllVideos?.map((item: any) => (
                            <VideoCard
                                key={item.videoId}
                                id={item.videoId}
                                img={item.thumbImageURL}
                                title={item.title}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </VideoDetailsStyled>
    )
}

export default VideoDetails
