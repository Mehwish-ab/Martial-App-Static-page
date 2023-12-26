export interface CreateClassInitialValues {
    ClassTitle: string
    ClassStartDate: string
    ClassEndDate: string
    emailAddress: string
    Classinstructor: string[]
    ClassFee: string | number
    ClassActivities: string[]
    Classcapicity: string
    MinimumStudents: string | number
    startbooking: string
    endbooking: string
    QRCodeAttendanceStart: string
    QRCodeAttendanceEnd: string
    AllowToStudentCancle: string
    RefundFeeDate: string
    BookingCancellationStart: string
    BookingCancellationEnd: string
    CancellationCharges: string
    Accommodate: string
    Description: string
    Agreement: string
    termCondition: string
    Liabilitywaivers: string
    bannerPicture: string | null | undefined
    profilePicture: string | null | undefined
    // stripePublishableKey: string;
    // stripeSecretKey: string;
    // cardAccessToken: string;
    // cardClientId: string;
    // cardWebHook: string;
    // cardClientSecret: string;
    // schoolStripeMethod: boolean;
    // schoolGclMethod: boolean;
}
