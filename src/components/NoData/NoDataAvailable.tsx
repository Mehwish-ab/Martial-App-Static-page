import NoDataAvailableStyle from './style'
import notFound from '../../assets/icons/ic_data_not found.svg'

type noDataAvailableProps = {
    title?: string
}
const NoDataAvailable = ({
    title = 'No Address Found',
}: noDataAvailableProps) => {
    return (
        <NoDataAvailableStyle>
            <article className="not-found-section d-flex flex-column justify-content-center align-items-center">
                <img src={notFound} alt="error" />
                <p className="text-center title">{title}</p>
            </article>
        </NoDataAvailableStyle>
    )
}

export default NoDataAvailable
