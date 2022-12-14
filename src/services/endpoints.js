//user management
export const URL_LOGIN = "/api/user/login";
export const URL_EDIT_PFP = "/api/profile/images";

//admin management
export const URL_GET_ALL_USERS = "/api/admin/users";
export const URL_BAN_USER = "/api/admin/banuser";
export const URL_UNBAN_USER = "/api/admin/unbanuser";
export const URL_DELIST_LISTING = "/api/admin/delist";
export const URL_GET_DISPUTE_REPORT = "/api/admin/disputes";
export const URL_CLOSE_DISPUTE_REPORT = "/api/admin/close/dispute";
export const URL_OPEN_DISPUTE_REPORT = "/api/admin/open/dispute";



//export const URL_LOGOUT = '/logout';
export const URL_SIGNUP = "/api/user/signup";
export const URL_FORGOT_PASSWORD = "/api/user/forgetpw";
export const URL_GET_MOODBOARD = "/api/user/moodboards";

// profile
export const URL_GET_USERS_POSTS = "/api/post/user";
export const URL_GET_USER_TYPE = "/api/user/getrole";
export const URL_CREATE_SHOP = "/api/user/create/shop";

//listings management
export const URL_GET_LISTINGS = "/api/listings";
export const URL_GET_LISTING_DETAILS = "/api/listing/details";
export const URL_GET_LISTING_SELLER = "/api/listing/getSeller";

//cart management
export const URL_GET_CART = "/api/cart";
export const URL_POST_CART_ITEM = "/api/cart/item";
export const URL_DELETE_CART_ITEM = "/api/cart/deleteItem";
export const URL_DELETE_CART_ITEMS = "/api/cart/deleteItems";

//checkout management
export const URL_CHECKOUT = "/api/checkout";
export const URL_PAYMENT = "/api/payment";

//order management
export const URL_GET_ORDERS = "/api/user/orders";
export const URL_RATE_ORDER = "/api/user/rate";
export const URL_RAISE_DISPUTE = "/api/user/dispute";

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
export const URL_CREATE_POST_LISTINGS = "/api/postListings/create";
export const URL_CREATE_POST_TAGS = "/api/postTags/create";

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

// upload images
export const URL_UPLOAD_PHOTO = "/api/user/uploadPhoto";

// sellercenter
// orders
export const URL_GET_SHOP_ORDERS = "/api/merchant/orders";
export const URL_GET_SHOP_ORDER_DETAIL = "/api/merchant/order/individual";
export const URL_UPDATE_SHOP_ORDER = "/api/merchant/updateOrder";
export const URL_UPDATE_TRACKING_NUMBER = "/api/merchant/updateTrackingNumber";
// listings
export const URL_GET_SHOP_LISTINGS = "/api/merchant/listings";
export const URL_GET_SHOP_LISTING_DETAIL = "/api/merchant/listing/individual";
export const URL_CREATE_SHOP_LISTING = "/api/merchant/createListing";
export const URL_EDIT_SHOP_LISTING = "/api/merchant/editListing";
export const URL_EDIT_SHOP_LISTING_STATUS = "/api/merchant/delistListing";
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
export const URL_DELETE_SHOP_CATEGORY_LISTINGS =
  "/api/merchant/shopCategoryListings/delete";
export const URL_GET_SHOP_CATEGORY_LISTINGS =
  "/api/merchant/shopCategoryListings";
export const URL_REMOVE_SHOP_CATEGORY_LISTING =
  "/api/merchant/shopCategoryListing/remove";
export const URL_ADD_SHOP_CATEGORY_LISTING =
  "/api/merchant/shopCategories/addListing";

// rating
export const URL_GET_SHOP_RATINGS = "/api/merchant/product/review";
export const URL_REPLY_REVIEW = "/api/merchant/replyReview";
// shop profile
export const URL_GET_SELLER_PROFILE = "/api/merchant/sellerProfile";
export const URL_EDIT_SELLER_PROFILE = "/api/user/editSellerAccount";
// income & balance
export const URL_GET_INCOME = "/api/merchant/income";
export const URL_GET_BALANCE = "/api/merchant/balance";
export const URL_UPDATE_BALANCE_WITHDRAW = "/api/merchant/balance/withdraw";
export const URL_GET_MERCHANT_ORDER = "/api/merchant/orders";

// chat
export const URL_CREATE_CHAT = "/api/chat/create";
export const URL_GET_USER_CHATS = "/api/user/chats";
export const URL_CREATE_MESSAGE = "/api/chat/message/create";
export const URL_GET_CHAT_MESSAGES = "/api/chat/message";
export const URL_MARK_CHAT_AS_READ = "/api/chat/read";

// notification
export const URL_GET_USER_NOTIFICATIONS = "/api/user/notifications";
export const URL_MARK_NOTIFICATION_AS_READ = "/api/user/notifications/readone";
export const URL_MARK_ALL_NOTIFICATIONS_AS_READ =
  "/api/user/notifications/readall";
export const URL_CREATE_NOTIFICATION = "/api/user/notifications/create";

// create design requirements
export const URL_CREATE_DESIGN_REQUIREMENT = "/api/design/requirements/create";
export const URL_CREATE_DESIGN_REQUIREMENT_ROOM =
  "/api/design/requirementNumOfRooms/create";
export const URL_CREATE_DESIGN_REQUIREMENT_TAGS =
  "/api/design/requirementTagsJoinTable/create";
export const URL_CREATE_DESIGN_REQUIREMENT_MB =
  "/api/design/moodboardRequirementJoinTable/create";

// get design requirements
export const URL_GET_DESIGN_REQUIREMENT = "/api/design/requirements";
export const URL_GET_DESIGN_REQUIREMENT_ROOM =
  "/api/design/requirementNumOfRooms";
export const URL_GET_DESIGN_REQUIREMENT_TAGS = "/api/design/requirementTags";
export const URL_GET_DESIGN_REQUIREMENT_MB = "/api/design/requirementMoodboard";

// design logs
export const URL_GET_DESIGN_LOGS = "/api/design/designLogs";
export const URL_CREATE_DESIGN_LOG = "/api/design/designLogs/create";

export const URL_CREATE_DESIGN_ORDER = "/api/design/designOrder/create";

// design order status
export const URL_GET_DESIGN_ORDER_STATUS = "/api/design/designOrderStatus";
export const URL_GET_DESIGN_ORDER_DESIGNS = "/api/design/designPackage";
export const URL_GET_DESIGN_ORDER_PRODUCTS =
  "/api/design/designPackage/listings";
export const URL_UPDATE_DESIGN_ORDER_STATUS =
  "/api/design/designOrderStatus/edit";

// quotations
export const URL_UPDATE_CONSULTATION_QUOTATION =
  "/api/design/designOrder/consultQuotation/create";
export const URL_UPDATE_PACKAGE_QUOTATION =
  "/api/design/designOrder/packageQuotation/create";

// create design package
export const URL_CREATE_DESIGN_PACKAGE = "/api/design/designPackage/create";
export const URL_CREATE_DESIGN_LISTINGS =
  "/api/design/designPackage/createListing";

// create review for design
export const URL_CREATE_DESIGN_REVIEW = "/api/design/designPackageReview";

export const URL_GET_PRODUCT_BY_ID =
  "/api/design/designPackage/listings/getdetails";
