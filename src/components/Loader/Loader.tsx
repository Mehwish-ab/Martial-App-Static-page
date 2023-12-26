import PuffLoader from 'react-spinners/PuffLoader'
import LoaderStyle from './style'

const Loader = ({ color = 'rgb(138, 166, 161)' }) => {
    return (
        <LoaderStyle>
            <PuffLoader color={color} loading={true} />
        </LoaderStyle>
    )
}

export default Loader
