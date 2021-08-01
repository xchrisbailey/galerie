export const galleryQuery: string = `
  query gallery($address: String!) {
    hic_et_nunc_token_holder(where: {holder_id: {_eq: $address}, quantity: {_gt: "0"}, token: {supply: {_gt: "0"}}}, order_by: {id: desc}) {
      token {
        id
        artifact_uri
        display_uri
        thumbnail_uri
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
`;

export async function fetchGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: { address: string | null }
) {
  const result = await fetch('https://api.hicdex.com/v1/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName
    })
  });

  return await result.json();
}
