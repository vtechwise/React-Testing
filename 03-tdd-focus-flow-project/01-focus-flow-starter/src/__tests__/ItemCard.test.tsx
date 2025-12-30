import { render, screen } from "@testing-library/react";
import { Item } from "../utils";
import ItemCard from "../components/ItemCard";
import userEvent from "@testing-library/user-event";

type mockProps = Item & {
  onDelete: (id: string) => void;
};

describe("itemCard component", () => {
  const mockProps: mockProps = {
    id: "1",
    category: "important",
    description: "testing 1",
    onDelete: vi.fn(),
    title: "title",
  };
  test("render content correctly", () => {
    render(<ItemCard {...mockProps} />);

    expect(screen.getByRole("heading", { name: /title/i })).toBeInTheDocument();
    expect(screen.getByText(/testing 1/i)).toBeInTheDocument();
    expect(screen.getByText(/important/i)).toBeInTheDocument();
  });
  test("call onDelete function when delete button is being clicked", async () => {
    const user = userEvent.setup();
    render(<ItemCard {...mockProps} />);
    const deleteButton = screen.getByRole("button", {
      name: "delete task : 1",
    });
    await user.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalledWith("1");
  });
});
