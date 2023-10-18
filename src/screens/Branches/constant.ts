export interface CreateBranchInitialValues {
  branchName: string;
  branchType: string | number;
  address: string;
  branchPhoneNumber: string;
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
