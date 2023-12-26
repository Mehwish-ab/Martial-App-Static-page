import NoDataFoundStyle from './style'
import notFound from '../../assets/images/no_data.png'

type noDataFoundProps = {
    title?: string
}
const NoDataFound = ({ title = 'something went wrong' }: noDataFoundProps) => {
    return (
        <NoDataFoundStyle>
            <article className="not-found-section d-flex flex-column justify-content-center align-items-center">
                <img src={notFound} alt="error" />
                <p className="text-center title">{title}</p>
            </article>
        </NoDataFoundStyle>
    )
}

export default NoDataFound
