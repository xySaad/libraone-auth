export async function fetchGraphQL<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {},
  endpoint: string,
  jwt: string,
): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(result.errors)}`);
  }

  return result.data as T;
}
