import { Suspense, useEffect } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { setLoginData } from './redux/features/loginDataSlice'
import AppRoutes from './routes/AppRoutes'
import Head from './components/Head/Head'
import useLocationData from './maps/GoogleLocation'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorPage } from './screens/pages'
import IntroScreen from './components/IntroScreen'
import { SkeletonTheme } from 'react-loading-skeleton'
import { lightGrey13 } from './components/GlobalStyle'
import { RootState } from './redux/store'
import { local_storage_admin_key } from './utils/axios.utils'
// api method for refresh token
import { useLocation, useNavigate } from 'react-router-dom'
import { useGlobalContext } from './context/context'
import { loginDataTypes } from './redux/features/types'
import { useSelector } from 'react-redux'

export const MAP_API = 'AIzaSyC6PLT5-mrVFJcFqFixXZTW4d7Fj1EZg3Q'

// getting local storage auth data
export const loginData = localStorage.getItem(local_storage_admin_key) ?? null

function App(): JSX.Element {
    const { pathname } = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    // console.log("schoolIDLogin", schoolData )
    const { loading } = useAppSelector((state: RootState) => state.appData)
    const { selectedLanguage } = useAppSelector(
        (state: RootState) => state.selectedLanguage
    )

    const publicRoutes = ['/Home', '/membership', '/details/:SchoolId']
    const { profileImageURL } = useGlobalContext()

    const { loading: userLocationLoading } = useLocationData()

    const htmlDirection =
        selectedLanguage === 'ar' || selectedLanguage === 'ur' ? 'rtl' : 'ltr'
    useEffect(() => {
        document.documentElement.setAttribute('dir', htmlDirection)
    }, [htmlDirection])
    // add login Data in redux sote
    useEffect(() => {
        if (profileImageURL) {
            const oldLoginData = JSON.parse(loginData!) as loginDataTypes
            const updatedLoginData = {
                ...oldLoginData,
                userDetails: {
                    ...oldLoginData.userDetails,
                    profileImageURL,
                },
            } as loginDataTypes
            localStorage.setItem(
                local_storage_admin_key,
                JSON.stringify(updatedLoginData)
            )
            dispatch(setLoginData(updatedLoginData))
        } else {
            dispatch(setLoginData(JSON.parse(loginData!)))
        }
    }, [])

    // scroll to top when we navigate to new route
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, [pathname])
    const localStorageData = localStorage.getItem('ennvision-admin:token')
    const logindata = JSON.parse(localStorageData as any)
    useEffect(() => {
        const regex = /\bregister\b/
        const register = regex.test(pathname)
        if (pathname === '/login' || register || pathname === '/') {
            if (loginData && schoolData?.schoolId !== 0) {
                return navigate('/')
            }
            // else {
            //     return navigate(`/Home`)
            // }
        }
        if (!loginData && !publicRoutes.includes(pathname)) {
            return navigate('/login')
        }
    }, [])

    return (
        <>
            <Head title="admin-home" />
            <SkeletonTheme
                baseColor={lightGrey13}
                highlightColor={lightGrey13}
                // borderRadius="0.5rem"
            >
                <ToastContainer />
                <ErrorBoundary
                    FallbackComponent={ErrorPage}
                    onError={() => console.log('Error happened')}
                >
                    {loading || userLocationLoading ? (
                        <IntroScreen />
                    ) : (
                        <Suspense fallback={<h6>Loading...</h6>}>
                            <AppRoutes />
                        </Suspense>
                    )}
                </ErrorBoundary>
            </SkeletonTheme>
        </>
    )
}

export default App
