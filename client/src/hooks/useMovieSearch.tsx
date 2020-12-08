import { useContext, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { Movie } from "../components/MoviePreview";
import { SearchTerms } from "../components/SearchForm";
import { UserContext } from "../context/UserContext";
import { setUpSearchQuery } from "../helpers/search";
import { TYPING_DEBOUNCE } from "../constants";
import { API_URL } from "../settings";

const useMovieSearch = (
  terms: SearchTerms
): [string, boolean, Movie[], string, number] => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [total, setTotal] = useState(0);
  const userContext = useContext(UserContext);

  const search = useRef(
    debounce((terms: SearchTerms) => {
      fetch(`${API_URL}/?${setUpSearchQuery(terms)}`, {
        headers: {
          Authorization: `token ${userContext.apiToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resetSearchState();
          if (data.Error) {
            setSearchError(data.Error);
          } else if (data.message) {
            setError(data.message);
          } else if (data.Search) {
            setTotal(data.totalResults);
            setMovies(data.Search);
          }
        })
        .catch((error) => {
          resetSearchState();
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, TYPING_DEBOUNCE)
  );

  const resetSearchState = () => {
    setSearchError("");
    setError("");
    setTotal(0);
    setMovies([]);
  };

  useEffect(() => {
    if (!terms.search) return;
    setLoading(true);
    search.current(terms);
  }, [terms]);

  return [error, isLoading, movies, searchError, total];
};

export default useMovieSearch;
