//user management
export const URL_LOGIN = "/api/user/login";
//export const URL_LOGOUT = '/logout';
export const URL_SIGNUP = "/api/user/signup";
export const URL_FORGOT_PASSWORD = "/api/user/forgot";
export const URL_GET_MOODBOARD = "/api/user/moodboards";

//listings management
export const URL_GET_LISTINGS = "/api/listings";
export const URL_GET_LISTING_DETAILS = "/api/listing/details";

// posts management
export const URL_GET_POSTS = "/api/posts"; // get all posts
export const URL_GET_POST_DETAILS = "/api/post/details"; // get indiv post details
export const URL_GET_POST_TAGS = "/api/post/tags"; // get tags for indiv post
export const URL_GET_POST_LIKES = "/api/post/likes"; // get likes for indiv post

export const URL_GET_POST_COMMENTS = "/api/post/comments"; // get comments for indiv post
export const URL_CREATE_POST_COMMENTS = "/api/post/createComment"; // create comments for indiv post
export const URL_DELETE_POST_COMMENT = "/api/post/deleteComment"; // delete comments for indiv post

export const URL_GET_POST_LISTINGS = "/api/post/listings"; // get listings for indiv post

export const URL_CREATE_POST = "/api/post/create"; // create post

// get username by id
export const URL_GET_USERNAME_BY_ID = "/api/user"; // new

// like/unlike posts
export const URL_LIKE_POST = "/api/post/like"; // like post
export const URL_UNLIKE_POST = "/api/post/unlike"; // unlike post

// tags
export const URL_GET_TAGS = "/api/tags"; // get all static tags

// pin/unpin posts
export const URL_ADD_POST_TO_MOODBOARD = "/api/post/addPostToMoodboard";
export const URL_DELETE_POST_FROM_MOODBOARD =
  "/api/post/deletePostFromMoodboard";

// moodboards
export const URL_GET_USER_MOODBOARDS = "/api/user/moodboards";
export const URL_GET_MOODBOARD_POSTS = "/api/user/moodboards/post"; // new
export const URL_CREATE_MOODBOARD = "/api/user/moodboard/create";
export const URL_CREATE_MOODBOARD_WITH_POST =
  "/api/user/moodboard/createWithPost";
export const URL_EDIT_MOODBOARD = "/api/user/moodboard/edit"; // new
export const URL_DELETE_MOODBOARD = "/api/user/moodboard/delete";

// sellercenter
// orders
export const URL_GET_SHOP_ORDERS = "/api/merchant/orders";
// listings
export const URL_GET_SHOP_LISTINGS = "/api/merchant/listings";
export const URL_CREATE_SHOP_LISTING = "/api/merchant/createListing";
// vouchers
export const URL_GET_SHOP_VOUCHERS = "/api/merchant/vouchers";
export const URL_EDIT_SHOP_VOUCHER = "/api/merchant/voucher/edit";
export const URL_CREATE_SHOP_VOUCHER = "/api/merchant/voucher/add";
export const URL_DELETE_SHOP_VOUCHER = "/api/merchant/voucher/delete";
// categories
export const URL_GET_SHOP_CATEGORIES = "/api/merchant/shopCategories";
export const URL_CREATE_SHOP_CATEGORY = "/api/merchant/shopCategories/add";
export const URL_EDIT_SHOP_CATEGORY = "/api/merchant/shopCategories/edit";
export const URL_DELETE_SHOP_CATEGORY = "/api/merchant/shopCategories/delete";
export const URL_DELETE_SHOP_CATEGORY_LISTINGS = "/api/merchant/shopCategoryListings/delete";