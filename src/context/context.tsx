import React, {
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
} from "react";
import {
  mpacAvailableListingPlanTypes,
  mpacAvailableReportingPlan,
} from "../redux/features/types";
import {
  createPropertyDataTypes,
  mpacAdditionalDetailTypes,
  mpacCreatePropertyDataTypes,
} from "./types";

type contextApiData = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchHandler: () => void;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  profileImageURL: string;
  setProfileImageURL: Dispatch<SetStateAction<string>>;
  usersListPage: number;
  setUsersListPage: Dispatch<SetStateAction<number>>;
  professionalsListPage: number;
  setProfessionalsListPage: Dispatch<SetStateAction<number>>;
  createPostFiles: any[];
  setCreatePostFiles: Dispatch<SetStateAction<any[]>>;
  createStoryImages: any[];
  setCreateStoryImages: Dispatch<SetStateAction<any[]>>;
  createStoryVideos: any[];
  setCreateStoryVideos: Dispatch<SetStateAction<any[]>>;
  userPhoneNumber: string | number;
  setUserPhoneNumber: Dispatch<SetStateAction<string | number>>;
  createPropertyPlan: mpacAvailableListingPlanTypes | null;
  setCreatePropertyPlan: Dispatch<mpacAvailableListingPlanTypes | null>;
  createPropertyReport: mpacAvailableReportingPlan[] | null;
  setCreatePropertyReport: Dispatch<mpacAvailableReportingPlan[] | null>;
  mpacCreatePropertyData: mpacCreatePropertyDataTypes | null;
  setMpacCreatePropertyData: Dispatch<mpacCreatePropertyDataTypes>;
  createPropertyData: createPropertyDataTypes;
  setCreatePropertyData: Dispatch<createPropertyDataTypes>;
  generatePropertyInfo: any;
  setGeneratePropertyInfo: any;
  generatePropertyType: string;
  setGeneratePropertyType: Dispatch<SetStateAction<string>>;
  generatePropertyNumber: number;
  setGeneratePropertyNumber: Dispatch<SetStateAction<number>>;
  mpacAdditionalDetailsData: null | mpacAdditionalDetailTypes;
  setMpacAdditionalDetailsData: Dispatch<
    SetStateAction<mpacAdditionalDetailTypes>
  >;
  propertyPurpose: string;
  setPropertyPurpose: Dispatch<SetStateAction<string>>;
  slideIndex: number;
  setSlideIndex: Dispatch<SetStateAction<number>>;
  showPropertyOptions: boolean;
  setShowPropertyOptions: Dispatch<React.SetStateAction<boolean>>;
  counter: number;
  setCounter: Dispatch<React.SetStateAction<number>>;
};

const AppContext = createContext({} as contextApiData);

type appProviderProps = {
  children: ReactNode;
};

const AppProvider: React.FC<appProviderProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [usersListPage, setUsersListPage] = useState(1);
  const [professionalsListPage, setProfessionalsListPage] = useState(1);
  const [createPostFiles, setCreatePostFiles] = useState<Array<any>>([]);
  const [createStoryImages, setCreateStoryImages] = useState<Array<any>>([]);
  const [createStoryVideos, setCreateStoryVideos] = useState<Array<any>>([]);
  const [userPhoneNumber, setUserPhoneNumber] = useState<string | number>("");
  const [profileImageURL, setProfileImageURL] = useState("");
  const [createPropertyPlan, setCreatePropertyPlan] =
    useState<null | mpacAvailableListingPlanTypes>(
      {} as mpacAvailableListingPlanTypes
    );
  const [slideIndex, setSlideIndex] = useState(0);
  const [createPropertyReport, setCreatePropertyReport] = useState<
    null | mpacAvailableReportingPlan[]
  >([] as mpacAvailableReportingPlan[]);
  const [mpacCreatePropertyData, setMpacCreatePropertyData] =
    useState<null | mpacCreatePropertyDataTypes>(
      {} as mpacCreatePropertyDataTypes
    );
  const [createPropertyData, setCreatePropertyData] = useState(
    {} as createPropertyDataTypes
  );
  const [generatePropertyInfo, setGeneratePropertyInfo] = useState<any>({
    typeOfProperty: "Residential",
  });
  const [generatePropertyType, setGeneratePropertyType] =
    useState("Residential");
  const [generatePropertyNumber, setGeneratePropertyNumber] = useState(0);
  const [mpacAdditionalDetailsData, setMpacAdditionalDetailsData] = useState(
    {} as mpacAdditionalDetailTypes
  );
  const [propertyPurpose, setPropertyPurpose] = useState("Rent");
  const [showPropertyOptions, setShowPropertyOptions] = useState(false);
  const [counter, setCounter] = useState(0);

  const searchHandler = () => {};
  // console.log({ createPropertyReport, createPropertyPlan });
  console.log({ generatePropertyType });

  return (
    <AppContext.Provider
      value={{
        showSidebar,
        profileImageURL,
        setProfileImageURL,
        setShowSidebar,
        searchText,
        setSearchText,
        searchHandler,
        isSearching,
        setIsSearching,
        usersListPage,
        setUsersListPage,
        professionalsListPage,
        setProfessionalsListPage,
        createPostFiles,
        setCreatePostFiles,
        createStoryImages,
        setCreateStoryImages,
        createStoryVideos,
        setCreateStoryVideos,
        userPhoneNumber,
        setUserPhoneNumber,
        createPropertyPlan,
        setCreatePropertyPlan,
        createPropertyReport,
        setCreatePropertyReport,
        mpacCreatePropertyData,
        setMpacCreatePropertyData,
        createPropertyData,
        setCreatePropertyData,
        generatePropertyInfo,
        setGeneratePropertyInfo,
        generatePropertyType,
        setGeneratePropertyType,
        generatePropertyNumber,
        setGeneratePropertyNumber,
        mpacAdditionalDetailsData,
        setMpacAdditionalDetailsData,
        propertyPurpose,
        setPropertyPurpose,
        slideIndex,
        setSlideIndex,
        showPropertyOptions,
        setShowPropertyOptions,
        counter,
        setCounter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
