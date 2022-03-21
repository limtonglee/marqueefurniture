//user management
export const URL_LOGIN = "/api/user/login";
export const URL_EDIT_PFP = "/api/profile/images";

//export const URL_LOGOUT = '/logout';
export const URL_SIGNUP = "/api/user/signup";
export const URL_FORGOT_PASSWORD = "/api/user/forgot";
export const URL_GET_MOODBOARD = "/api/user/moodboards";

//listings management
export const URL_GET_LISTINGS = "/api/listings";
export const URL_GET_LISTING_DETAILS = "/api/listing/details";
export const URL_GET_LISTING_SELLER = "/api/listing/getSeller";

//cart management
export const URL_GET_CART = "/api/cart"
export const URL_POST_CART_ITEM = "/api/cart/item"
export const URL_DELETE_CART_ITEM = "/api/cart/deleteItem"
export const URL_DELETE_CART_ITEMS = "/api/cart/deleteItems"


//liked listings management
export const URL_LISTING_LIKE = "/api/listing/like"; // user liking a post
export const URL_LISTING_UNLIKE = "/api/listing/unlike"; // user unliking a post
export const URL_GET_LISTING_LIKE = "/api/listing/allLikes"; //getting all the user from the liked listing
export const URL_GET_LISTING_LIKE_USER = "/api/listing/allLikes/user"; //getting all the liked listings from the user

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

// get profilepic by id
export const URL_GET_PROFILEPIC_BY_ID = "/api/user/profilepic"; // new

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
export const URL_GET_MERCHANT_ORDER = "/api/merchant/orders";

// chat
export const URL_CREATE_CHAT = "/api/chat/create";
export const URL_GET_USER_CHATS = "/api/user/chats";
export const URL_CREATE_MESSAGE = "/api/chat/message/create";
export const URL_GET_CHAT_MESSAGES = "/api/chat/message";
