export interface CreateInstructorInitialValues {
    instructorName: string
    emailAddress: string
    instructorPhoneNumber: string | number
    address: string
    yearsOfExperience: string | number
    latestCertification: any
    description: string | number
    activities: string[]
    specializations: string[]
    termCondition: string
    rankId: number
    // stripePublishableKey: string;
    // stripeSecretKey: string;
    // cardAccessToken: string;
    // cardClientId: string;
    // cardWebHook: string;
    // cardClientSecret: string;
    // schoolStripeMethod: boolean;
    // schoolGclMethod: boolean;
}
