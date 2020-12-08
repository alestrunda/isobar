import React from "react";
import { POSTS_PER_PAGE } from "../constants";

interface Props {
  currentPage: number;
  disabled?: boolean;
  onChange(page: number): void;
  totalItems: number;
}

const Pagination = ({
  currentPage,
  disabled = false,
  onChange,
  totalItems,
}: Props) => {
  const handleNextPageClick = () => {
    if (disabled) return;
    onChange(currentPage + 1);
  };

  const handlePrevPageClick = () => {
    if (disabled) return;
    onChange(currentPage - 1);
  };

  const maxPage = Math.ceil(totalItems / POSTS_PER_PAGE);
  if (maxPage === 1) return null;

  return (
    <div className="row">
      <div className="col">
        {currentPage > 1 && (
          <button
            className="btn btn-primary"
            disabled={disabled}
            onClick={handlePrevPageClick}
          >
            Prev page
          </button>
        )}
      </div>
      <div className="col text-right">
        {currentPage < maxPage && (
          <button
            className="btn btn-primary"
            disabled={disabled}
            onClick={handleNextPageClick}
          >
            Next page
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
