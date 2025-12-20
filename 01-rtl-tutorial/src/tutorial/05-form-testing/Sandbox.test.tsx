import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getElement = () => {
  const element = {
    emailInput: screen.getByRole("textbox", { name: /email/i }),
    passwordInput: screen.getByLabelText("Password"),
    confirmPasswordInput: screen.getByLabelText(/confirm password/i),
    submitButton: screen.getByRole("button", { name: /submit/i }),
  };
  return element;
};

describe("05-form-testing", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    render(<Sandbox />);
  });
  test("check if input are initailly empty", () => {
    const { emailInput, passwordInput, confirmPasswordInput } = getElement();

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");

    expect(confirmPasswordInput).toHaveValue("");
  });

  test("check if user can type in the input field", async () => {
    const { emailInput, passwordInput, confirmPasswordInput } = getElement();

    await user.type(emailInput, "test@gmail.com");
    expect(emailInput).toHaveValue("test@gmail.com");
    await user.type(passwordInput, "Olabisi@12");
    expect(passwordInput).toHaveValue("Olabisi@12");
    await user.type(confirmPasswordInput, "Olabisi@12");
    expect(confirmPasswordInput).toHaveValue("Olabisi@12");
  });
  test("should show email error if email is invalid", async () => {
    const { emailInput, submitButton } = getElement();
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    await user.type(emailInput, "victor@gmailcom");
    await user.click(submitButton);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    // await user.type()
  });
  test("should show eror msg if password is less than 5", async () => {
    const { passwordInput, emailInput, submitButton } = getElement();

    const errorMsg = /password must be at least 5 characters/i;
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "abc");
    await user.click(submitButton);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
  test("should show error if password dont match", async () => {
    const { passwordInput, confirmPasswordInput, emailInput, submitButton } =
      getElement();
    const errorMsg = /passwords do not match/i;
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "secret");
    await user.type(confirmPasswordInput, "not secret");
    await user.click(submitButton);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
  test("valid inputs show no error and clear fields", async () => {
    const { emailInput, passwordInput, confirmPasswordInput, submitButton } =
      getElement();
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "secret");
    await user.type(confirmPasswordInput, "secret");
    await user.click(submitButton);

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(confirmPasswordInput).toHaveValue("");
  });
});
