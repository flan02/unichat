import Button from "@/components/reutilizable/Button";
import { Icons } from "@/components/reutilizable/Icons";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <section className="flex flex-col items-center">
      <Icons.unichatLogo width={150} height={150} />
      <br />
      <h1 className="text-pink-300 text-5xl md:text-6xl font-bold mb-1">unichat</h1>
      <p className="text-xs md:text-sm text-slate-400">App de mensajeria instantanea privada y segura. </p>
      <p className="mb-10 text-xs md:text-sm text-slate-400">Rara como un unicornio</p>
      <Button as={Link} href="/chat" className="">
        Empieza Ya!
        <ArrowRight />
      </Button>
    </section>
  );
}
