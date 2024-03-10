export const generateChatId = (userId1: number | string | null, userId2: number | string | null) => {
  const sortedUserIds = [userId1, userId2].sort();
  return sortedUserIds.join('-');
};
