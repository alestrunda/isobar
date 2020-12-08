import { SearchTerms } from "../components/SearchForm";

const SEARCH_TERM_MAPPING = {
  page: "page",
  search: "s",
  type: "type",
  year: "y",
};

const addQueryParam = (query: string, key: string, value = "") => {
  const pair = `${key}=${value.trim()}`;
  return query ? `${query}&${pair}` : pair;
};

const normalizeQueryValue = (value: string | number | undefined) =>
  typeof value === "number" ? value.toString() : value;

export const setUpSearchQuery = (terms: SearchTerms) => {
  let query = "";
  Object.keys(terms).forEach((key) => {
    query = addQueryParam(
      query,
      SEARCH_TERM_MAPPING[key as keyof SearchTerms],
      normalizeQueryValue(terms[key as keyof SearchTerms])
    );
  });
  return query;
};
