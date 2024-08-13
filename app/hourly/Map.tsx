"use client"
import dynamic from "next/dynamic";
import { Settings } from "@/utils/types/globals";

type Props = {
  settings: Settings
}

function Map({settings}: Props) {

  const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
    ssr: false

  });
  return (
    <div id="map" className='lg:h-96 lg:w-96 w-64 h-64'>
      <MapWithNoSSR settings={settings}/>
    </div>
  )
}

export default Map