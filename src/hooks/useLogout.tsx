import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { useGlobalContext } from '../context/context'
import { local_storage_admin_key } from '../utils/axios.utils'
import { removeLoginData } from '../redux/features/loginDataSlice'

const useLogout = () => {
    const dispatch = useAppDispatch()
    // const { setShowSidebar } = useGlobalContext();
    const navigate = useNavigate()

    // logout handler
    const logoutHandler = () => {
        localStorage.removeItem(local_storage_admin_key)
        dispatch(removeLoginData())
        // setShowSidebar(false);
        window.location.reload()
        navigate('/')
    }

    return { logoutHandler }
}

export default useLogout
