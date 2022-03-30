import { get, remove, update, postAsFormInput } from "./api";

import {
  URL_GET_USER_NOTIFICATIONS,
  URL_MARK_NOTIFICATION_AS_READ,
  URL_MARK_ALL_NOTIFICATIONS_AS_READ,
} from "../services/endpoints";

export const getUserNotifications = (id) => {
  const params = {
    userId: id,
  };
  return get(URL_GET_USER_NOTIFICATIONS, params);
};

export const markNotificationAsRead = (notificationId) => {
  const body = {
    notificationId: notificationId,
    isUnread: "0",
  };
  return update(URL_MARK_NOTIFICATION_AS_READ, body);
};

export const markAllNotificationsAsRead = (userId) => {
  const body = {
    userId: userId,
    isUnread: "0",
  };
  return update(URL_MARK_ALL_NOTIFICATIONS_AS_READ, body);
};
