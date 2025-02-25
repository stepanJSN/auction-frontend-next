import { auctionService } from "./auctionService";
import { apiWithAuth } from "../apiConfig";
import {
  AuctionTypeEnum,
  IUpdateAuction,
} from "../interfaces/auctions.interfaces";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { AxiosError } from "axios";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";

jest.mock("../apiConfig", () => ({
  apiWithAuth: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("auctionService", () => {
  const errorCode = 500;
  const mockErrorResponse = (new AxiosError("Request failed").response = {
    status: errorCode,
  } as AxiosError["response"]);
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    const mockData = {
      cardId: "card1",
      startingBid: 100,
      minBidStep: 2,
      maxBid: 1000,
      minLength: 100,
      endTime: "2023-08-01T00:00:00.000Z",
    };

    it("should create an auction", async () => {
      const result = await auctionService.create(mockData);
      expect(apiWithAuth.post).toHaveBeenCalledWith("/auctions", mockData);
      expect(result).toEqual({
        status: MutationStatusEnum.SUCCESS,
      });
    });

    it("should return error if was not created", async () => {
      (apiWithAuth.post as jest.Mock).mockRejectedValue(mockErrorResponse);
      const result = await auctionService.create(mockData);
      expect(apiWithAuth.post).toHaveBeenCalledWith("/auctions", mockData);
      expect(result).toEqual({
        status: MutationStatusEnum.ERROR,
        errorCode,
      });
    });
  });

  describe("findAll", () => {
    const mockResponse = {
      data: {
        data: [],
        info: { page: 1, totalCount: 0, totalPages: 0 },
      },
    };
    it("should find all auctions with correct parameters and query /auctions endpoint if type is AVAILABLE", async () => {
      const mockPayload = {
        page: 1,
        cardName: "Test Card",
        type: AuctionTypeEnum.AVAILABLE,
      };
      jest.spyOn(apiWithAuth, "get").mockResolvedValue(mockResponse);

      const response = await auctionService.findAll(mockPayload);
      const [[, options]] = (apiWithAuth.get as jest.Mock).mock.calls;
      const receivedParams = Object.fromEntries(options.params);

      expect(receivedParams).toEqual({
        page: mockPayload.page.toString(),
        cardName: mockPayload.cardName,
      });

      expect(apiWithAuth.get).toHaveBeenCalledWith(
        "/auctions",
        expect.any(Object),
      );
      expect(response).toEqual({
        data: mockResponse.data,
        status: QueryStatusEnum.SUCCESS,
      });
    });

    it("should status 'error' if request failed", async () => {
      const mockPayload = {
        page: 1,
        cardName: "Test Card",
        type: AuctionTypeEnum.AVAILABLE,
      };
      jest.spyOn(apiWithAuth, "get").mockRejectedValue(mockErrorResponse);

      const response = await auctionService.findAll(mockPayload);

      expect(response).toEqual({
        status: QueryStatusEnum.ERROR,
      });
    });

    it("should find all auctions with correct parameters and query /auctions/createdByUser endpoint if type is CREATED_BY_USER", async () => {
      const mockPayload = {
        type: AuctionTypeEnum.CREATED_BY_USER,
      };
      jest.spyOn(apiWithAuth, "get").mockResolvedValue(mockResponse);

      const response = await auctionService.findAll(mockPayload);

      expect(apiWithAuth.get).toHaveBeenCalledWith(
        "/auctions/createdByUser",
        expect.any(Object),
      );
      expect(response).toEqual({
        data: mockResponse.data,
        status: QueryStatusEnum.SUCCESS,
      });
    });

    it("should find all auctions with correct parameters and query /auctions/wonByUser endpoint if type is WON_BY_USER", async () => {
      const mockPayload = {
        type: AuctionTypeEnum.WON_BY_USER,
      };
      jest.spyOn(apiWithAuth, "get").mockResolvedValue(mockResponse);

      const response = await auctionService.findAll(mockPayload);

      expect(apiWithAuth.get).toHaveBeenCalledWith(
        "/auctions/wonByUser",
        expect.any(Object),
      );
      expect(response).toEqual({
        data: mockResponse.data,
        status: QueryStatusEnum.SUCCESS,
      });
    });
  });

  describe("findPriceRange", () => {
    it("should find price range", async () => {
      const mockPriceRange = { min: 10, max: 100 };
      jest
        .spyOn(apiWithAuth, "get")
        .mockResolvedValue({ data: mockPriceRange });
      const priceRange = await auctionService.findPriceRange();
      expect(priceRange).toEqual({
        data: mockPriceRange,
        status: QueryStatusEnum.SUCCESS,
      });
      expect(apiWithAuth.get).toHaveBeenCalledWith("/auctions/priceRange");
    });

    it("should return 'error' status if request failed", async () => {
      jest.spyOn(apiWithAuth, "get").mockRejectedValue(mockErrorResponse);
      const priceRange = await auctionService.findPriceRange();
      expect(priceRange).toEqual({ status: QueryStatusEnum.ERROR });
    });
  });

  describe("findOne", () => {
    it("should find an auction by id", async () => {
      const auctionId = "auction1Id";
      const mockAuction = {
        id: auctionId,
        starting_bid: 100,
        min_bid_step: 2,
      };
      jest.spyOn(apiWithAuth, "get").mockResolvedValue({ data: mockAuction });
      const auction = await auctionService.findOne(auctionId);
      expect(auction).toEqual({
        data: mockAuction,
        status: QueryStatusEnum.SUCCESS,
      });
      expect(apiWithAuth.get).toHaveBeenCalledWith(`/auctions/${auctionId}`);
    });

    it("should return 'error' status if request failed", async () => {
      const auctionId = "auction1Id";
      jest.spyOn(apiWithAuth, "get").mockRejectedValue(mockErrorResponse);
      const auction = await auctionService.findOne(auctionId);
      expect(auction).toEqual({ status: QueryStatusEnum.ERROR });
      expect(apiWithAuth.get).toHaveBeenCalledWith(`/auctions/${auctionId}`);
    });
  });

  describe("update", () => {
    it("should update an auction", async () => {
      const auctionId = "auction1Id";
      const mockUpdateAuctionData = {
        startingBid: 200,
      };
      const response = await auctionService.update(
        auctionId,
        mockUpdateAuctionData as IUpdateAuction,
      );
      expect(apiWithAuth.patch).toHaveBeenCalledWith(
        `/auctions/${auctionId}`,
        mockUpdateAuctionData,
      );
      expect(response).toEqual({ status: QueryStatusEnum.SUCCESS });
    });

    it("should return 'error' status with status code", async () => {
      const auctionId = "auction1Id";
      const mockUpdateAuctionData = {
        startingBid: 200,
      };
      jest.spyOn(apiWithAuth, "patch").mockRejectedValue(mockErrorResponse);
      const response = await auctionService.update(
        auctionId,
        mockUpdateAuctionData as IUpdateAuction,
      );
      expect(response).toEqual({ status: QueryStatusEnum.ERROR, errorCode });
    });
  });

  describe("delete", () => {
    it("should delete an auction", async () => {
      const auctionId = "auction1Id";
      const response = await auctionService.delete(auctionId);
      expect(apiWithAuth.delete).toHaveBeenCalledWith(`/auctions/${auctionId}`);
      expect(response).toEqual({
        status: QueryStatusEnum.SUCCESS,
      });
    });

    it("should delete an auction", async () => {
      const auctionId = "auction1Id";
      jest.spyOn(apiWithAuth, "delete").mockRejectedValue(mockErrorResponse);
      const response = await auctionService.delete(auctionId);
      expect(response).toEqual({
        status: QueryStatusEnum.ERROR,
      });
    });
  });
});
