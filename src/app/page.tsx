import Builder from "@/app/components/builder";
import data from "@/lib/data/tree.json";

export default function Home() {
  return <Builder node={data} />;
}
