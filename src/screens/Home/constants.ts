export type DataTypeWithIdAndCurrentLangLabel = {
    id: string
    label: string // Label in the current selected language
}

export type CreateSchoolInitialValues = {
    businessName: string
    businessType: number | string
    address: string
    businessPhoneNumber: string
    defaultLanguageId: string | number
    defaultCurrencyId: string | number
    description: string
    rank: number | string
    UserId: number

    // stripePublishableKey: string;
    // stripeSecretKey: string;
    // cardAccessToken: string;
    // cardClientId: string;
    // cardWebHook: string;
    // cardClientSecret: string;
    selectedActivities: string[]
    selectedFacilities: string[]
}

export interface SelectOptionsDataTypes {
    value: number | string | boolean
    label: number | string | boolean
}

export const BELTS_SELECT_OPTIONS: SelectOptionsDataTypes[] = [
    {
        value: 1,
        label: 'Yes',
    },
    {
        value: 2,
        label: 'No',
    },
]
