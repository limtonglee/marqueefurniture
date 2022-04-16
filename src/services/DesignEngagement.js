import { get, remove, update, postAsFormInput } from "./api";
import axios from "axios";
import {
  URL_CREATE_DESIGN_REQUIREMENT,
  URL_CREATE_DESIGN_REQUIREMENT_ROOM,
  URL_CREATE_DESIGN_REQUIREMENT_TAGS,
  URL_CREATE_DESIGN_REQUIREMENT_MB,
} from "../services/endpoints";

export const createDesignRequirement = (
  requestType,
  floorplan1,
  floorplan2,
  floorplan3,
  comments,
  userId
) => {
  const body = {
    requestType: requestType,
    floorplan1: floorplan1,
    floorplan2: floorplan2,
    floorplan3: floorplan3,
    comments: comments,
    userId: userId,
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
