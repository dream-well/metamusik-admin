import { gql } from '@apollo/client'

export const ADMIN_LOGIN = gql `
    mutation adminLogin($email: String!, $password: String!) {
        adminLogin(email: $email, password: $password) {
            authToken {
                expiresAt,
                token
            }
        }
    }
`