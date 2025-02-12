import CardData from "../../../../components/CardData";

export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <CardData id={id} />;
}
