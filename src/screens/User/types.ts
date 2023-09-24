export interface userProfileTypes {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  profilePictureURL: string;
  status: number;
  emailAddress: string;
  phoneNumber: string;
  countryCode: string;
  totalFollowers: number;
  totalFollowing: number;
  totalVisitRequests: number;
  totalSendRequests: number;
  totalSoldProperties: number;
  totalProperties: number;
  postList: PostList;
  propertiesList: PropertiesList;
  likedNewsFeedList: LikedNewsFeedList;
  storiesNewsFeedList: StoriesNewsFeedList;
  userNewsFeedList: UserNewsFeedList;
  favouriteNewsFeedList: any;
  professionalDetails: ProfessionalDetails;
  active: boolean;
  createdAt: string;
}

export interface PostList {
  totalItems: number;
  postList: PostList2[];
  totalPages: number;
  currentPage: number;
}

export interface PostList2 {
  postId: number;
  newsFeedId: number;
  description: string;
  postLayout: number;
  imagesURLS: string[];
  videosURLS: string;
  longitude: number;
  latitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
  contactRequestPermission: boolean;
  boostPermission: boolean;
  hideLikesAndViewsCounts: boolean;
  turnOffCommenting: boolean;
  readComments: boolean;
  sharingEnabled: boolean;
  saveFavourite: boolean;
  isFavourite: boolean;
  postStatusId: number;
  ownerData: OwnerData;
  lastLikeAndComment: LastLikeAndComment;
  createdDateTime: string;
  updatedDateTime: string;
  isEdited: boolean;
}

export interface OwnerData {
  firstName: string;
  lastName: string;
  userName: string;
  profilePicture: string;
  emailAddress: string;
  phoneNumber: string;
  countryCode: string;
  isFollower: boolean;
  isFollowing: boolean;
  id: number;
}

export interface LastLikeAndComment {
  isLiked: boolean;
  totalLikes: number;
  lastLikedUserId: any;
  lastLikedUserFirstName: any;
  lastLikedUserLastName: any;
  totalComments: number;
  lastCommentUserId: any;
  lastCommentUserFirstName: any;
  lastCommentUserLastName: any;
  lastCommentText: any;
  lastCommentUserProfilePicture: any;
}

export interface PropertiesList {
  totalItems: number;
  propertyList: PropertyList[];
  totalPages: number;
  currentPage: number;
}

export interface PropertyList {
  propertyId: number;
  newsFeedId?: number;
  propertyTypeId: number;
  purpose: string;
  propertySubTypeId: number;
  title: string;
  location: string;
  propertySize: PropertySize;
  price: string;
  fullBedrooms: string;
  fullBathrooms: string;
  propertyStatusId: number;
  imageURLS: string[];
  videoULRS: string;
  longitude: number;
  latitude: number;
  contactRequestPermission: boolean;
  boostPermission: boolean;
  hideLikesAndViewsCounts: boolean;
  turnOffCommenting: boolean;
  readComments: boolean;
  sharingEnabled: boolean;
  saveFavourite: boolean;
  isFavourite: boolean;
  lastLikeAndComment: LastLikeAndComment2;
  ownerData: OwnerData2;
  createdDateTime: string;
  updatedDateTime: string;
  isEdited: boolean;
}

export interface PropertySize {
  keyName: string;
  size: string;
}

export interface LastLikeAndComment2 {
  isLiked: boolean;
  totalLikes: number;
  lastLikedUserId?: number;
  lastLikedUserFirstName?: string;
  lastLikedUserLastName?: string;
  totalComments: number;
  lastCommentUserId: any;
  lastCommentUserFirstName: any;
  lastCommentUserLastName: any;
  lastCommentText: any;
  lastCommentUserProfilePicture: any;
}

export interface OwnerData2 {
  firstName: string;
  lastName: string;
  userName: string;
  profilePicture: string;
  emailAddress: string;
  phoneNumber: string;
  countryCode: string;
  isFollower: boolean;
  isFollowing: boolean;
  id: number;
}

export interface LikedNewsFeedList {
  totalItems: number;
  likedList: LikedList[];
  totalPages: number;
  currentPage: number;
}

export interface LikedList {
  newsFeedId: number;
  postType: string;
  postId: any;
  address: string;
  cityName: string;
  professionTypeId: any;
  professionalId: any;
  professionalBusinessName: any;
  professionalBannerImage: any;
  postLayout: any;
  description: string;
  propertyId: number;
  propertyPurpose: string;
  propertyType: number;
  propertyTitle: string;
  propertyBathroom: number;
  propertyBedroom: number;
  propertySize: number;
  propertyUnit: string;
  propertyOriginalPrice: number;
  propertyDiscountPrice: number;
  propertyCurrencySymbol: any;
  imagesURLS: string[];
  videoURL: string;
  contactRequestPermission: boolean;
  boostPermission: boolean;
  hideLikesAndViewsCounts: boolean;
  turnOffCommenting: boolean;
  readComments: boolean;
  sharingEnabled: boolean;
  saveFavourite: boolean;
  isFavourite: boolean;
  createdDateTime: string;
  updatedDateTime: any;
  isEdited: boolean;
  lastLikeAndComment: LastLikeAndComment3;
  ownerData: OwnerData3;
}

export interface LastLikeAndComment3 {
  isLiked: boolean;
  totalLikes: number;
  lastLikedUserId: number;
  lastLikedUserFirstName: string;
  lastLikedUserLastName: string;
  totalComments: number;
  lastCommentUserId: any;
  lastCommentUserFirstName: any;
  lastCommentUserLastName: any;
  lastCommentText: any;
  lastCommentUserProfilePicture: any;
}

export interface OwnerData3 {
  firstName: string;
  lastName: string;
  userName: string;
  profilePicture: string;
  emailAddress: string;
  phoneNumber: string;
  countryCode: string;
  isFollower: boolean;
  isFollowing: boolean;
  id: number;
}

export interface StoriesNewsFeedList {
  totalItems: number;
  storiesList: StoriesList[];
  totalPages: number;
  currentPage: number;
}

export interface StoriesList {
  storyId: number;
  newsFeedId: number;
  storyText: string;
  imagesURLS: string;
  videosURLS: string;
  longitude: number;
  latitude: number;
  address: string;
  city: string;
  contactRequestPermission: boolean;
  boostPermission: boolean;
  hideLikesAndViewsCounts: boolean;
  turnOffCommenting: boolean;
  readComments: boolean;
  sharingEnabled: boolean;
  saveFavourite: boolean;
  statusId: number;
  lastLikeAndComment: LastLikeAndComment4;
  ownerData: OwnerData4;
  createdDateTime: string;
  isFavourite: boolean;
}

export interface LastLikeAndComment4 {
  isLiked: boolean;
  totalLikes: number;
  lastLikedUserId?: number;
  lastLikedUserFirstName?: string;
  lastLikedUserLastName?: string;
  totalComments: number;
  lastCommentUserId: any;
  lastCommentUserFirstName: any;
  lastCommentUserLastName: any;
  lastCommentText: any;
  lastCommentUserProfilePicture: any;
}

export interface OwnerData4 {
  firstName: string;
  lastName: string;
  userName: string;
  profilePicture: string;
  emailAddress: string;
  phoneNumber: string;
  countryCode: string;
  isFollower: boolean;
  isFollowing: boolean;
  id: number;
}

export interface UserNewsFeedList {
  totalItems: number;
  newsFeedList: NewsFeedList[];
  totalPages: number;
  currentPage: number;
}

export interface NewsFeedList {
  newsFeedId: number;
  postType: string;
  postId: number;
  address: string;
  cityName: string;
  professionTypeId: any;
  professionalId: any;
  professionalBusinessName: any;
  professionalBannerImage: any;
  postLayout: number;
  description: string;
  propertyId: any;
  propertyPurpose: any;
  propertyType: any;
  propertyTitle: any;
  propertyBathroom: number;
  propertyBedroom: number;
  propertySize: any;
  propertyUnit: any;
  propertyOriginalPrice: number;
  propertyDiscountPrice: number;
  propertyCurrencySymbol: any;
  imagesURLS: string[];
  videoURL: string;
  contactRequestPermission: boolean;
  boostPermission: boolean;
  hideLikesAndViewsCounts: boolean;
  turnOffCommenting: boolean;
  readComments: boolean;
  sharingEnabled: boolean;
  saveFavourite: boolean;
  isFavourite: boolean;
  isEdited: boolean;
  lastLikeAndComment: LastLikeAndComment5;
  ownerData: OwnerData5;
  createdDateTime: string;
  updatedDateTime: any;
}

export interface LastLikeAndComment5 {
  isLiked: boolean;
  totalLikes: number;
  lastLikedUserId: any;
  lastLikedUserFirstName: any;
  lastLikedUserLastName: any;
  totalComments: number;
  lastCommentUserId: any;
  lastCommentUserFirstName: any;
  lastCommentUserLastName: any;
  lastCommentText: any;
  lastCommentUserProfilePicture: any;
}

export interface OwnerData5 {
  firstName: string;
  lastName: string;
  userName: string;
  profilePicture: string;
  emailAddress: string;
  phoneNumber: string;
  countryCode: string;
  isFollower: boolean;
  isFollowing: boolean;
  id: number;
}

export interface ProfessionalDetails {
  id: number;
  address: string;
  professionTypeId: number;
  professionalStatusId: number;
}
