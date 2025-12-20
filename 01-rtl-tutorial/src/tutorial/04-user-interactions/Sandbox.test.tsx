import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";
import userEvent from "@testing-library/user-event";

describe("04-user-interations", () => {
  test("screen debug", () => {
    const { container } = render(<Sandbox />);
    logRoles(container);
    screen.debug();
  });
  test("should increment and decrement count using fireEvent", () => {
    render(<Sandbox />);

    const increaseButton = screen.getByRole("button", { name: /increase/i });
    const decreaseButton = screen.getByRole("button", { name: /decrease/i });

    expect(increaseButton).toBeInTheDocument();
    expect(decreaseButton).toBeInTheDocument();
    fireEvent.click(increaseButton);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
  test("should increment and decrement count using userEvent", async () => {
    render(<Sandbox />);
    const increaseButton = screen.getByRole("button", { name: /increase/i });
    const decreaseButton = screen.getByRole("button", { name: /decrease/i });

    const user = userEvent.setup();

    await user.click(increaseButton);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    await user.click(decreaseButton);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });
  test("should show render like amd unlike button whne clicked", async () => {
    render(<Sandbox />);
    const user = userEvent.setup();
    // const liekBtn = screen.getByRole("button", { name: /like button/i });
    const unlikeBtn = screen.getByRole("button", { name: "unlike button" });
    expect(unlikeBtn).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "like button" })
    ).not.toBeInTheDocument();
    await user.click(unlikeBtn);
    expect(
      screen.getByRole("button", { name: "like button" })
    ).toBeInTheDocument();
  });
});
