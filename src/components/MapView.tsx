import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// For now, user needs to add their Mapbox token
const MAPBOX_TOKEN = "pk.eyJ1IjoidGVsbGVzLWxlb25hcmRvIiwiYSI6ImNtaDJib3dueDEwd2pic285aDgwNGFzeTkifQ.JoVj1cLVsyJHUwxxYNpv_A";

interface BubbleData {
  id: number;
  coords: [number, number];
  color: string;
  icon: string;
  size: number;
}

const MapView = forwardRef((props, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState(MAPBOX_TOKEN);

  // Expose map methods to parent component
  useImperativeHandle(ref, () => ({
    flyTo: (center: [number, number], zoom: number = 15) => {
      if (map.current) {
        map.current.flyTo({
          center,
          zoom,
          duration: 2000,
        });
      }
    },
  }));

  // Static bubble data for Sorocaba
  const bubbles: BubbleData[] = [
    { id: 1, coords: [-47.4582, -23.5015], color: "rgba(76, 175, 80, 0.3)", icon: "⛑️", size: 120 },
    { id: 2, coords: [-47.4680, -23.4950], color: "rgba(255, 152, 0, 0.3)", icon: "🐞", size: 150 },
    { id: 3, coords: [-47.4450, -23.5100], color: "rgba(247, 108, 108, 0.3)", icon: "🔥", size: 100 },
    { id: 4, coords: [-47.4520, -23.4880], color: "rgba(10, 138, 235, 0.3)", icon: "🌧️", size: 130 },
  ];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-47.4582, -23.5015], // Sorocaba coordinates
        zoom: 13,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: false,
        }),
        "bottom-right"
      );

      // Add bubbles after map loads
      map.current.on("load", () => {
        bubbles.forEach((bubble) => {
          const el = document.createElement("div");
          el.className = "bubble-marker";
          el.style.width = `${bubble.size}px`;
          el.style.height = `${bubble.size}px`;
          el.style.borderRadius = "50%";
          el.style.backgroundColor = bubble.color;
          el.style.border = `3px solid ${bubble.color.replace("0.3", "0.6")}`;
          el.style.display = "flex";
          el.style.alignItems = "center";
          el.style.justifyContent = "center";
          el.style.fontSize = "32px";
          el.style.cursor = "default";
          el.innerHTML = bubble.icon;

          new mapboxgl.Marker({
            element: el,
            anchor: "center"
          })
            .setLngLat(bubble.coords)
            .addTo(map.current!);
        });
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
});

MapView.displayName = "MapView";

export default MapView;
