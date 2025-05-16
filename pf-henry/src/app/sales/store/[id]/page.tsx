import HistorySale from "@/components/HistorySale";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params; // Correcto: params es un objeto, no una promesa

  return <HistorySale id={id} />;
}
