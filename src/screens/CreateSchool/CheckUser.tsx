import ViewSchool from '../CreateSchool/ViewSchool/ViewSchool'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import CreateSchool from '../CreateSchool/CreateSchool'
import { useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
// import Profile from './Profile/Profile'
const CheckUser = (): JSX.Element => {
    const { data: logindata } = useAppSelector((state) => state.loginData)
    console.log('NAda', logindata)

    useEffect(() => {
        console.log('>>im Home page')
    }, [])
    const localStorageData = localStorage.getItem('ennvision-admin:token')
    const loginData = JSON.parse(localStorageData as any)
    // if (schoolData.schoolId <= 0) {
    //navigate('/school/create')
    return <ViewSchool />
    // } else return <ViewSchool />
}
export default CheckUser
