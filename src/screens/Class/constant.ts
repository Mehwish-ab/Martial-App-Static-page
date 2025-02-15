export interface CreateClassInitialValues {
    useCase: string
    id: number
    title: string
    startDate: string
    timeTableId: number
    endDate: string
    newFee: number | string
    instructorId: string[]
    isKid: boolean
    roomId: string[]
    fee: string | number
    activities: string[]
    capacity: number | string
    minimumStudent: number | string
    bookingStartDate: string
    bookingEndDate: string
    qrCodeStartDate: string
    qrCodeEndDate: string
    allowStudentCancel: string
    refundDate: string
    bookingCancelStartDate: string
    bookingCancelEndDate: string
    cancellationCharges: string
    accommodation: string[]
    description: string
    Agreement: string
    termCondition: string
    Liabilitywaivers: string
    bannerPicture: any
    // profilePicture: string | null | undefined
}
