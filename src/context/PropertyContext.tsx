import {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
} from 'react'
import {
    mpacAvailableListingPlanTypes,
    mpacAvailableReportingPlan,
} from '../redux/features/types'
import {
    createPropertyDataTypes,
    mpacAdditionalDetailTypes,
    mpacCreatePropertyDataTypes,
} from './types'

type propertyLocation = {
    longitude: string
    latitude: string
    city: string
    state: string
    country: string
}
type propertyContext = {
    createPropertyData: createPropertyDataTypes
    setCreatePropertyData: Dispatch<createPropertyDataTypes>
    mpacCreatePropertyData: mpacCreatePropertyDataTypes
    setMpacCreatePropertyData: Dispatch<mpacCreatePropertyDataTypes>
    createPropertyPlan: mpacAvailableListingPlanTypes
    setCreatePropertyPlan: Dispatch<mpacAvailableListingPlanTypes>
    createPropertyReport: mpacAvailableReportingPlan[]
    setCreatePropertyReport: Dispatch<mpacAvailableReportingPlan[]>
    mpacAdditionalDetailsData: mpacAdditionalDetailTypes
    setMpacAdditionalDetailsData: Dispatch<
        SetStateAction<mpacAdditionalDetailTypes>
    >
    generatePropertyType: string
    setGeneratePropertyType: Dispatch<SetStateAction<string>>
    generatePropertyNumber: number
    setGeneratePropertyNumber: Dispatch<SetStateAction<number>>
    propertyPurpose: string
    setPropertyPurpose: Dispatch<SetStateAction<string>>
    generatePropertyInfo: any
    setGeneratePropertyInfo: any
    propertyLocation: propertyLocation
    setPropertyLocation: Dispatch<SetStateAction<propertyLocation>>
    propertyStatusId: number
    setPropertyStatusId: Dispatch<SetStateAction<number>>
    isPropertyTypeSelected: boolean
    setIsPropertyTypeSelected: Dispatch<SetStateAction<boolean>>
    groundFloorInfoItems: number[]
    setGroundFloorInfoItems: Dispatch<SetStateAction<number[]>>
    firstFloorInfoItems: number[]
    setFirstFloorInfoItems: Dispatch<SetStateAction<number[]>>
    secondFloorInfoItems: number[]
    setSecondFloorInfoItems: Dispatch<SetStateAction<number[]>>
    thirdFloorInfoItems: number[]
    setThirdFloorInfoItems: Dispatch<SetStateAction<number[]>>
    resetPropertyDataContext: () => void
}

const PropertyContext = createContext({} as propertyContext)

const PropertyProvider = ({
    children,
}: {
    children: React.ReactNode
}): JSX.Element => {
    const [createPropertyData, setCreatePropertyData] =
        useState<createPropertyDataTypes>({} as createPropertyDataTypes)

    const [mpacCreatePropertyData, setMpacCreatePropertyData] =
        useState<mpacCreatePropertyDataTypes>({} as mpacCreatePropertyDataTypes)

    const [createPropertyPlan, setCreatePropertyPlan] =
        useState<mpacAvailableListingPlanTypes>(
            {} as mpacAvailableListingPlanTypes
        )

    const [createPropertyReport, setCreatePropertyReport] = useState<
        mpacAvailableReportingPlan[]
    >([] as mpacAvailableReportingPlan[])

    const [mpacAdditionalDetailsData, setMpacAdditionalDetailsData] =
        useState<mpacAdditionalDetailTypes>({} as mpacAdditionalDetailTypes)

    const [generatePropertyType, setGeneratePropertyType] =
        useState('Residential')

    const [generatePropertyNumber, setGeneratePropertyNumber] = useState(0)

    const [propertyPurpose, setPropertyPurpose] = useState('Rent')

    const [generatePropertyInfo, setGeneratePropertyInfo] = useState<any>({
        typeOfProperty: 'Residential',
    })
    const [propertyLocation, setPropertyLocation] = useState(
        {} as propertyLocation
    )
    const [isPropertyTypeSelected, setIsPropertyTypeSelected] = useState(false)
    // check should form validation or not
    const [propertyStatusId, setPropertyStatusId] = useState(2)

    // property rooms info
    const [groundFloorInfoItems, setGroundFloorInfoItems] = useState([0, 1])
    const [firstFloorInfoItems, setFirstFloorInfoItems] = useState([0, 1])
    const [secondFloorInfoItems, setSecondFloorInfoItems] = useState([0, 1])
    const [thirdFloorInfoItems, setThirdFloorInfoItems] = useState([0, 1])

    const resetPropertyDataContext = (): void => {
        // Reset all the state variables to their initial values
        setCreatePropertyData({} as createPropertyDataTypes)
        setMpacCreatePropertyData({} as mpacCreatePropertyDataTypes)
        setCreatePropertyPlan({} as mpacAvailableListingPlanTypes)
        setCreatePropertyReport([] as mpacAvailableReportingPlan[])
        setMpacAdditionalDetailsData({} as mpacAdditionalDetailTypes)
        setGeneratePropertyType('Residential')
        setGeneratePropertyNumber(0)
        setPropertyPurpose('Rent')
        setGeneratePropertyInfo({ typeOfProperty: 'Residential' })
        setPropertyLocation({} as propertyLocation)
        setIsPropertyTypeSelected(false)
        setPropertyStatusId(2)
        setGroundFloorInfoItems([0, 1])
        setFirstFloorInfoItems([0, 1])
        setSecondFloorInfoItems([0, 1])
        setThirdFloorInfoItems([0, 1])
    }

    return (
        <PropertyContext.Provider
            value={{
                createPropertyData,
                setCreatePropertyData,
                mpacCreatePropertyData,
                setMpacCreatePropertyData,
                createPropertyPlan,
                setCreatePropertyPlan,
                createPropertyReport,
                setCreatePropertyReport,
                mpacAdditionalDetailsData,
                setMpacAdditionalDetailsData,
                generatePropertyType,
                setGeneratePropertyType,
                generatePropertyNumber,
                setGeneratePropertyNumber,
                propertyPurpose,
                setPropertyPurpose,
                generatePropertyInfo,
                setGeneratePropertyInfo,
                propertyLocation,
                setPropertyLocation,
                propertyStatusId,
                setPropertyStatusId,
                isPropertyTypeSelected,
                setIsPropertyTypeSelected,
                groundFloorInfoItems,
                setGroundFloorInfoItems,
                firstFloorInfoItems,
                setFirstFloorInfoItems,
                secondFloorInfoItems,
                setSecondFloorInfoItems,
                thirdFloorInfoItems,
                setThirdFloorInfoItems,
                resetPropertyDataContext,
            }}
        >
            {children}
        </PropertyContext.Provider>
    )
}

// make sure use
const usePropertyContext = (): propertyContext => {
    return useContext(PropertyContext)
}

export { usePropertyContext, PropertyProvider }
