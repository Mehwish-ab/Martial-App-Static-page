import { loginDataTypes } from '../redux/features/types'

// base urls
const liveBaseUrl = 'https://fistastore.com:444/martialapp_apis/'
const testBaseUrl = 'https://fistastore.com:444/martialapp_apis/'
const liveMediaUrl = 'https://fistastore.com:444'
const testMediaUrl = 'https://fistastore.com:444'
const domianLiveUrl = 'https://maritalschool.innovatelq.com/'
const domianTestUrl = 'https://maritalschool.innovatelq.com/'

// const liveMediaUrl = "https://ennvisionapistore.com:8443";
// const testMediaUrl = "https://ennvisionapistore.com:8443";
// const domianLiveUrl = "https://maritalschool.innovatelq.com/";
// const domianTestUrl = "https://maritalschool.innovatelq.com/";
const isLive = false

// base urls
export const mediaURL = 'https://fistastore.com:444'
export const base_url = isLive ? liveBaseUrl : testBaseUrl
export const live_base_url = isLive ? domianLiveUrl : domianTestUrl
export const media_base_url = isLive ? liveMediaUrl : testMediaUrl

// user urls
export const app_data_url = 'api/getAppData'
export const screen_translations = 'translation/getScreenTranslation'
export const signup_url = 'api/auth/signup'
export const login_url = 'api/auth/signin'
export const oauth_signup_url = '/oauth2/signup'
export const oauth_signin_url = '/oauth2/signin'

export const all_users_url = 'admin/user/getAllUsers?pageNo='
export const user_details_url = 'admin/user/getdetails'
export const profile_details_url = 'user/viewUserProfile'
export const delete_user_url = 'user/deleteUser'
export const user_update_status_url = 'admin/user/updateStatus'
export const search_user_by_admin_url = 'admin/user/search'
export const update_user = 'admin/user/updateUser'
export const user_profile_url = 'user/viewUserProfile'
export const upload_profile_url = 'user/uploadProfilePicture'
export const user_posts_url = 'post/getPostsByUserId'

// follow unfollow urls
export const newsfeed_url = 'newsfeed/getall?pageNo='
export const follow_url = 'user/followto'
export const unfollow_url = 'user/unfollowto'
export const get_all_followers_url = 'user/getfollowers?userId='
export const get_all_following = '/user/getfollowing?userId='

// professional urls
export const create_pro_verfiy_otp =
    'user/professional/CreateProfessional/verifyOTP'
export const check_user_exist_url = 'user/becomeProfessional/isExist'
export const professions_dropdown_url = 'profession/getallprofessions'
export const become_professional_url = 'user/becomeProfessional'
export const all_professional_url = 'admin/user/professionals/getAll'
export const search_professional_url = 'user/professionals/search'
export const update_professional_url = 'user/becomeProfessional/edit'
export const professional_details_url = 'user/professionals/getDetails'
export const delete_professional_url = 'user/professional/delete'
export const update_professional_status_url = '/admin/professional/updatestatus'
// post urls
export const create_post_url = 'post/create'
export const post_details_url = 'post/getPostDetails?postId='
export const post_list_url = 'post/getAllPosts'
export const update_post_url = 'post/edit'
export const delete_post_url = 'post/delete'

// story urls
export const create_story_url = 'story/create'
export const delete_story_url = 'story/delete'
export const user_stories_url = 'story/getStoriesByUserId'
export const stories_url = 'newsfeed/getstories?pageNo='

// comments urls
export const reply_comments_url = ''
export const add_comments_url = 'newsfeed/addcomment'
export const edit_comments_url = 'newsfeed/editcomment'
export const get_comments_url = 'newsfeed/getAllComments?newsFeedId='
export const delete_comment_url = 'newsfeed/deletecomment'

export const mpac_create_property_url = '/property/mpac/getMPACProperty'
export const mpac_card_charging_url =
    '/creditcard/property/chargeMpacFeeByPlans'
export const get_invoices_urls = 'getTransactionHistory'
// credit card urls
export const add_credit_card_url = 'creditCard/addCreditCard'
export const get_credit_card_url = 'creditCard/getCreditCard'
export const mark_credit_card_default_url = 'creditCard/markCreditCardDefault'
export const credit_cards__list_url = 'creditCard/loadAllCreditCards'
export const delete_credit_card_url = 'creditCard/deleteCreditCard'
export const professional_plans = '/professional/plans/getPlansDetails'
export const charge_On_plan_url = 'creditCard/chargeCustomerByPlan'
// property urls
export const create_property_url = 'property/create'
export const property_details_url = 'property/getPropertyDetails'
export const draft_property_url = '/property/draft'
export const edit_property_url = 'property/edit'
export const property_delete_url = 'property/delete'
export const get_my_properties_url = 'property/getMyProperties'
export const get_all_properties_url = 'property/getAll'
export const update_property_status_url = 'property/updateStatus'
export const get_property_by_status_url = 'property/getMyProperties/seeAll'
// usecases
export const useCaseRegisteration = 'REGISTRATION'
export const useCaseForgetPassowrd = 'FORGETPASSWORD'
export const useCaseBecomeProfessional = 'BECOME_PROFESSIONAL'
// likes urls
export const like_url = 'newsfeed/like'
export const get_all_likes_url = 'newsfeed/getlikes?newsFeedId='

// user location url
export const location_url = 'https://ipinfo.io/json?token=11847a6086fc3e'
// refresh token url
export const refresh_token_url = 'api/auth/refreshtoken'

// forget password urls
export const generate_otp_url = 'otp/generate'
export const verify_otp_url = 'otp/verifyOTP'
export const reset_password_url = 'user/resetPassword'

// user authorized token
export const authorizationToken = (
    loginData: loginDataTypes | string
): object => {
    return {
        Authorization: `Bearer ${
            typeof loginData === 'string'
                ? loginData
                : loginData?.jwtDetails?.token
        }`,
    }
}

// user refresh token
export const refreshToken = (loginData: loginDataTypes): unknown => {
    return {
        refreshToken: `Bearer ${loginData.jwtDetails.refreshToken}`,
    }
}

// school endpoints
export const create_school_url = 'school/create'
export const edit_school_url = 'school/edit'
export const get_school_by_user_id_url = 'school/getById'

// branch endpoint
export const create_branch_url = 'branch/create'
export const edit_branch_url = 'branch/edit'
export const get_branch_by_school_id_url = 'branch/getBySchoolId'
export const get_branch_by_id_url = 'branch/getDetailsById'
export const get_payment = 'paymentMethod/get'
export const get_instructor_by_user_id_url = 'instructor/getByUserId'
export const get_franchise_by_school_id_url = 'franchise/getBySchoolId'
export const get_class_by_school_id_url = 'classes/getSchoolId'

// key of token data in local storage of browser
export const auth_token_key = 'ennvision-admin:token'
