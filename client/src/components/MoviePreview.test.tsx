import React from "react";
import { render, screen } from "@testing-library/react";

import MoviePreview, { MovieType } from "./MoviePreview";

test("renders correctly", () => {
  render(
    <MoviePreview
      imdbID="123abc"
      Poster="image.jpg"
      Title="Movie"
      Type={MovieType.movie}
      Year="2020"
    />
  );

  expect(screen.queryByText("Movie")).toBeInTheDocument();
  expect(screen.queryByText("2020 - movie")).toBeInTheDocument();
  expect(screen.queryByText("Open on IMDb")).toBeInTheDocument();
});
