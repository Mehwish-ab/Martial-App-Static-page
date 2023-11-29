export type DataTypeWithIdAndCurrentLangLabel = {
  id: string;
  label: string; // Label in the current selected language
};

export type CreateSchoolInitialValues = {
  businessName: string;
  businessType: string;
  address: string;
  businessPhoneNumber: string;
  belts: string | number;
  defaultLanguage: string | number;
  defaultCurrency: string | number;
  description: string;
  rank: boolean ;
  defaultCurrencyId: number;
  defaultLanguageId: number;
  // stripePublishableKey: string;
  // stripeSecretKey: string;
  // cardAccessToken: string;
  // cardClientId: string;
  // cardWebHook: string;
  // cardClientSecret: string;
  selectedActivities: string[];
  selectedFacilities: string[];
};

export interface SelectOptionsDataTypes {
  value: number | string | boolean;
  label: number | string | boolean;
}

export const BELTS_SELECT_OPTIONS: SelectOptionsDataTypes[] = [
  {
    value: 1,
    label: "Yes",
  },
  {
    value: 2,
    label: "No",
  },
];
