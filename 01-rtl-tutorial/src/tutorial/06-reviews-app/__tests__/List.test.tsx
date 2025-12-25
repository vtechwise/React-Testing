import { render, screen } from "@testing-library/react";
import List from "../List";
import { Review } from "../Sandbox";

const mockReviews: Review[] = [
  {
    email: "test@example.com",
    rating: "4",
    text: "Great product!",
  },
  {
    email: "user@example.com",
    rating: "5",
    text: "Excellent service",
  },
];

describe("list component", () => {
  test("check if 'no review yet' when review array is empty", () => {
    render(<List reviews={[]} />);
    expect(screen.getByText(/no reviews yet/i)).toBeInTheDocument();
  });
  test("render review correctly when provided", () => {
    render(<List reviews={mockReviews} />);
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();
      const stars = "⭐".repeat(Number(review.rating));
      expect(screen.getByText(stars)).toBeInTheDocument();
    });
  });
});
