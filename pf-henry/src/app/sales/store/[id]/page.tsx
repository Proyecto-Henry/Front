import HistorySale from "@/components/HistorySale";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params;

  return <HistorySale id={id} />;
}
