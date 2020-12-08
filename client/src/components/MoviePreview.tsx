import React from "react";

export enum MovieType {
  movie = "movie",
  series = "series",
  episode = "episode",
}

export interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: MovieType;
  Year: string;
}

const MoviePreview = ({ imdbID, Poster, Title, Type, Year }: Movie) => (
  <div className="card bg-light">
    {Poster !== "N/A" && (
      <img src={Poster} alt={Title} className="card-img-top" />
    )}
    <div className="card-body">
      <h5 className="card-title">{Title}</h5>
      <h6 className="card-subtitle mb-4 text-muted">
        {Year} - {Type}
      </h6>
      <a
        href={`https://www.imdb.com/title/${imdbID}`}
        className="btn btn-secondary"
      >
        Open on IMDb
      </a>
    </div>
  </div>
);

export default MoviePreview;
