import HistorySale from "@/components/HistorySale";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <HistorySale id={id} />;
}
