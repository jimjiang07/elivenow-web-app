import { USER_ROLES } from '../constants';

export const isTeacherTitle = (externalUserId) =>
  externalUserId && externalUserId.includes(USER_ROLES.TEACHER);

export const extractUserInfo = (externalUserId = '') => {
  const sections = externalUserId.split('_');

  if (sections.length < 3) {
    return {};
  }

  return {
    attendeeId: sections[0],
    userName: sections[1],
    userRole: sections[2],
  };
};
