import NoDataFoundStyle from './style'
import notFound from '../../assets/icons/data_not_found.svg'

const NoDataFound = () => {
    return (
        <NoDataFoundStyle>
            <article className="not-found-section d-flex flex-column justify-content-center align-items-center">
                <img src={notFound} alt="error" />
            </article>
        </NoDataFoundStyle>
    )
}

export default NoDataFound
