export interface User {
  id: number;
  login: string;
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  campus: string;
  githubId: string | null;
}

export interface GetUserByIdResult {
  user_by_pk: User | null;
}

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
} as const;
