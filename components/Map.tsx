import { MapContainer,Marker,Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { Settings } from "@/utils/types/globals";

const Map = ({settings}: {settings:Settings}) => {

  const posX = settings.coordonate_x? Number(settings.coordonate_x) : 47.206455284692154
  const posY = settings.coordonate_y? Number(settings.coordonate_y) : 2.5100736377960455

  return (
    <MapContainer center={[posX, posY]} zoom={15} scrollWheelZoom={true} style={{height: "100%", width: "100%", zIndex:"0"}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker 
      position={[posX, posY]}
      draggable={true}
      >
      <Popup>
        {settings.garage_name} <br />
        {settings.address}, <br />
        {settings.zip_code} {settings.city} <br />
        Tel : {settings.landline_phone} <br />
        Portable : {settings.cell_phone}
      </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map