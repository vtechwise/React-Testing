import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("search by text", () => {
  test("check if heading is render correctly", async () => {
    const { container } = render(<Sandbox />);
    console.log(container);
    expect(screen.getByText(/react testing library/i)).toBeInTheDocument();
    expect(screen.getByText(/ regular expression/i)).toBeInTheDocument();

    const errorMessage = screen.queryByText("Error Message");
    expect(errorMessage).not.toBeInTheDocument();

    const items = screen.getAllByText(/item 1/i);
    expect(items).toHaveLength(4);

    const asyncMessage = await screen.findByText(/async message/i);
    expect(asyncMessage).toBeInTheDocument();
  });
});
