import PageError from "@/components/PageError";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { systemService } from "@/services/systemService";
import ExchangeRateForm from "./ExchangeRateForm";

export default async function SystemSettingsPage() {
  const { result, data } = await systemService.getExchangeRate();
  if (result === QueryStatusEnum.ERROR) {
    return <PageError />;
  }
  return <ExchangeRateForm exchangeRate={data!.exchange_rate} />;
}
