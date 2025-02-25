import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserCardsPage from "./page";
import CardsData from "./CardsData";

jest.mock("./CardsData", () => jest.fn());

jest.mock("@/components/PageLoader", () => jest.fn());

async function generateSearchParams(value: {
  [key: string]: string | string[] | undefined;
}) {
  return value;
}

describe("UserCardsPage", () => {
  it("renders the heading 'My Cards'and sets currentPage to 1 if searchParams is undefined", async () => {
    const params = {};
    render(await UserCardsPage({ searchParams: generateSearchParams(params) }));
    expect(screen.getByText("My Cards")).toBeInTheDocument();
    expect(CardsData).toHaveBeenCalledWith(
      {
        currentPage: 1,
      },
      undefined,
    );
  });

  it("sets currentPage based on searchParams", async () => {
    const params = {
      page: "2",
    };
    render(await UserCardsPage({ searchParams: generateSearchParams(params) }));
    expect(screen.getByText("My Cards")).toBeInTheDocument();
    expect(CardsData).toHaveBeenCalledWith(
      {
        currentPage: 2,
      },
      undefined,
    );
  });
});
