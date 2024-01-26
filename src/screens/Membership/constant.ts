export interface CreateMembershipInitialValues {
    classIds: number | string
    useCase: string
    id: number | string
    title: string
    startDate: string
    endDate: string
    visibility: number | string
    subscriptionType: number | string
    membershipFee: string
    minimumStudent: number | string
    dailySubsFee: string
    weeklySubsFee: string
    monthlySubsFee: string
    annuallySubsFee: string
    allowStudentCancel: string
    refundDate: string
    bookingCancelStartDate: string
    bookingCancelEndDate: string
    cancellationCharges: string
    accommodation: string[]
    description: string
    bannerPicture: any
}
