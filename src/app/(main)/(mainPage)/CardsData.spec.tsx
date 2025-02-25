import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import CardsData from "./CardsData";
import { cardsService } from "@/services/cardsService";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import PageError from "@/components/PageError";
import CardsGrid from "@/components/CardsGrid";
import NoCards from "./NoCards";
import { Gender } from "@/enums/gender.enum";
import Pagination from "@/components/Pagination";

jest.mock("@/components/Pagination", () => jest.fn());
jest.mock("@/components/CardsGrid", () => jest.fn());
jest.mock("@/components/PageError");
jest.mock("./NoCards");
jest.mock("@/services/cardsService", () => ({
  cardsService: {
    getAll: jest.fn(),
  },
}));

describe("CardsData", () => {
  it("should call cardsService.getAll and return PageError component if request failed", async () => {
    (cardsService.getAll as jest.Mock).mockResolvedValue({
      status: QueryStatusEnum.ERROR,
    });
    render(await CardsData({ currentPage: 1 }));

    expect(cardsService.getAll).toHaveBeenCalledWith({
      page: 1,
      onlyUserCards: true,
    });
    expect(PageError).toHaveBeenCalled();
    expect(CardsGrid).not.toHaveBeenCalled();
  });

  it("should return NoCards component if there are no cards", async () => {
    (cardsService.getAll as jest.Mock).mockResolvedValue({
      status: QueryStatusEnum.SUCCESS,
      data: { data: [] },
    });
    render(await CardsData({ currentPage: 1 }));

    expect(PageError).not.toHaveBeenCalled();
    expect(NoCards).toHaveBeenCalled();
    expect(CardsGrid).not.toHaveBeenCalled();
  });

  it("should return CardsGrid and Pagination component if there are cards", async () => {
    const mockResponse = {
      data: [
        {
          id: "id",
          name: "cardName",
          created_at: "2025-01-01T00:00:00.000Z",
          image_url: "testUrl",
          type: "testType",
          gender: Gender.GENDERLESS,
          is_active: true,
          is_created_by_admin: true,
          location_id: 1,
          is_owned: true,
        },
      ],
      info: {
        page: 1,
        totalCount: 1,
        totalPages: 1,
      },
    };

    (cardsService.getAll as jest.Mock).mockResolvedValue({
      status: QueryStatusEnum.SUCCESS,
      data: mockResponse,
    });
    render(await CardsData({ currentPage: 1 }));

    expect(PageError).not.toHaveBeenCalled();
    expect(NoCards).not.toHaveBeenCalled();
    expect(CardsGrid).toHaveBeenCalledWith(
      {
        cards: mockResponse.data,
        cardActions: expect.any(Function),
      },
      undefined,
    );
    expect(Pagination).toHaveBeenCalledWith(
      {
        totalPages: mockResponse.info.totalPages,
      },
      undefined,
    );
  });
});
