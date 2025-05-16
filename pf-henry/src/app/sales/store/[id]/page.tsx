import HistorySale from "@/components/HistorySale";

export default function Page({ params }: { params: { id: string } }) {
  return <HistorySale id={params.id} />;
}
