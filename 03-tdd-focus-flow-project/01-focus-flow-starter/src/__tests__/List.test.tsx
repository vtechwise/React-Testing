import { render, screen } from "@testing-library/react";
import List from "../components/List";
import { Item } from "../utils";

describe("list component", () => {
  const mockItems: Item[] = [
    {
      title: "testing 1",
      description: "description 1",
      id: "1",
      category: "important",
    },
    {
      title: "testing 2",
      description: "description 2",
      id: "2",
      category: "low",
    },
  ];
  const mockOnDelete = vi.fn();
  test("render flow board heading", () => {
    render(<List items={mockItems} onDeleteItem={mockOnDelete} />);
    expect(
      screen.getByRole("heading", { name: /flow board/i, level: 2 })
    ).toBeInTheDocument();
  });
});
