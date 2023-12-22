export interface CreateInstructorInitialValues {
  // instructorTitle: string;
  instructorName: string;
  emailAddress: string;
  instructorPhoneNumber: string;
  address: string;
  yearsOfExperience: string | number;
  // ranking: string | number;
  latestCertification: string | number;
  description: string;
  selectedActivities: string[];
  selectedFacilities: string[];
  termCondition: string;
  rankId: string | number
  // ranks: string;
  // stripePublishableKey: string;
  // stripeSecretKey: string;
  // cardAccessToken: string;
  // cardClientId: string;
  // cardWebHook: string;
  // cardClientSecret: string;
  // schoolStripeMethod: boolean;
  // schoolGclMethod: boolean;
}
