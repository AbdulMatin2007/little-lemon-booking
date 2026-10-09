import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

describe("Little Lemon booking form", () => {
  it("renders the booking form and its accessible labels", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /book a table/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
  });

  it("shows validation messages when required details are missing", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /confirm reservation/i }));
    expect(screen.getByRole("alert", { name: "" })).toBeInTheDocument();
  });

  it("shows a confirmation for a valid booking", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Alex Morgan" } });
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: "2099-06-15" } });
    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: "18:00" } });
    fireEvent.click(screen.getByRole("button", { name: /confirm reservation/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/thanks, alex morgan/i);
  });
});
