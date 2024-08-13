import CalendarSvg from "@/components/svg/CalendarSvg";
import FindSvg from "@/components/svg/FindSvg";
import ToolSvg from "@/components/svg/ToolSvg";
import Image from "next/image";
import garagePhoto from "@/public/images/garagePhoto.jpg"
import Link from "next/link";

export default async function Index() {

  const svgClass="h-20 w-20 fill-highlight"

  return (
    <div className="h-full">
      <h1 className="font-bold text-4xl my-8 text-center"><span className="text-highlight">ISOCAR </span>Garage Comparet</h1>
      <div className="flex flex-col md:flex-row h-4/5">
        <div className="flex flex-col items-center gap-8 justify-center px-6 md:justify-around md:items-end md:w-1/2 h-full">
          <Image
          src={garagePhoto}
          className="rounded-xl relative md:w-3/5 w-3/4 pb-9/16 shadow-md shadow-foreground"
          alt="Photo du garage"/>
          <p className="md:w-3/5 text-lg text-justify">Bienvenue au Garage Comparet, votre expert en réparation automobile de confiance. Notre équipe de techniciens qualifiés est dédiée à offrir des services de qualité pour tous types de véhicules.</p>
          <p className="md:w-3/5 text-lg text-justify">Que ce soit pour un entretien régulier ou une réparation complexe, nous sommes là pour vous garantir une conduite en toute sécurité.</p>
        </div>
        <div className="py-8 md:w-1/2 flex flex-col gap-10 md:justify-around items-center">
          <div className="flex flex-col items-center gap-4 w-1/2 md:w-1/3 animate-slide-in-1">
            <CalendarSvg className={svgClass}/>
            <Link className="btn w-full" href="/booking">Prendre rendez-vous en ligne</Link>
          </div>
          <div className="flex flex-col items-center gap-4 w-1/2 md:w-1/3 animate-slide-in-2">
            <ToolSvg className={svgClass} />
            <Link className="btn w-full" href="/services">Nos prestations</Link>
          </div>
          <div className="flex flex-col items-center gap-4 w-1/2 md:w-1/3 animate-slide-in-3">
            <FindSvg className={svgClass}/>
            <Link className="btn w-full" href="/hourly">Où nous trouver</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
