import React, { useState } from "react";
import Alert from "../components/Alert";
import MoviePreview, { Movie } from "../components/MoviePreview";
import Pagination from "../components/Pagination";
import { SearchForm, SearchTerms } from "../components/SearchForm";
import useMovieSearch from "../hooks/useMovieSearch";

const STARTING_PAGE = 1;

const getDefaultSearchTerms = () => ({
  page: STARTING_PAGE,
});

function Home() {
  const [searchTerms, setSearchTerms] = useState<SearchTerms>(
    getDefaultSearchTerms()
  );
  const [error, isLoading, movies, searchError, total] = useMovieSearch(
    searchTerms
  );

  const handleSearchChange = (terms: SearchTerms) => {
    setSearchTerms(resetSearchTermPage(terms));
  };

  const resetSearchTermPage = (terms: SearchTerms) => ({
    ...terms,
    page: STARTING_PAGE,
  });

  const handlePageChange = (page: number) => {
    setSearchTerms({
      ...searchTerms,
      page,
    });
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="font-weight-normal mb-3">Movies search</h1>
        <SearchForm
          isLoading={isLoading}
          onChange={handleSearchChange}
          terms={searchTerms}
        />
        <hr className="mb-4 mt-4" />
        <h2 className="font-weight-normal mb-3">Results ({total}):</h2>
        {error && <p className="text-danger">{error}</p>}
        {searchError && <Alert>{searchError}</Alert>}
        {searchTerms.search && (
          <div className="row">
            {movies.map((movie: Movie) => (
              <div key={movie.imdbID} className="col-md-4">
                <MoviePreview {...movie} />
              </div>
            ))}
          </div>
        )}
        <Pagination
          currentPage={searchTerms.page}
          disabled={isLoading}
          onChange={handlePageChange}
          totalItems={total}
        />
      </div>
    </div>
  );
}

export default Home;
