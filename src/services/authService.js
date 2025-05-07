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

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(input: { email: $email })
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(input: { token: $token, newPassword: $newPassword })
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