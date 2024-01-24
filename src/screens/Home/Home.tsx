import ViewSchool from '../CreateSchool/ViewSchool/ViewSchool'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import CreateSchool from '../CreateSchool/CreateSchool'
// import Profile from './Profile/Profile'
const Home = (): JSX.Element => {
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    const localStorageData = localStorage.getItem('ennvision-admin:token')
    const loginData = JSON.parse(localStorageData as any)
    if (schoolData.schoolId <= 0) {
        //navigate('/school/create')
        return <CreateSchool />
    } else return <ViewSchool />
}
export default Home
