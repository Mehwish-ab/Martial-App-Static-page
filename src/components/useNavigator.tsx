import { useNavigate } from 'react-router-dom'

const useNavigator = ({ path }: any) => {
    const navigate = useNavigate()

    return navigate(path)
}
export default useNavigator
