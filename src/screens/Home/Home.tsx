import ViewSchool from '../CreateSchool/ViewSchool/ViewSchool'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import CreateSchool from '../CreateSchool/CreateSchool'
import { useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import ListSchool from '../CreateSchool/ListSchool/ListSchool'
import { Dashboard } from '../pages'
// import Profile from './Profile/Profile'
const Home = (): JSX.Element => {
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    const { data: logindata } = useAppSelector((state) => state.loginData)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('>>im Home page')
        console.log('NAda', logindata?.userDetails.roleName)
    }, [])

    const localStorageData = localStorage.getItem('ennvision-admin:token')
    const loginData = JSON.parse(localStorageData as any)
    console.log('b', loginData)

    if (logindata?.userDetails.roleName === 'ADMIN') {
        {
            //navigate('/school/list')
            return <Dashboard />
        }
    } else {
        navigate('/')
        return <Dashboard />
    }
}
export default Home
