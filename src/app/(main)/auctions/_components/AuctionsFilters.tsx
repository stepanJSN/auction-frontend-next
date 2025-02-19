"use client";
import Select from "@/components/Select";
import Switch from "@/components/Switch";
import { SortOrderEnum } from "@/enums/sortOrder.enum";
import {
  AuctionSortByEnum,
  AuctionTypeEnum,
} from "@/interfaces/auctions.interfaces";
import { Stack, Button, SxProps, Slide, Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import ChangeFiltersVisibilityBtn from "./ChangeFiltersVisibilityBtn";
import useSidebarVisibility from "@/hooks/useSidebarVisibility";
import { AuctionSearchParams } from "../auctionsSearchParams.enum";
import useFilters from "../useFilters";
import DebouncedInput from "@/components/DebouncedInput";
import LocationFilter from "./LocationFilter";
import PriceSlider from "./PriceSlider";

const sortByOptions = [
  { value: AuctionSortByEnum.CREATION_DATE, label: "Creation date" },
  { value: AuctionSortByEnum.FINISH_DATE, label: "Finish date" },
  { value: AuctionSortByEnum.HIGHEST_BID, label: "Highest bid" },
];

const sortOrderOptions = [
  { value: SortOrderEnum.ASC, label: "Ascending" },
  { value: SortOrderEnum.DESC, label: "Descending" },
];

const auctionsTypeOptions = [
  { value: AuctionTypeEnum.AVAILABLE, label: "Available" },
  { value: AuctionTypeEnum.CREATED_BY_USER, label: "My auctions" },
  { value: AuctionTypeEnum.WON_BY_USER, label: "Won by me" },
];

const filterStyles: SxProps = {
  position: {
    xs: "absolute",
    md: "static",
  },
  left: -1,
  height: "100%",
  backgroundColor: "common.white",
  maxWidth: "400px",
  padding: 2,
  zIndex: 1,
};

const toggleFilterContainerStyles = {
  display: {
    md: "none",
  },
};

export default function AuctionsFilters() {
  const searchParams = useSearchParams();

  const auctionType =
    searchParams.get(AuctionSearchParams.TYPE) || AuctionTypeEnum.AVAILABLE;
  const auctionLocationId = searchParams.get(AuctionSearchParams.LOCATION);
  const cardName = searchParams.get(AuctionSearchParams.CARD_NAME);
  const isUserTakePart = !!searchParams.get(
    AuctionSearchParams.IS_USER_TAKE_PART,
  );
  const auctionSortBy =
    searchParams.get(AuctionSearchParams.SORT_BY) ||
    AuctionSortByEnum.CREATION_DATE;
  const auctionSortOrder =
    searchParams.get(AuctionSearchParams.SORT_ORDER) || SortOrderEnum.ASC;
  const fromPrice = searchParams.get(AuctionSearchParams.FROM_PRICE) || 0;
  const toPrice = searchParams.get(AuctionSearchParams.TO_PRICE) || 0;

  const { isSidebarOpen, toggleSidebarVisibility, ref } =
    useSidebarVisibility("md");

  const {
    handleTypeChange,
    handleCardNameChange,
    handleShowOnlyWhereUserTakePartChange,
    handleSortByChange,
    handleSortOrderChange,
    handleLocationChange,
    resetFilters,
    handlePriceChange,
  } = useFilters();

  return (
    <>
      <Box sx={toggleFilterContainerStyles}>
        <ChangeFiltersVisibilityBtn
          toggleSidebarVisibility={toggleSidebarVisibility}
          isSidebarOpen={isSidebarOpen}
        />
      </Box>
      <Slide ref={ref} appear={false} in={isSidebarOpen} direction="right">
        <Stack spacing={1} sx={filterStyles}>
          <Select
            label="Auction type"
            value={auctionType}
            options={auctionsTypeOptions}
            handleChange={handleTypeChange}
          />
          <DebouncedInput
            defaultValue={cardName ?? undefined}
            label="Card name"
            handleDebouncedChange={handleCardNameChange}
          />
          <LocationFilter
            locationId={auctionLocationId}
            changeLocationId={handleLocationChange}
          />
          {auctionType === AuctionTypeEnum.AVAILABLE && (
            <PriceSlider
              fromPrice={+fromPrice}
              toPrice={+toPrice}
              changePriceFilter={handlePriceChange}
            />
          )}
          {auctionType === AuctionTypeEnum.AVAILABLE && (
            <Switch
              label="Show only where user take part"
              checked={isUserTakePart}
              handleChange={handleShowOnlyWhereUserTakePartChange}
            />
          )}
          <Select
            label="Sort by"
            value={auctionSortBy}
            options={sortByOptions}
            handleChange={handleSortByChange}
          />
          <Select
            label="Sort order"
            value={auctionSortOrder}
            options={sortOrderOptions}
            handleChange={handleSortOrderChange}
          />
          <Button
            color="warning"
            variant="contained"
            fullWidth
            onClick={resetFilters}
          >
            Reset
          </Button>
        </Stack>
      </Slide>
    </>
  );
}
