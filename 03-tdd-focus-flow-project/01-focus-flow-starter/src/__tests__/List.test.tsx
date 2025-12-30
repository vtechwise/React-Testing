import { render, screen } from "@testing-library/react";
import List from "../components/List";
import { Item } from "../utils";

vi.mock("../components/ItemCard", () => {
  return {
    default: () => <article>item card</article>,
  };
});

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
  test("renders list of items", () => {
    render(<List items={mockItems} onDeleteItem={mockOnDelete} />);
    const cardItems = screen.getAllByRole("article");
    expect(cardItems).toHaveLength(mockItems.length);
  });
  test("render empty list when items array is empty", () => {
    render(<List items={[]} onDeleteItem={mockOnDelete} />);
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
