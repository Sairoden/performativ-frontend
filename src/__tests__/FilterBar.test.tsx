import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { FilterBar } from "../components";

describe("FilterBar", () => {
  const mockOnSort = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders sort buttons and genre select", () => {
    render(
      <Router>
        <FilterBar onSort={mockOnSort} />
      </Router>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Release Year")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
