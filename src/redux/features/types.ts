// user detail types
export type userDetailTypes = {
    id: number
    state: string
    address: string
    country: string
    userName: string
    createdBy: null | string
    firstName: string
    lastName: string
    stripeCustomerId: string
    city: string
    createdDateTime: string
    updatedDateTime: string
    deletedDateTime: null
    phoneNumber: string
    emailAddress: string
    secretId: string
    isDeleted: boolean
    profilePicture: string
    updatedBy: number
    deletedBY: null
    userStatusId: number
    userStatusName: string
}

// user profile detail types

export interface profileDetailTypes {
    id: number
    firstName: string
    lastName: string
    userName: string
    profilePictureURL: any
    status: number
    emailAddress: string
    phoneNumber: string
    totalFollowers: number
    totalFollowing: number
    totalVisitRequests: number
    totalSendRequests: number
    totalSoldProperties: number
    totalProperties: number
    postList: PostList
    propertiesList: PropertiesList
    likedNewsFeedList: any
    storiesNewsFeedList: StoriesNewsFeedList
    active: boolean
    ProfessionalDetails: ProfessionalDetails

    createdAt: string
}

export interface PostList {
    totalItems: number
    postList: PostList2[]
    totalPages: number
    currentPage: number
}

export interface PostList2 {
    postId: number
    newsFeedId: number
    description: string
    postLayout: number
    imagesURLS: string[]
    videosURLS: string
    longitude: number
    latitude: number
    address: string
    city: string
    state: string
    country: string
    postStatusId: number
}

export interface PropertiesList {
    totalItems: number
    propertyList: PropertyList[]
    totalPages: number
    currentPage: number
}

export interface PropertyList {
    ownerId: number
    ownerUserName: string
    ownerProfilePicture: any
    ownerFirstName: string
    ownerLastName: string
    newsFeedId: number
    postType: string
    postId: any
    address: string
    cityName: string
    professionTypeId: any
    professionalId: any
    professionalBusinessName: any
    professionalBannerImage: any
    postLayout: any
    description: string
    propertyId: number
    propertyPurpose: any
    propertyType: number
    propertyTitle: string
    propertyBathroom: number
    propertyBedroom: number
    // propertySize: number;
    propertyUnit: string
    propertyOriginalPrice: number
    propertyDiscountPrice: number
    propertyCurrencySymbol: any
    imageURLS: string[]
    videoURL: string
    contactRequestPermission: boolean
    postBoostPermission: boolean
    hideLikesAndViewsCounts: boolean
    turnOffCommenting: boolean
    isEdited: boolean
    totalLikes: number
    isLiked: boolean
    lastLikedUserFirstName: any
    lastLikedUserLastName: any
    totalComments: number
    lastCommentUserFirstName: any
    lastCommentUserLastName: any
    createdDateTime: string
    updatedDateTime: any

    // TODO: another object starts
    // propertyId: number
    // newsFeedId: number
    propertyTypeId: number
    purpose: string
    propertySubTypeId: number
    title: string
    location: string
    propertySize: PropertySize
    price: string
    fullBedrooms: string
    fullBathrooms: string
    propertyStatusId: number
    // imageURLS: string[]
    videoULRS: string
    longitude: number
    latitude: number
}

export interface PropertySize {
    keyName: string
    size: string
}

export interface StoriesNewsFeedList {
    totalItems: number
    storiesList: StoriesList[]
    totalPages: number
    currentPage: number
}

export interface StoriesList {
    storyId: number
    newsFeedId: number
    storyText: string
    imagesURLS: string
    videosURLS: string
    longitude: number
    latitude: number
    address: string
    city: string
    statusId: number
}

// property list types

export interface ProfessionalDetails {
    professionalStatusId: number
    professionalId: number
    address: string
    professionTypeId: number
    businessName: string
    businessStartedDate: string
    businessRegisterNumber: string
    businessRegisterDocURL: string
    idProfileDocURL: string

    // TODO: another interface started
    // professionalStatusId: number
    // professionalId: number
    // address: string
    // professionTypeId: number
    // businessName: string
    // businessStartedDate: string
    // businessRegisterNumber: string
    // businessRegisterDocURL: string
    // idProfileDocURL: string
    bannerImage: string
    longitude: number
    latitude: number
}
export interface LikedNewsFeedList {
    totalItems: number
    likedList: LikedList[]
    totalPages: number
    currentPage: number
}

export interface LikedList {
    ownerId: number
    ownerUserName: string
    ownerProfilePicture: string
    ownerFirstName: string
    ownerLastName: string
    newsFeedId: number
    postType: string
    postId: number
    address: string
    cityName: string
    professionTypeId: any
    professionalId: any
    professionalBusinessName: any
    professionalBannerImage: any
    postLayout: number
    description: string
    propertyId: any
    propertyPurpose: any
    propertyType: any
    propertyTitle: any
    propertyBathroom: number
    propertyBedroom: number
    propertySize: any
    propertyUnit: any
    propertyOriginalPrice: number
    propertyDiscountPrice: number
    propertyCurrencySymbol: any
    imagesURLS: string[]
    videoURL?: string
    contactRequestPermission: boolean
    postBoostPermission: boolean
    hideLikesAndViewsCounts: boolean
    turnOffCommenting: boolean
    isEdited: boolean
    totalLikes: number
    isLiked: boolean
    lastLikedUserFirstName: any
    lastLikedUserLastName: any
    totalComments: number
    lastCommentUserFirstName: any
    lastCommentUserLastName: any
    createdDateTime: string
    updatedDateTime?: string
}

// get appData types

type serviceFee = {
    stripeFeePercentAmount: string
    stripeFixedFeeAmount: string
    vatAmount: string
}

type propertySlab = {
    description: string
    isActive: boolean
    slabId: number
    slabName: string
}

export type mpacAvailableListingPlanTypes = {
    countryFlagURL: string
    countryName: string
    currency: string
    currencySymbol: string
    description: string
    discountAmount: string
    displayName: string
    grandTotal: string
    gst: string
    identifierName: string
    planId: number
    planName: string
    propertySlabs: propertySlab[]
    serviceFee: serviceFee
    subscriptionAmount: string
    subTotal: string
    totalServiceFee: string
    isActive: boolean
}

type introTypes = {
    description: string
    id: number
    name: string
}

export type statusList = {
    document: any[]
    professional: introTypes[]
    promotion: any[]
    property: introTypes[]
    story: any[]
    user: introTypes[]
}

export type mpacAvailableReportingPlan = {
    countryFlagURL: string
    countryName: string
    currency: string
    currencySymbol: string
    description: string
    discountAmount: string
    displayName: string
    grandTotal: string
    gst: string
    identifierName: string
    planId: number
    planName: string
    propertySlabs: propertySlab[]
    serviceFee: serviceFee
    subscriptionAmount: string
    subTotal: string
    totalServiceFee: string
    isWant: boolean
}
// type professionTypes = {
//     description: string
//     id: number
//     isActive: boolean
//     name: string
// }

export type professionalPlanTypes = {
    description: string
    isActive: boolean
    planId: number
    planName: string
    validityDays: number
    getProfessionalPlansSlapsResponse: {
        description: string
        isActive: boolean
        slabId: number
        slabName: string
    }[]
    getProfessionalPlansPriceResponse: {
        countryFlagURL: string
        countryName: string
        currency: string
        currencySymbol: string
        currencySymbolBase64: string
        discountAmount: string
        grandTotal: string
        gst: string
        id: number
        serviceFee: {
            stripeFeePercentAmount: string
            stripeFixedFeeAmount: string
            vatAmount: string
        }
        subscriptionAmount: string
        subTotal: string
        totalServiceFee: string
    }[]
}

export interface ReportingReasonsList {
    id: number
    title: string
    description: string
    isActive: boolean
}
export interface propertyRoomName {
    id: number
    keyName: string
    displayName: string
}

// app data types

export interface appDataTypes {
    appTheme: AppTheme
    serverTimeZone: string
    countryName: CountryName
    validations: Validation[]
    statusData: StatusDataTypes
    dropdowns: DropdownDataTypes
    belts: DropdownDataTypes
}

export interface DropdownDataTypes {
    language: DataTypesWithIdAndMultipleLangLabel[]
    currency: DataTypesWithIdAndMultipleLangLabel[]
    businessTypes: DataTypesWithIdAndMultipleLangLabel[]
    countryName: DataTypesWithIdAndMultipleLangLabel[]
    schoolAccommodation: DataTypesWithIdAndMultipleLangLabel[]
    adult: DataTypesWithIdAndMultipleLangLabel[]
    kids: DataTypesWithIdAndMultipleLangLabel[]
}

export interface StatusDataTypes {
    activities: DataTypesWithIdAndMultipleLangLabel[]
    facilities: DataTypesWithIdAndMultipleLangLabel[]
}

export interface DataTypesWithIdAndMultipleLangLabel {
    value: any
    label: any
    id: string
    en: string
    es: string
    pt: string
    ar: string
    ur: string
    imageUrl: string
}

export interface AppTheme {
    title: string
    subtitle: string
    detail: string
    lightBorder: string
    darkBorder: string
    background: string
    primaryColor: string
    secondaryColor: string
    primaryButton: string
    secondaryButton: string
    cancelButton: string
    bookingButton: string
    cancelStatus: string
    activeStatus: string
    pendingStatus: string
}

export interface CountryName {
    responseCode: number
    responseMessage: string
    execTime: number
    errors: any
    results: Results2
}

export interface Results2 {
    id: number
    name: string
    countryFlagURL: string
    currency: string
    currencySymbol: string
    currencySymbolBase64: string
    countryCode: string
    phoneNumberLength: any
    examplePhoneNumber: string
    status: boolean
    iso2: any
}

export interface Validation {
    key: string
    notBlankMsgEn: string
    notBlankMsgEs: string
    notBlankMsgPt: string
    notBlankMsgAr: string
    notBlankMsgUr: string
    pattern: string
    patternMsgEn: string
    patternMsgEs: string
    patternMsgPt: string
    patternMsgAr: string
    patternMsgUr: string
}

// login data types
export type loginDataTypes = {
    ProfessionalDetails: any
    jwtDetails: {
        token: string
        refreshToken: string
        type: 'Bearer'
    }
    planSubscriptionDetails: {
        planId: any
        subscriptionDate: any
        expiryDate: any
        isExpired: any
        availablePlans: any
    }
    userDetails: {
        id: number
        username: string
        userSecretId: string
        email: string
        phoneNumber: string
        profileImageURL: any
        userFirstName: string
        userLastName: string
        countryCode: string
    }
    schoolId: number
}

// professional Detail Types

// professional Detail Types

export interface professionalDetailTypes {
    professionalDetails: ProfessionalDetails
    planSubscriptionDetails: PlanSubscriptionDetails
    user: User
}

export interface PlanSubscriptionDetails {
    planId: any
    subscriptionDate: any
    expiryDate: any
    isExpired: any
    availablePlans: any
}

export interface User {
    firstName: string
    lastName: string
    userName: string
    userStatusId: number
    emailAddress: string
    phoneNumber: string
    id: number
}

// property app data
interface DataType {
    value: string
    label: string
    // other properties
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const list: DataType[] = [
    { value: 'value1', label: 'Label 1' },
    { value: 'value2', label: 'Label 2' },
    // ...
]
export interface propertyAppDataTypes {
    id: number
    typeName: string
    propertySubTypes: string
    propertySize: string
    propertyPrice: string
    title: string
    description: string
    propertyGeneralInfo: string
    location: string
    purpose: string
    image: string
    video: string
    propertyExtraOption: string
    propertyUniqueOption: string
    propertyService: string
    facing: string
    totalFloor: string
    yourFloor: string
    propertySubTypesDTOS: PropertySubTypesDtos[]
    propertySizeDTOS: PropertySizeDtos[]
    propertyGeneralInfoDTOS: PropertyGeneralInfoDtos[]
    propertyExtraOptionDTOS: PropertyExtraOptionDtos[]
    propertyUniqueOptionDTOS: PropertyUniqueOptionDtos[]
    propertyServicesDTOS: PropertyServicesDtos[]
}

export interface PropertySubTypesDtos {
    id: number
    keyName: string
    displayName: string
}

export interface PropertySizeDtos {
    id: number
    keyName: string
    displayName: string
}

export interface PropertyGeneralInfoDtos {
    id: number
    keyName: string
    displayName: string
    isRequired: boolean
    maxRange: any
    value: number
}

export interface PropertyExtraOptionDtos {
    id: number
    keyName: string
    displayName: string
    isRequired: boolean
    maxRange: number
    value: number
}

export interface PropertyUniqueOptionDtos {
    id: number
    keyName: string
    displayName: string
    isSelect: boolean
}

export interface PropertyServicesDtos {
    id: number
    keyName: string
    displayName: string
    isSelect: boolean
}
