import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App, { MAP_API, loginData } from './App'
import './App.css'
import 'antd/dist/antd.css'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-alice-carousel/lib/alice-carousel.css'
import 'react-image-gallery/styles/css/image-gallery.css'
import 'react-loading-skeleton/dist/skeleton.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import { AppProvider } from './context/context'
import axios from 'axios'
import { base_url } from './utils/api_urls'
import { v4 as uuidv4 } from 'uuid'
import { LoadScript } from '@react-google-maps/api'
import IntroScreen from './components/IntroScreen'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { PropertyProvider } from './context/PropertyContext'
import { PostProvider } from './context/PostContext'

// map libraries
const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = [
    'places',
]

axios.defaults.baseURL = base_url

// set header before app initialize
export const initializeApp = async (): Promise<void> => {
    // Set up an Axios interceptor to modify the request config
    axios.interceptors.request.use(
        (config) => {
            const UUID = uuidv4()
            // getting local storage token data
            const userDetails =
                JSON.parse(loginData || '{}')?.userDetails || ({} as unknown)

            config.headers = config.headers || {} // Ensure headers object is defined
            config.headers['loggingToken'] = UUID
            config.headers['userName'] = userDetails.username || 'AnonymousUser'
            config.headers['lang'] = 'en'

            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // get system ip address
    const ipAddress = '168.8.1'

    try {
        // Uncomment this block if you want to fetch the IP address
        // const response = await fetch("https://api.ipify.org?format=json");
        // const data = await response.json();
        // ipAddress = data.ip;
        // Continue with the rest of your code that depends on the ipAddress
    } catch (error) {
        console.error('Error retrieving IP address:', error)
    }

    // Set the Axios defaults headers
    axios.defaults.baseURL = base_url
    axios.defaults.headers.common['context'] = 'WebApp'
    axios.defaults.headers.common['deviceIp'] = ipAddress
    axios.defaults.headers.common['version'] = '0.0.1'
}

// Create an async function to run initializeApp before rendering
const runBeforeRender = async (): Promise<void> => {
    await initializeApp()
    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    )
    return root.render(
        <React.StrictMode>
            <BrowserRouter>
                <LoadScript
                    googleMapsApiKey={MAP_API}
                    libraries={libraries}
                    loadingElement={<IntroScreen />}
                >
                    <Provider store={store}>
                        <AppProvider>
                            <PropertyProvider>
                                <PostProvider>
                                    <App />
                                </PostProvider>
                            </PropertyProvider>
                        </AppProvider>
                    </Provider>
                </LoadScript>
            </BrowserRouter>
        </React.StrictMode>
    )
}

// Call the async function to run initializeApp first and then render the React app
runBeforeRender()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
