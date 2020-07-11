export const extractUserInfo = (externalUserId) => {
  if (!externalUserId) {
    return {};
  }

  const sections = externalUserId.split('_');
  let userInfo = {};

  if (sections.length >= 3) {
    userInfo.userName = sections[1];
    userInfo.userRole = sections[2];
  }

  return userInfo;
}