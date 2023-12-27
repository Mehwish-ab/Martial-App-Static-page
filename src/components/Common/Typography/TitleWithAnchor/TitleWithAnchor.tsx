import { TitleWithAnchorStyled } from './styles'

type TitleWithAnchorProps = {
    title: string
    href: string
    linkLabel: string
}
const TitleWithAnchor = ({
    title,
    href,
    linkLabel,
}: TitleWithAnchorProps): JSX.Element => {
    return (
        <TitleWithAnchorStyled>
            <div className="d-flex justify-content-between ">
                <h3>{title}</h3>
                <div className="view-btn">
                    <a href={href}>{linkLabel}</a>
                </div>
            </div>
        </TitleWithAnchorStyled>
    )
}

export default TitleWithAnchor
