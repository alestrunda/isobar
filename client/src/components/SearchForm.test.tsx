import React from "react";
import { fireEvent, render } from "@testing-library/react";

import SearchForm from "./SearchForm";

test("can type into search field", () => {
  const onChange = jest.fn();
  const form = render(
    <SearchForm isLoading={false} onChange={onChange} terms={{ page: 1 }} />
  );
  const input = form.getByPlaceholderText("Search for") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "my movie" } });
  expect(onChange).toBeCalledWith({ page: 1, search: "my movie" });
});
