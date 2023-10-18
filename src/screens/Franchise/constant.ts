export interface CreateFranchiseInitialValues {
  franchiseName: string;
  franchiseType: string | number;
  address: string;
  franchisePhoneNumber: string;
  belts: string | number;
  description: string;
  stripePublishableKey: string;
  stripeSecretKey: string;
  cardAccessToken: string;
  cardClientId: string;
  cardWebHook: string;
  cardClientSecret: string;
  selectedActivities: string[];
  selectedFacilities: string[];
  schoolStripeMethod: boolean;
  schoolGclMethod: boolean;
}
