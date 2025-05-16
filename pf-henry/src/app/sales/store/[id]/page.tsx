import HistorySale from "@/components/HistorySale";

export default function Page({ params }: { params: { id: string } }) {
  // const { id } = params;

  return <HistorySale id={params.id} />;
}
