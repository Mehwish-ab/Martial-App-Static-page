import DashboardSectionStyle from './style'
import arrowRight from '../../assets/icons/ic_blog_detail_arrow.svg'

type dashboardSectionProps = {
    onClick: () => void
    title: string
    subtitle: string
}
const DashboardSection: React.FC<dashboardSectionProps> = ({
    onClick,
    title,
    subtitle,
}) => {
    return (
        <DashboardSectionStyle onClick={onClick} className="cursor-pointer">
            <div className="d-flex justify-content-between">
                <h6 className="title">{title}</h6>
                <img
                    className="mb-2 cursor-pointer"
                    src={arrowRight}
                    alt="arrow-right"
                />
            </div>
            <p className="subtitle mb-0">{subtitle}</p>
        </DashboardSectionStyle>
    )
}

export default DashboardSection
