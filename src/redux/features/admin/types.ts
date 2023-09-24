type userType = {
  country: string;
  emailAddress: string;
  firstName: string;
  id: number;
  isDeleted: boolean;
  lastName: string;
  phoneNumber: string;
  profilePicture: string;
  userName: string;
  userStatusId: number;
  createdDateTime: string;
};
export type usersDataType = {
  currentPage?: number;
  totalItems?: number;
  totalPages?: number;
  users: userType[] | [];
};

// professional detail types
export interface ProfessionalDetailTypes {
  professionalDetails: professionalDetails;
  planSubscriptionDetails: PlanSubscriptionDetails;
  user: User;
}

export interface professionalDetails {
  professionalId: number;
  address: string;
  professionTypeId: number;
  businessName: string;
  businessStartedDate: Date;
  businessRegisterNumber: string;
  businessRegisterDocURL: string;
  idProfileDocURL: string;
  professionalStatusId: number;
  bannerImage: null | string;
}
export interface ProfessionalDetailTypes {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  userName: string;
  profilePictureURL: null | string;
  userStatus: number;
  emailAddress: string;
  phoneNumber: string;
  professionTypeId: number;
  professionalStatusId: number;
  bannerImage: null;
  idProfileDocURL: string;
  businessRegisterDocURL: string;
  updatedAt: null;
  createdAt: Date;
}

export interface PlanSubscriptionDetails {
  planId: number;
  subscriptionDate: Date;
  expiryDate: Date;
  isExpired: boolean;
  availablePlans: AvailablePlan[];
}

export interface AvailablePlan {
  planId: number;
  planName: string;
  planAvailableForSubscription: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  userStatusId: number;
  emailAddress: string;
  phoneNumber: string;
  id: number;
}
