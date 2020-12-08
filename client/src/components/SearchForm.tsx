import React from "react";
import { MovieType } from "./MoviePreview";
import SelectSequence from "./SelectSequence";
import Spinner from "./Spinner";
import { MIN_YEAR } from "../constants";

export interface SearchTerms {
  page: number;
  search?: string;
  type?: string;
  year?: string;
}

interface Props {
  isLoading: boolean;
  onChange(terms: SearchTerms): void;
  terms: SearchTerms;
}

export const SearchForm = ({ isLoading, onChange, terms }: Props) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({
      ...terms,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <div className="form-group spinner-container">
        <Spinner active={isLoading} />
        <input
          id="search"
          type="text"
          className="form-control"
          placeholder="Search for"
          onChange={handleChange}
          value={terms.search || ""}
        />
      </div>
      <div className="row">
        <div className="col-sm">
          <div className="form-group">
            <label htmlFor="type">Movie type</label>
            <select
              className="form-control"
              id="type"
              onChange={handleChange}
              value={terms.type}
            >
              <option value="">Select</option>
              {Object.keys(MovieType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-sm">
          <div className="form-group">
            <SelectSequence
              end={new Date().getFullYear()}
              id="year"
              label="Year"
              onChange={handleChange}
              start={MIN_YEAR}
              value={terms.year || ""}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchForm;
