// mpac create property data Types
export interface mpacCreatePropertyDataTypes {
    propertiesFound: number
    results: Result[]
    reportDate: string
}

export interface Result {
    roll: string
    address: Address
    availableReports: string[]
}

export interface Address {
    unparsedAddress: string
    streetNumber: string
    streetName: string
    streetNumberSuffix: any
    upperStreetNumber: any
    streetType: string
    streetDirection: string
    municipality: string
    postalCode: string
    unitDesignator: any
    unitNumber: any
    province: string
}

// create property data types
export type createPropertyDataTypes = {
    streetNumber: string
    streetName: string
    address?: string
    postalCode: string
}

// mpac create properties data types

export interface mpacAdditionalDetailTypes {
    mapcListPlanRsp: MapcListPlanRsp
    reportingPdfUrls: ReportingPdfUrls
}

export interface MapcListPlanRsp {
    roll: string
    propertyId: string
    id: number
    unparsedAddress: string
    streetNumber: string
    streetName: string
    streetNumberSuffix: any
    upperStreetNumber: any
    streetType: string
    streetDirection: string
    municipality: string
    postalCode: string
    unitDesignator: any
    unitNumber: any
    province: string
    purpose: any
    propertyTypeId: any
    propertySubTypeId: any
    propertyTitle: any
    propertyLocation: any
    propertySize: PropertySize
    price: any
    description: string
    basicResidentialOptions: BasicResidentialOptions
    primaryResidence: PrimaryResidence
    secondaryResidenceDTO: any
    garageStructure: GarageStructure
    propertyGeneralInfo: PropertyGeneralInfo
    buildingPermit: any
    propertyExtraOptions: any
    propertyUniqueOptions: PropertyUniqueOptions
    propertyServices: PropertyServices
    facingAndFlorInfo: FacingAndFlorInfo
    tagPeople: any
    location: any
    contactRequestPermission: boolean
    boostPermission: boolean
    hideLikesAndViewsCounts: boolean
    turnOffCommenting: boolean
}

export interface PropertySize {
    keyName: string
    size: string
}

export interface BasicResidentialOptions {
    assessmentValue: string
    saleDate: any
    saleAmount: any
    hydroServiceDescription: string
    waterServiceDescription: string
    sanitaryServiceDescription: string
    heatingSystemTypeCode: string
    airConditioningFlag: string
    actualFrontage: string
    actualLotSize: string
    actualDepth: string
    actualLotSizeUom: string
}

export interface PrimaryResidence {
    actualYear: string
    effectiveYear: any
    renovationYear: string
    additionYear: any
    firstFloorArea: string
    secondFloorArea: string
    thirdFloorArea: any
    basementArea: any
    basementFinished: any
}

export interface GarageStructure {
    garageName: any
    garageType: any
    garageDescription: string
    actualYear: string
    effectiveYear: any
    renovationYear: any
    floorArea: string
    totalGarageSpacesCount: string
}

export interface PropertyGeneralInfo {
    actualYearBuilt: string
    furnishedYear: any
    others: Others
}

export interface Others {
    fullStory: string
    partialStory: string
    halfBathrooms: string
    fullBedrooms: string
    fullBathrooms: string
}

export interface PropertyUniqueOptions {
    centralHeating: string
    centralCooling: string
}

export interface PropertyServices {
    hydro: string
    sanitary: string
    water: string
}

export interface FacingAndFlorInfo {
    numberOfFloors: any
    yourFloor: any
    direction: string
}

export interface ReportingPdfUrls {
    '6': string
    '7': string
}
