import HistorySale from "@/components/HistorySale";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <HistorySale id={id} />;
}
