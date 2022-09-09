import { gql } from '@apollo/client'

export const GET_USERS = ({searchBy, searchText}) => {
    const filter = searchBy && searchText ? `${searchBy}: "${searchText}"` : "";
    return gql `
    query get_users($page: Int!, $perPage: Int!) {
        data: users(page: $page, perPage: $perPage, filter: {${filter}}) {
            _id,
            firstName,
            lastName,
            email,
            genres {
                _id,
                name
            },
            nftBougthCount,
            createdAt
        },
        metadata: usersMetadata(page: 0, filter: {${filter}}) {
            count
        }
    }
    `
}


export const GET_TRANSACTIONS = ({searchBy, searchText}) => {
    const filter = searchBy && searchText ? `${searchBy}: "${searchText}"` : "";
    return gql `
    query get_transactions($page: Int!, $perPage: Int!) {
        data: transactions(page: $page, perPage: $perPage, filter: {${filter}}) {
            _id,
            collection_name: project { value: name },
            seller_nickname: seller { value: nickname },
            buyer_nickname: buyer { value: nickname },
            buyerId,
            variant_name: variant { value: name, },
            variantId
            price,
            createdAt 
        },
        metadata: transactionsMetadata(page: 0, filter: {${filter}}) {
            count
        }
    }
    `
}