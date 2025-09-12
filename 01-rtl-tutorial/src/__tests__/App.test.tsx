import { render, screen } from "@testing-library/react";
// Note: technically already available globally
import { test, expect } from "vitest";
import App from "../App";

// Test if heading renders correctly
test("should render heading with correct text", () => {
  // Render the App component
  render(<App />);

  // Log the DOM tree for debugging
  screen.debug();

  // Find heading by its text content
  const heading = screen.getByText("React Testing Library");

  // Verify heading exists in document
  expect(heading).toBeInTheDocument();
});

test("this empty test will pass", () => {
  const sum = 1 + 1;
  expect(sum).toBe(2);
});
