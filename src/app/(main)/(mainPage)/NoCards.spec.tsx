import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NoCards from "./NoCards";
import { ROUTES } from "@/config/routesConfig";

describe("NoCards", () => {
  it("should render correctly", () => {
    render(<NoCards />);
    expect(screen.getByText("You have no cards")).toBeInTheDocument();
    const buyCards = screen.getByRole("link", {
      name: "Buy cards on auctions",
    });
    const seeAllCards = screen.getByRole("link", { name: "See all cards" });
    expect(buyCards).toBeInTheDocument();
    expect(buyCards).toHaveAttribute("href", ROUTES.AUCTIONS);
    expect(seeAllCards).toBeInTheDocument();
    expect(seeAllCards).toHaveAttribute("href", ROUTES.CARDS);
  });
});
