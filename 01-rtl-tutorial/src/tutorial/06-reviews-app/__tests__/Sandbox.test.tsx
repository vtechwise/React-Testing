import { findByText, render, screen } from "@testing-library/react";
import Sandbox from "../Sandbox";
import userEvent from "@testing-library/user-event";
import { getElement } from "./Form.test";

describe("Review app", () => {
  test("render review app in sandbox", () => {
    render(<Sandbox />);
    expect(screen.getByText(/reviews app/i)).toBeInTheDocument();
  });
  test("add a new review when form is submiited", async () => {
    const user = userEvent.setup();
    render(<Sandbox />);
    const { emailInput, ratingInput, submitButton, textArea } = getElement();
    await user.type(emailInput, "test@gmail.com");
    await user.selectOptions(ratingInput, "5");
    await user.type(textArea, "a very good and affordable product");
    await user.click(submitButton);

    expect(await screen.findByText("test@gmail.com")).toBeInTheDocument();

    expect(screen.getByText("test@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("⭐".repeat(Number(5)))).toBeInTheDocument();

    expect(
      screen.getByText("a very good and affordable product")
    ).toBeInTheDocument();
  });
});
