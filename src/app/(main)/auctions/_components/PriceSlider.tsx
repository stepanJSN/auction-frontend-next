import { Slider } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getPriceRangeAction } from "../auctions.actions";

type PriceSliderProps = {
  fromPrice: number | null;
  toPrice: number | null;
  changePriceFilter: (fromPrice: number, toPrice: number) => void;
};

const getPriceRangeAriaLabel = () => "price range";

export default function PriceSlider({
  fromPrice,
  toPrice,
  changePriceFilter,
}: PriceSliderProps) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [sliderValue, setSliderValue] = useState([
    fromPrice ?? 0,
    toPrice ?? 0,
  ]);
  const priceRangeMarks = useMemo(
    () => [
      { value: priceRange.min, label: priceRange.min },
      { value: priceRange.max, label: priceRange.max },
    ],
    [priceRange.max, priceRange.min],
  );

  const getPriceRange = useCallback(async () => {
    const priceRange = await getPriceRangeAction();
    if (priceRange) {
      setPriceRange(priceRange);
    }
  }, []);

  useEffect(() => {
    getPriceRange();
  }, [getPriceRange]);

  const handleSliderChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        setSliderValue(newValue);
      }
    },
    [],
  );

  const handlePriceRangeChange = useCallback(
    (_event: React.SyntheticEvent | Event, value: number | number[]) => {
      if (Array.isArray(value)) {
        changePriceFilter(value[0], value[1]);
      }
    },
    [changePriceFilter],
  );

  return (
    <Slider
      getAriaLabel={getPriceRangeAriaLabel}
      value={sliderValue}
      onChange={handleSliderChange}
      onChangeCommitted={handlePriceRangeChange}
      valueLabelDisplay="auto"
      marks={priceRangeMarks}
      min={priceRange.min}
      max={priceRange.max}
    />
  );
}
