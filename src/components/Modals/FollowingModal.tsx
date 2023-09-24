import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";
// import { useProfessionalContext } from "../../context/ProfessionalContext";
import { authorizationToken, get_all_following } from "../../utils/api_urls";
import ProfileIntro from "../Custom/ProfileIntro";
import { lightGrey2, tertiaryGrey7 } from "../GlobalStyle";
import Loader from "../Loader/Loader";
import { FollowingModalStyle } from "./style";

export interface followerUserTypes {
  userId: number;
  userProfilePicture: string;
  userFirstName: string;
  userLastName: string;
  followingDateTime: string;
  userUserName: string;
  isFollower: boolean;
}
export interface followerTypes {
  totalItems: number;
  following: followerUserTypes[];
}

type followingProps = {
  isShowModal: boolean;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
};

const FollowingModal: React.FC<followingProps> = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<null | followerTypes>({} as followerTypes);
  const [error, setError] = useState("");
  const followingToastId = useRef<any>();
  // const { isShowFollowing } = useProfessionalContext();

  // loginData
  const { data: loginData } = useAppSelector((state) => state.loginData);

  // get followers promise
  const getFollowingPromise = async () => {
    try {
      setLoading(true);
      const { data: followersData } = await axios(
        get_all_following + loginData?.userDetails.id,
        {
          headers: {
            ...authorizationToken(loginData!),
          },
        }
      );
      setData(followersData.results);
      setLoading(false);

      followingToastId.current = toast("got following successfully", {
        type: "success",
      });
    } catch (error: any) {
      setError(error);
      setLoading(false);
      followingToastId.current = toast(error.responseMessage, {
        type: "error",
      });
    }
  };

  // useEffect(() => {
  //   getFollowingPromise();
  // }, [isShowFollowing]);
  useEffect(() => {
    getFollowingPromise();
  }, []);

  return (
    <FollowingModalStyle>
      {loading ? (
        <Loader />
      ) : error ? (
        <h6 className="text-center">no following available</h6>
      ) : (
        data?.following.map((follower) => (
          <ProfileIntro
            btnColor={tertiaryGrey7}
            btnBgColor={lightGrey2}
            btnText="Remove"
            {...follower}
          />
        ))
      )}
    </FollowingModalStyle>
  );
};

export default FollowingModal;
