import { gql } from '@apollo/client'

export const GET_USERS = ({searchBy, searchText, id}) => {
    let filter = searchBy && searchText ? `${searchBy}: "${searchText}"` : "";
    if(id) 
        filter = `ids: ["${id}"]`
    return gql `
    query get_users($page: Int, $perPage: Int) {
        data: users(page: $page, perPage: $perPage, filter: {${filter}}) {
            _id,
            avatarUrl,
            nickname,
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

function setDate(date) {
    date.setUTCDate(1);
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    return date;
}

export const GET_USERS_KPI = () => {
    const from = setDate(new Date);
    const to = setDate(new Date);
    to.setMonth(to.getMonth() + 1);
    return gql `
    query {
        newUserCount: adminKpi(
            fromDate: "${from.toUTCString()}", 
            toDate: "${to.toUTCString()}"
        ) 
        {
            value: newUserCount
        },
            totalUserCount: usersMetadata(page: 0) {
            value: count
        }
    }
    `
}



export const GET_TRANSACTIONS = ({searchBy, searchText, id}) => {
    const filter = searchBy && searchText ? `${searchBy}: "${searchText}"` : "";
    if(id) 
        filter = `ids: ["${id}"]`
    return gql `
    query get_transactions($page: Int!, $perPage: Int!) {
        data: transactions(page: $page, perPage: $perPage, filter: {${filter}}) {
            _id,
            nft {
                name
            },

        },
        metadata: transactionsMetadata(page: 0, filter: {${filter}}) {
            count
        }
    }
    `
}

export const GET_OFFERS = ({searchBy, searchText, id}) => {
    const filter = searchBy && searchText ? `${searchBy}: "${searchText}"` : "";
    if(id) 
        filter = `ids: ["${id}"]`
    return gql `
    query get_offers($page: Int!, $perPage: Int!) {
        data: offers(page: $page, perPage: $perPage, filter: {${filter}}) {
            _id,
            nft {
                name
            },
            
        },
        metadata: offersMetadata(page: 0, filter: {${filter}}) {
            count
        }
    }
    `
}

export const GET_AUCTIONS = ({searchBy, searchText, id}) => {
    const filter = searchBy && searchText ? `${searchBy}: "${searchText}"` : "";
    if(id) 
        filter = `ids: ["${id}"]`
    return gql `
    query get_auctions($page: Int!, $perPage: Int!) {
        data: auctions(page: $page, perPage: $perPage, filter: {${filter}}) {
            _id,
            nft {
                name
            },
            
        },
        metadata: auctionsMetadata(page: 0, filter: {${filter}}) {
            count
        }
    }
    `
}

export const GET_ARTISTS = ({searchBy, searchText, id}) => {
    const filter = searchBy && searchText ? `${searchBy}: "${searchText}"` : "";
    if(id) 
        filter = `ids: ["${id}"]`
    return gql `
    query get_artists($page: Int!, $perPage: Int!) {
        data: artists(page: $page, perPage: $perPage, filter: {${filter}}) {
            _id,
            email,
            nickname,
            genres {
                value: name
            },
            projectCount,
            visitorCount,
            saleCount,
            revenue,
            createdAt
        },
        metadata: artistsMetadata(page: 0, filter: {${filter}}) {
            count
        }
    }
    `
}


export const GET_ARTISTS_KPI = () => {
    const from = setDate(new Date);
    const to = setDate(new Date);
    to.setMonth(to.getMonth() + 1);
    return gql `
    query {
        adminKpi(
            fromDate: "${from.toUTCString()}", 
            toDate: "${to.toUTCString()}"
        ) 
        {
          newArtistCount,
          totalRevenue
        },
        artistsMetadata(page: 0) {
          count
        }
    }
    `
}

export const GET_TRANSACTIONS_KPI = () => {
    const from = setDate(new Date);
    const to = setDate(new Date);
    to.setMonth(to.getMonth() + 1);
    return gql `
    query {
        adminKpi(
            fromDate: "${from.toUTCString()}", 
            toDate: "${to.toUTCString()}"
        ) 
        {
            newTransactions: transactionCount,
            transactionsCompleted: transactionCount(status: Completed)
        },
            transactionsMetadata(page: 0) {
            count
        }
    }
    `
}

export const GET_AUCTIONS_KPI = () => {
    const from = setDate(new Date);
    const to = setDate(new Date);
    to.setMonth(to.getMonth() + 1);
    return gql `
    query {
        adminKpi(
            fromDate: "${from.toUTCString()}", 
            toDate: "${to.toUTCString()}"
        ) 
        {
            newAuctions: transactionCount,
            auctionsCompleted: auctionCount(status: Completed)
        },
            auctionsMetadata(page: 0) {
            count
        }
    }
    `
}

export const GET_OFFERS_KPI = () => {
    const from = setDate(new Date);
    const to = setDate(new Date);
    to.setMonth(to.getMonth() + 1);
    return gql `
    query {
        adminKpi(
            fromDate: "${from.toUTCString()}", 
            toDate: "${to.toUTCString()}"
        ) 
        {
            saleCount
        }
    }
    `
}

export const GET_SALES_KPI = () => {
    const from = setDate(new Date);
    const to = setDate(new Date);
    to.setMonth(to.getMonth() + 1);
    return gql `
    query {
        month: adminKpi(
            fromDate: "${from.toUTCString()}", 
            toDate: "${to.toUTCString()}"
        ) 
        {
            saleCount
        },
        all: adminKpi(
            fromDate: "2020-01-01T00:00:00.000Z", 
            toDate: "2030-01-01T00:00:00.000Z"
        ) 
        {
            saleCount
        }
    }
    `
}


export const GET_SALES = ({searchBy, searchText, id}) => {
    const filter = searchBy && searchText ? `${searchBy}: "${searchText}"` : "";
    if(id) 
        filter = `ids: ["${id}"]`
    return gql `
    query get_sales($page: Int!, $perPage: Int!) {
        data: transactions(page: $page, perPage: $perPage, filter: {${filter}}) {
            _id,
    		nft {
                artistNickname,
                name
            }
            seller_nickname: seller { value: nickname },
            metadata {
                percentMarketplace,
                amountMarketplace,
                amountArtist,
                totalPrice,
                fee
            },
            createdAt 
        },
        metadata: transactionsMetadata(page: 0, filter: {${filter}}) {
            count
        }
    }
    `
}


export const GET_GENRES = gql `
    query {
        data: getAllGenres {
            _id,
            label: name,
            createdAt
        }
    }
    `



export const GET_VARIANTS = ({searchBy, searchText, id}) => {
    const filter = searchBy && searchText ? `${searchBy}: "${searchText}"` : "";
    if(id) 
        filter = `ids: ["${id}"]`
    return gql `
    query get_variants($after: Int!, $before: Int!, $cursor: String!) {
        data: listVariants(args: {
            pagination: {after: $after, before: $before, cursor: $cursor},
            criteria: { ${filter} }
        } ) {
            edges {
                cursor,
                node {
                _id,
                projectName,
                artistNickname,
                name,
                price,
                utilities,
                supply,
                remaining,
                createdAt
                }
            },
            pageInfo {
                endCursor,
                hasNextPage,
                hasPrevPage,
                startCursor
            }
            totalCount
        }
    }
    `
}
    
export const GET_PROJECTS = ({searchBy, searchText, id}) => {
    const filter = searchBy && searchText ? `${searchBy}: "${searchText}"` : "";
    if(id) 
        filter = `ids: ["${id}"]`
    return gql `
    query get_variants($after: Int!, $before: Int!, $cursor: String!) {
        data: Projects(args: {
            pagination: {after: $after, before: $before, cursor: $cursor},
            criteria: { ${filter} } 
        } ) {
            edges {
                cursor,
                node {
                    _id,
                    name,
                    artist { nickname },
                    variantCount,
                    variants { price },
                    saleCount,
                    visitorCount,
                    conversionRate,
                    createdAt
                }
            },
            pageInfo {
                endCursor,
                hasNextPage,
                hasPrevPage,
                startCursor
            }
            totalCount
        }
    }
    `
}
    
export const GET_DASHBOARD_KPI = gql`
{
    dashboard: adminKpi(toDate: "2022-12-03T09:54:33Z") {
      newUserCount,
      totalRevenue,
      marketplaceRevenue,
      visitorCount,
          saleCount,
      newProjectCount,
      topSellingProjects(limit: 10) {
        project {
          coverUrl,
          name
          visitorCount,
          revenue,
          saleCount,
          conversionRate
        }
      },
      topUsersByNftCount(limit: 10) {
        user {
          nickname,
          email,
          phoneNumber,
          avatarUrl,
          nftBougthCount
        }
      },
      topViewedProjects(limit: 10) {
        project {
          coverUrl,
          name
          visitorCount,
          revenue,
          saleCount,
          conversionRate
        }
      }
    }
  }
`


export const GET_DASHBOARD_MONTH_KPI = () => {
    const from = setDate(new Date);
    const to = setDate(new Date);
    from.setMonth(to.getMonth() + 1);
    return gql`
    {
        dashboard: adminKpi(fromDate: "${from.toUTCString()}", toDate: "${to.toUTCString()}") {
            topViewedProjects(limit: 10) {
                project {
                coverUrl,
                name
                visitorCount,
                revenue,
                saleCount,
                conversionRate
                }
            },
            newUserCount,
            saleCount
        }
    }
    `
}