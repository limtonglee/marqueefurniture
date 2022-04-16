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
