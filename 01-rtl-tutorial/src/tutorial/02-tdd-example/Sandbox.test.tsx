import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("02-tdd-example", () => {
  test("check if heading is in the document", () => {
    render(<Sandbox />);
    console.log(screen.debug());
    const heading = screen.getByText(/testing react component/i);
    expect(heading).toBeInTheDocument();
  });
});
