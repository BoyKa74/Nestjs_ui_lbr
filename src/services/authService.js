import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Generatetoken($email: String!, $password: String!) {
    generatetoken(email: $email, password: $password) {
       data
        message
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Regsiter($email: String!, $firstname: String!, $lastname: String!, $password: String!) {
    Regsiter(email: $email, firstname: $firstname, lastname: $lastname, password: $password) {
      data
      message
    }
  }
`;

export const refreshTokenFn = async (client, refreshToken) => {
    try {
        // Add refresh token mutation here when backend provides it
        return null;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
};