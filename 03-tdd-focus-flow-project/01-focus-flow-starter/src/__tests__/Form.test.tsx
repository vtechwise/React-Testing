import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { describe } from "vitest";
import Form from "../components/Form";

export const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /title/i }),
    descriptionInput: screen.getByRole("textbox", { name: /description/i }),
    categorySelect: screen.getByRole("combobox", { name: /category/i }),
    submitButton: screen.getByRole("button", { name: /add task/i }),
  };
};

describe("form component", () => {
  let user: UserEvent;
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    user = userEvent.setup();
    mockOnSubmit.mockClear();
    render(<Form onSubmit={mockOnSubmit} />);
  });

  test("render empty form inputs initially", () => {
    const { titleInput, descriptionInput, categorySelect } = getFormElements();

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
  });
  test("submit form with entered values", async () => {
    const { titleInput, descriptionInput, categorySelect, submitButton } =
      getFormElements();
    await user.type(titleInput, "title");
    await user.type(descriptionInput, "task description");
    await user.selectOptions(categorySelect, "urgent");
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "title",
      description: "task description",
      category: "urgent",
    });
  });
  test("test if input fields are required", async () => {
    const { submitButton } = getFormElements();
    await user.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  test("reset form input after submission", async () => {
    const { titleInput, descriptionInput, categorySelect, submitButton } =
      getFormElements();

    await user.type(titleInput, "title");
    await user.type(descriptionInput, "task description");
    await user.selectOptions(categorySelect, "urgent");

    await user.click(submitButton);
    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
  });
});
