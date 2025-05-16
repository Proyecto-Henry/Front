import HistorySale from "@/components/HistorySale";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const { id } = params;

  return <HistorySale id={id} />;
}
