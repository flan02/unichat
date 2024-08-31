import { Icons } from "@/components/reutilizable/Icons";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center">
      <Icons.unichatLogo width={150} height={150} />
      <br />
      <br />
      <h1 className="text-unichat text-5xl font-bold mb-1">unichat</h1>
      <p className="mb-10 text-zinc-400">Aplicacion de mensajeria instantanea privada y segura. Rara como un unicornio</p>
    </section>
  );
}
