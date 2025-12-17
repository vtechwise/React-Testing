import { logRoles, render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("-03-search-by-role", () => {
  test("render nav and navigations links", () => {
    const { container } = render(<Sandbox />);

    logRoles(container);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });
  test("renders headings with correct hierarchy", () => {
    render(<Sandbox />);
    expect(
      screen.getByRole("heading", { name: /main heading/i, level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /subheading/i, level: 2 })
    ).toBeInTheDocument();
  });

  test("renders image", () => {
    render(<Sandbox />);
    expect(screen.getByRole("img", { name: /example/i })).toBeInTheDocument();
  });

  test("renders initial buttons", () => {
    render(<Sandbox />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  test("error button is not initially visible", () => {
    render(<Sandbox />);
    expect(
      screen.queryByRole("button", { name: /error/i })
    ).not.toBeInTheDocument();
  });

  test("aysync button appear after delay", async () => {
    render(<Sandbox />);
    const buttonName = /async button/i;
    expect(
      screen.queryByRole("button", { name: buttonName })
    ).not.toBeInTheDocument();

    const asyncButton = await screen.findByRole("button", { name: buttonName });
    expect(asyncButton).toBeInTheDocument();
  });
});
