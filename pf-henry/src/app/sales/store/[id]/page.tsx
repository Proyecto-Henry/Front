import HistorySale from "@/components/HistorySale";

type Props = {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <HistorySale id={id} />;
}
