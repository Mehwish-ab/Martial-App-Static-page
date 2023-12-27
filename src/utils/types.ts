export interface MapMeasurements {
    width: string
    height: string
}

export type errorTypes = {
    errors: null
    execTime: number
    responseCode: string
    responseMessage: string
}

// property by status types
type propertyType = {
    fullBathrooms: string
    fullBedrooms: string
    location: string
    price: string
    propertyId: number
    propertySize: propertySizeTypes
    propertySubTypeId: number
    propertyTypeId: number
    purpose: string
    title: string
}
export type propertiesByStatusTypes = {
    currentPage: number
    properties: propertyType[]
    totalItems: number
    totalPages: number
}

// post types
export type newsFeedRecordsTypes = {
    address: string | null
    cityName: string | null
    contactRequestPermission: boolean | null
    createdDateTime: string | null
    description: string | null
    hideLikesAndViewsCounts: boolean | null
    imagesURLS: string[]
    isEdited: boolean | null
    isLiked: boolean | null
    lastCommentUserFirstName: string | null
    lastCommentUserLastName: string | null
    lastLikedUserFirstName: string | null
    lastLikedUserLastName: string | null
    newsFeedId: number | null
    ownerFirstName: string | null
    ownerId: number | null
    ownerLastName: string | null
    ownerProfilePicture: string | null
    ownerUserName: string | null
    postBoostPermission: boolean | null
    postId: number | null
    postLayout: number | null
    postType: string | null
    professionalBannerImage: string | null
    professionalBusinessName: string | null
    professionalId: number | null
    professionTypeId: number | null
    propertyBathroom: string | null
    propertyBedroom: string | null
    propertyDiscountPrice: string | null
    propertyId: string | null
    propertyOriginalPrice: string | null
    propertySize: string | null
    propertyUnit: string | null
    totalComments: number | null
    totalLikes: number | null
    turnOffCommenting: boolean | null
    updatedDateTime: string | null
    videoURL: string | null
}
export type postTypes = {
    totalItems: number
    totalPages: number
    currentPage: number
    newsFeedRecords: newsFeedRecordsTypes[]
}

// story types

export type singleStoryTypes = {
    createdDateTime: string
    createdDateTimeAgo: string
    imagesURLS: string[]
    lastCommentUserFirstName: unknown
    lastCommentUserLastName: unknown
    lastLikedUserFirstName: unknown
    lastLikedUserLastName: unknown
    newsFeedId: number
    storyId: number
    storyText: string
    totalComments: number
    totalLikesCount: number
    videosURLS: string[]
}

export type storiesRecordsTypes = {
    ownerFirstName: string
    ownerId: number
    ownerLastName: string
    ownerProfilePicture: string
    ownerUserName: string
    storyDTOList: singleStoryTypes[]
}
export type storyDataTypes = {
    currentPage: number
    storiesRecords: storiesRecordsTypes[]
    totalItems: number
    totalPages: number
}

// get my properties types

type propertySizeTypes = {
    keyName: string
    size: string
}
type draftTypes = {
    fullBathrooms: string
    fullBedrooms: string
    location: unknown
    price: string
    propertyId: number
    propertySize: propertySizeTypes
    propertySubTypeId: unknown
    propertyTypeId: unknown
    purpose: string
    title: unknown
}
export type getMyPropertiesTypes = {
    active: []
    archived: []
    deleted: []
    draft: draftTypes[]
    expired: []
    leased: []
    offMarket: []
    pending: []
    powerRoom: []
    slod: []
    upcoming: []
    withdrawn: []
}

// get property details

type ownerDataTypes = {
    emailAddress: string
    firstName: string
    id: number
    lastName: string
    phoneNumber: string
    profilePicture: string
    userName: string
}

type basicResidentialOptionsTypes = {
    actualDepth: string
    actualFrontage: string
    actualLotSize: string
    actualLotSizeUom: string
    airConditioningFlag: string
    assessmentValue: string
    heatingSystemTypeCode: string
    hydroServiceDescription: string
    saleAmount: unknown
    saleDate: unknown
    sanitaryServiceDescription: string
    waterServiceDescription: string
}

type primaryResidenceTypes = {
    actualYear: null
    additionYear: null
    basementArea: null
    basementFinished: null
    effectiveYear: null
    firstFloorArea: string
    renovationYear: string
    secondFloorArea: null
    thirdFloorArea: null
}

type secondaryResidenceDTOTypes = {
    actualYearBuilt: unknown
    totalFloorArea: unknown
}
type propertyUniqueOptionsTypes = {
    accessibility: 'true' | 'false'
    centralCooling: 'true' | 'false'
    centralHeating: 'true' | 'false'
    cornerPlot: 'true' | 'false'
    rooftopUsable: 'true' | 'false'
    semiFurnished: 'true' | 'false'
    separateEntry: 'true' | 'false'
}

type garageStructureTypes = {
    actualYear: string
    effectiveYear: null
    floorArea: string
    garageDescription: string
    garageName: null
    garageType: null
    renovationYear: null
    totalGarageSpacesCount: string
}

type buildingPermitTypes = {
    expiryDate: unknown
    issueDate: unknown
    permitDescription: unknown
    permitNumber: unknown
}

type facingAndFlorInfoTypes = {
    direction: string
    numberOfFloors: unknown
    yourFloor: unknown
}

type propertyServicesTypes = {
    electricity: 'true' | 'false'
    gas: 'true' | 'false'
    hydroService: 'true' | 'false'
    internet: 'true' | 'false'
    maintenance: 'true' | 'false'
    sanitaryService: 'true' | 'false'
    security: 'true' | 'false'
    sewerage: 'true' | 'false'
    water: 'true' | 'false'
}

type propertyGeneralInfoTypes = {
    actualYearBuilt: string
    furnishedYear: string
    others: {
        fullBathrooms: string
        fullBedrooms: string
        fullStory: string
        halfBathrooms: string
        partialStory: string
    }
}
type propertyDataTypes = {
    basicResidentialOptions: basicResidentialOptionsTypes
    buildingPermit: buildingPermitTypes
    description: string
    facingAndFlorInfo: facingAndFlorInfoTypes
    garageStructure: garageStructureTypes
    imageURLS: string[]
    latitude: number
    longitude: number
    municipality: string
    postalCode: string
    price: string
    primaryResidence: primaryResidenceTypes
    propertyGeneralInfo: propertyGeneralInfoTypes
    propertyId: number
    propertyServices: propertyServicesTypes
    propertySize: propertySizeTypes
    propertyStatusId: number
    propertyUniqueOptions: propertyUniqueOptionsTypes
    province: string
    purpose: string
    location: string
    title: string
    secondaryResidenceDTO: secondaryResidenceDTOTypes
    streetDirection: string
    streetName: string
    streetType: string
    unparsedAddress: string
}
export type getPropertyDetailsTypes = {
    ownerData: ownerDataTypes
    propertyData: propertyDataTypes
}

type propertyTypes = {
    fullBathrooms: string
    fullBedrooms: string
    location: string
    price: string
    propertyId: number
    propertySize: propertySizeTypes
    propertySubTypeId: number
    propertyTypeId: number
    purpose: string
    title: string
}
export type viewAllPropertiesTypes = {
    currentPage: number
    properties: propertyTypes[]
    totalItems: number
    totalPages: number
}

// get properties
export type singlePropertyTypes = {
    fullBathrooms: string
    fullBedrooms: string
    imageURLS: string[]
    latitude: number
    location: string
    longitude: number
    ownerData: ownerDataTypes
    price: string
    propertyId: number
    propertySize: propertySizeTypes
    propertyStatusId: number
    propertySubTypeId: number
    propertyTypeId: number
    purpose: string
    title: string
    videoULRS: string
}
export type getAllProperties = {
    currentPage: number
    properties: singlePropertyTypes[]
    totalItems: number
    totalPages: number
}

// find professional types

type professionalRecords = {
    bannerImage: string
    createdAt: string
    emailAddress: string
    firstName: string
    id: number
    lastName: string
    phoneNumber: string
    professionalStatusId: number
    professionTypeId: number
    profilePictureURL: string
    updatedAt: unknown
    userId: number
    userName: string
    userStatus: number
}

export type professionalTypes = {
    currentPage: number
    professionalRecords: professionalRecords[]
    totalItems: number
    totalPages: number
}
