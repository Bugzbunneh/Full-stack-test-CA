export const fetchWrapper = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const parsedResponse = (await response.json()) as T;

  return parsedResponse;
};
