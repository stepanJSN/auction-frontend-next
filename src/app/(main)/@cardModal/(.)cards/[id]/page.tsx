import CardData from "@/components/CardData";
import CardSkeleton from "@/components/CardSkeleton";
import ModalPage from "@/components/ModalPage";
import { Suspense } from "react";

export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <ModalPage>
      <Suspense key={id} fallback={<CardSkeleton isError={false} />}>
        <CardData id={id} />
      </Suspense>
    </ModalPage>
  );
}
