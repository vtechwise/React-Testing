import { render, screen } from "@testing-library/react";
import Form from "../Form";
import userEvent from "@testing-library/user-event";

export const getElement = () => {
  const element = {
    emailInput: screen.getByRole("textbox", { name: /email/i }),
    ratingInput: screen.getByRole("combobox", { name: /rating/i }),
    textArea: screen.getByRole("textbox", { name: /your review/i }),
    submitButton: screen.getByRole("button", { name: /submit review/i }),
  };
  return element;
};

describe("form component", () => {
  const mockData = vi.fn();
  beforeEach(() => {
    mockData.mockClear();
  });
  test("check if form are rendered correctly", () => {
    render(<Form addReview={mockData} />);
    const { emailInput, textArea, ratingInput } = getElement();
    expect(emailInput).toHaveValue("");
    expect(ratingInput).toHaveValue("");
    expect(textArea).toHaveValue("");
  });
  test("check if error mssg shows when review is less than 10 characters", async () => {
    const user = userEvent.setup();
    render(<Form addReview={mockData} />);
    const { emailInput, ratingInput, textArea, submitButton } = getElement();
    await user.type(emailInput, "test@test.com");
    await user.selectOptions(ratingInput, "5");
    await user.type(textArea, "short");
    await user.click(submitButton);

    expect(
      screen.getByText("Review must be at least 10 characters long")
    ).toBeInTheDocument();

    expect(mockData).not.toHaveBeenCalled();
  });
  test("valid input", async () => {
    const user = userEvent.setup();
    render(<Form addReview={mockData} />);
    const { emailInput, textArea, ratingInput, submitButton } = getElement();

    await user.type(emailInput, "test@test.com");
    await user.selectOptions(ratingInput, "5");
    await user.type(textArea, "a very good and long review");
    await user.click(submitButton);

    expect(mockData).toHaveBeenCalledTimes(1);
    expect(mockData).toHaveBeenCalledWith({
      email: "test@test.com",
      rating: "5",
      text: "a very good and long review",
    });
  });
});
