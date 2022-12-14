import { get, remove, update, postAsFormInput } from "./api";
import axios from "axios";
import {
  URL_CREATE_DESIGN_REQUIREMENT,
  URL_CREATE_DESIGN_REQUIREMENT_ROOM,
  URL_CREATE_DESIGN_REQUIREMENT_TAGS,
  URL_CREATE_DESIGN_REQUIREMENT_MB,
  URL_GET_DESIGN_LOGS,
  URL_CREATE_DESIGN_LOG,
  URL_CREATE_DESIGN_ORDER,
  URL_GET_DESIGN_ORDER_STATUS,
  URL_GET_DESIGN_ORDER_DESIGNS,
  URL_GET_DESIGN_ORDER_PRODUCTS,
  URL_UPDATE_DESIGN_ORDER_STATUS,
  URL_GET_DESIGN_REQUIREMENT,
  URL_GET_DESIGN_REQUIREMENT_ROOM,
  URL_GET_DESIGN_REQUIREMENT_TAGS,
  URL_GET_DESIGN_REQUIREMENT_MB,
  URL_UPDATE_CONSULTATION_QUOTATION,
  URL_UPDATE_PACKAGE_QUOTATION,
  URL_CREATE_DESIGN_PACKAGE,
  URL_CREATE_DESIGN_LISTINGS,
  URL_CREATE_DESIGN_REVIEW,
  URL_GET_PRODUCT_BY_ID,
} from "../services/endpoints";

export const createDesignRequirement = (
  requestType,
  floorplan1,
  floorplan2,
  floorplan3,
  comments,
  userId,
  designOrderId
) => {
  const body = {
    requestType: requestType,
    floorplan1: floorplan1,
    floorplan2: floorplan2,
    floorplan3: floorplan3,
    comments: comments,
    userId: userId,
    designOrderId: designOrderId,
  };
  return postAsFormInput(URL_CREATE_DESIGN_REQUIREMENT, body);
};

export const createDesignRequirementRoom = (
  roomSize,
  roomType,
  requirementId
) => {
  const body = {
    roomSize: roomSize,
    roomType: roomType,
    requirementId: requirementId,
  };
  return postAsFormInput(URL_CREATE_DESIGN_REQUIREMENT_ROOM, body);
};

export const createDesignRequirementTags = (
  requirementId,
  requirementTagsId
) => {
  const body = {
    requirementId: requirementId,
    requirementTagsId: requirementTagsId,
  };
  return postAsFormInput(URL_CREATE_DESIGN_REQUIREMENT_TAGS, body);
};

export const createDesignRequirementMb = (moodBoardId, requirementId) => {
  const body = {
    moodBoardId: moodBoardId,
    requirementId: requirementId,
  };
  return postAsFormInput(URL_CREATE_DESIGN_REQUIREMENT_MB, body);
};

export const getDesignLogs = (id) => {
  const params = {
    orderId: id,
  };
  return get(URL_GET_DESIGN_LOGS, params);
};

export const createDesignLog = (dateTime, description, role, orderId) => {
  const body = {
    dateTime: dateTime,
    description: description,
    role: role,
    orderId: orderId,
  };
  return postAsFormInput(URL_CREATE_DESIGN_LOG, body);
};

export const createDesignOrder = (timestamp, buyerId, sellerId) => {
  console.log("createDesignOrder service");
  const body = {
    dateTime: timestamp,
    buyerId: buyerId,
    sellerId: sellerId,
  };
  return postAsFormInput(URL_CREATE_DESIGN_ORDER, body);
};

// 1 out of 3
export const getDesignOrderStatus = (sellerId, buyerId) => {
  const params = {
    sellerId: sellerId,
    buyerId: buyerId,
  };
  return get(URL_GET_DESIGN_ORDER_STATUS, params);
};

// 2 out of 3 - get designs of design order
export const getDesignOrderDesigns = (designOrderId) => {
  const params = {
    designOrderId: designOrderId,
  };
  return get(URL_GET_DESIGN_ORDER_DESIGNS, params);
};

// 3 out of 3 - get listings of a design
export const getDesignPackageDesigns = (packageId) => {
  const params = {
    designPackageId: packageId,
  };
  return get(URL_GET_DESIGN_ORDER_PRODUCTS, params);
};

export const updateDesignOrderStatus = (
  buyerId,
  sellerId,
  designOrderStatus
) => {
  const body = {
    buyerId: buyerId,
    sellerId: sellerId,
    designOrderStatus: designOrderStatus,
  };
  return update(URL_UPDATE_DESIGN_ORDER_STATUS, body);
};

export const getDesignRequirement = (id) => {
  const params = {
    userId: id,
  };
  return get(URL_GET_DESIGN_REQUIREMENT, params);
};

export const getDesignRequirementRoom = (id) => {
  const params = {
    requirementId: id,
  };
  return get(URL_GET_DESIGN_REQUIREMENT_ROOM, params);
};

export const getDesignRequirementTags = (id) => {
  const params = {
    requirementId: id,
  };
  return get(URL_GET_DESIGN_REQUIREMENT_TAGS, params);
};

export const getDesignRequirementMb = (id) => {
  const params = {
    requirementId: id,
  };
  return get(URL_GET_DESIGN_REQUIREMENT_MB, params);
};

export const updateConsultationQuotation = (
  designOrderId,
  consultQuotation
) => {
  const body = {
    designOrderId: designOrderId,
    consultQuotation: consultQuotation,
  };
  return update(URL_UPDATE_CONSULTATION_QUOTATION, body);
};

export const updatePackageQuotation = (designOrderId, packageQuotation) => {
  const body = {
    designOrderId: designOrderId,
    packageQuotation: packageQuotation,
  };
  return update(URL_UPDATE_PACKAGE_QUOTATION, body);
};

export const createDesignPackage = (
  dateTime,
  title,
  designImages1,
  designImages2,
  designImages3,
  designerComment,
  designOrderId
) => {
  console.log("dateTime", dateTime);
  const body = {
    dateTime: dateTime,
    title: title,
    designImages1: designImages1,
    designImages2: designImages2,
    designImages3: designImages3,
    designerComment: designerComment,
    isCompleted: "0",
    isReviewed: "0",
    designOrderId: designOrderId,
  };
  return postAsFormInput(URL_CREATE_DESIGN_PACKAGE, body);
};

export const createDesignListings = (packageId, listingId) => {
  const body = {
    packageId: packageId,
    listingId: listingId,
  };
  return postAsFormInput(URL_CREATE_DESIGN_LISTINGS, body);
};

export const createDesignReview = (
  designPackageId,
  userPictureComment1,
  userPictureComment2,
  userPictureComment3,
  userOtherComment,
  isCompleted
) => {
  console.log("createDesignReview service");
  const body = {
    designPackageId: designPackageId,
    userPictureComment1: userPictureComment1,
    userPictureComment2: userPictureComment2,
    userPictureComment3: userPictureComment3,
    userOtherComment: userOtherComment,
    isCompleted: isCompleted,
    isReviewed: "1",
  };
  return postAsFormInput(URL_CREATE_DESIGN_REVIEW, body);
};

export const getProduct = (id) => {
  const params = {
    listingId: id,
  };
  return get(URL_GET_PRODUCT_BY_ID, params);
};
