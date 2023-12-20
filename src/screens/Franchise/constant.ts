export interface CreateFranchiseInitialValues {
  franchiseName: string;
  franchiseType: string | number;
  address: string;
  franchisePhoneNumber: string;
  // belts: string | number;
  rank: string | number;
  description: string;
  defaultLanguage: string | number;
  defaultCurrency: string | number;
  selectedActivities: string[];
  selectedFacilities: string[];
  // stripePublishableKey: string;
  // stripeSecretKey: string;
  // cardAccessToken: string;
  // cardClientId: string;
  // cardWebHook: string;
  // cardClientSecret: string;
  // schoolStripeMethod: boolean;
  // schoolGclMethod: boolean;
}
