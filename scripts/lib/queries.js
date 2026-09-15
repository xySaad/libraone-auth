export const queries = {
  GET_USER_BY_ID: `query GetUserById($userId: Int!) {
  user_by_pk(id: $userId) {
    id
    login
    avatarUrl
    firstName
    lastName
    campus
    githubId
  }
}`,
};
