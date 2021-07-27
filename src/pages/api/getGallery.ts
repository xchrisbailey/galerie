import { NextApiRequest, NextApiResponse } from "next"

const query = `
  query gallery($address: String!) {
    hic_et_nunc_token_holder(where: {holder_id: {_eq: $address}, quantity: {_gt: "0"}, token: {supply: {_gt: "0"}}}, order_by: {id: desc}) {
      token {
        id
        artifact_uri
        display_uri
        thumbnail_uri
        timestamp
        mime
        title
        description
        
        token_tags {
          tag {
            tag
          }
        }
        creator {
          address
        }
        swaps(where: {status: {_eq: "0"}}, order_by: {price: asc}) {
          amount
          amount_left
          creator_id
          price
        }
      }
    }
  }
`

async function fetchGraphQL(operationsDoc: String, operationName: String, variables: {address: String}) {
  const result = await fetch(
    "https://api.hicdex.com/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  )
  
  return await result.json()
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const {errors, data} = await fetchGraphQL(query, "gallery", {"address": "tz1YM2CwbSi8Zr19jQkV1oShVm1arwHxvPqY"})
  if(errors) throw new Error(errors)
  const result = data.hic_et_nunc_token_holder
  res.json(result)
}
