import HistorySale from "@/components/HistorySale";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <HistorySale id={id} />;
}
