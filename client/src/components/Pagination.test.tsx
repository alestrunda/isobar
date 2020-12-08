import React from "react";
import { render, screen } from "@testing-library/react";

import Pagination from "./Pagination";

describe("When having zero item", () => {
  test("should not display nav buttons", () => {
    render(<Pagination currentPage={1} onChange={() => {}} totalItems={0} />);

    expect(screen.queryByText("Prev page")).toBeNull();
    expect(screen.queryByText("Next page")).toBeNull();
  });
});

describe("When having less items than items per page", () => {
  test("should not display nav buttons", () => {
    render(<Pagination currentPage={1} onChange={() => {}} totalItems={2} />);

    expect(screen.queryByText("Prev page")).toBeNull();
    expect(screen.queryByText("Next page")).toBeNull();
  });
});

describe("When having more items than items per page", () => {
  describe("and is on first page", () => {
    test("should display next button", () => {
      render(
        <Pagination currentPage={1} onChange={() => {}} totalItems={25} />
      );

      expect(screen.queryByText("Next page")).toBeInTheDocument();
    });
  });

  describe("and is not on first page", () => {
    test("should display prev button", () => {
      render(
        <Pagination currentPage={2} onChange={() => {}} totalItems={25} />
      );

      expect(screen.queryByText("Prev page")).toBeInTheDocument();
    });
  });
});
