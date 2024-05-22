export interface CreateTimeTableInitialValues {
    userId: number
    title: string
    isRepeated: string | number
    startDate: string
    endDate: string
    activities: string[]
    roomId: string[]
    instructorId: string[]
    status: boolean
    // instructorName: string
    // emailAddress: string
    // instructorPhoneNumber: string
    // address: string
    // yearsOfExperience: string | number
    // ranking: string | number
    // latestCertification: string | number
    // description: string
    // selectedActivities: string[]
    // selectedFacilities: string[]
    // termCondition: string
    // stripePublishableKey: string;
    // stripeSecretKey: string;
    // cardAccessToken: string;
    // cardClientId: string;
    // cardWebHook: string;
    // cardClientSecret: string;
    // schoolStripeMethod: boolean;
    // schoolGclMethod: boolean;
}
