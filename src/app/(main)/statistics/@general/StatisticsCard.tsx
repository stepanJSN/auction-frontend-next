import { ROUTES } from "@/config/routesConfig";
import { Paper, SxProps, Typography } from "@mui/material";
import Link from "next/link";

type StatisticsCardProps = {
  id?: string;
  name?: string;
  label: string;
  number: number;
};

const textStyles: SxProps = {
  display: "block",
  fontWeight: "bold",
  textAlign: "center",
};
const containerStyles: SxProps = {
  width: 200,
  height: 150,
  p: 2,
};

export default function StatisticsCard({
  id,
  name,
  number,
  label,
}: StatisticsCardProps) {
  return (
    <Paper sx={containerStyles}>
      <Typography sx={textStyles} gutterBottom>
        {label}
      </Typography>
      {name && id && (
        <Typography
          sx={textStyles}
          component={Link}
          variant="h6"
          gutterBottom
          href={ROUTES.CARD_DETAILS(id)}
        >
          {name}
        </Typography>
      )}
      <Typography sx={textStyles} variant="h6">
        {number}
      </Typography>
    </Paper>
  );
}
