import { BlackDot, TertiraryHeading, UnderlineRed } from '../GlobalStyle'
import ViewMore from '../ViewMoreProperties/ViewMore'
import HeadingViewMoreStyle from './style'

type HeadingViewMoreProps = {
    title: string | null
    listing?: string
    viewMoreTask?: () => void
    bottomLines?: boolean
}

const HeadingViewMore: React.FC<HeadingViewMoreProps> = ({
    title = null,
    listing,
    viewMoreTask = () => {},
    bottomLines = true,
}) => {
    return (
        <HeadingViewMoreStyle textTransform="capitalize">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex flex-column">
                    <TertiraryHeading className="mb-0">
                        {title}
                    </TertiraryHeading>
                    {bottomLines && (
                        <div>
                            <UnderlineRed />
                            <BlackDot />
                        </div>
                    )}
                </div>
                {listing && (
                    <ViewMore listing={listing} viewMoreTask={viewMoreTask} />
                )}
            </div>
        </HeadingViewMoreStyle>
    )
}

export default HeadingViewMore
