import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

import {
  ShieldPlus,
  Bug,
  Flame,
  CloudRain,
  type LucideIcon,
} from "lucide-react";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// usuarios precisam add seus tokens do mapa
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export type MarkerCategory = "support" | "insects" | "fire" | "rain";
export type CategoryVisibility = Record<MarkerCategory, boolean>;
interface BubbleData {
  id: number;
  category: MarkerCategory;
  coords: [number, number];
  color: string;
  icon: LucideIcon;
  title: string;
  description: string;
}


const bubbles: BubbleData[] = [
  {
    id: 1,
    category: "support",
    coords: [-47.4582, -23.5015],
    color: "green",
    icon: ShieldPlus,
    title: "Ponto de apoio",
    description:
      "Ponto demonstrativo de apoio na região.",
  },
  {
    id: 2,
    category: "insects",
    coords: [-47.4680, -23.4950],
    color: "orange",
    icon: Bug,
    title: "Registro de insetos",
    description:
      "Exemplo de registro relacionado à presença de insetos.",
  },
  {
    id: 3, 
    category: "fire",
    coords: [-47.4450, -23.5100],
    color: "red",
    icon: Flame,
    title: "Ocorrência de fogo",
    description:
      "Exemplo de localização de uma ocorrência de fogo.",
  },
  {
    id: 4,
    category: "rain",
    coords: [-47.4520, -23.4880],
    color: "blue",
    icon: CloudRain,
    title: "Chuva na região",
    description:
      "Exemplo de registro de chuva em uma localização.",
  },
];

interface MapViewProps {
  visibleCategories: CategoryVisibility;
}

export interface MapHandle {
  flyTo: (
    center: [number, number],
    zoom?: number
  ) => void;

  showUserLocation: (
    coords: [number, number]
  ) => void;
}

const MapView = forwardRef<
  MapHandle,
  MapViewProps
>(({ visibleCategories }, ref) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  // Marcador da localização atual do usuário
  const userLocationMarkerRef =
    useRef<mapboxgl.Marker | null>(null);
  const visibilityRef = useRef<CategoryVisibility>({
    support: true,
    insects: true,
    fire: true,
    rain: true,
  });

  const markersRef = useRef<
   Array<{
    category: MarkerCategory;
    marker: mapboxgl.Marker;
    popup: mapboxgl.Popup;
  }>
  >([]);

  
  useImperativeHandle(ref, () => ({
    // Movimenta o mapa até uma localização
    flyTo: (
      center: [number, number],
      zoom: number = 15
    ) => {
      map.current?.flyTo({
        center,
        zoom,
        duration: 2000,
        essential: true,
      });
    },

    // Cria ou atualiza o marcador do usuário
    showUserLocation: (
      coords: [number, number]
    ) => {
      if (!map.current) return;

      // Se o marcador já existe, atualiza sua posição
      if (userLocationMarkerRef.current) {
        userLocationMarkerRef.current.setLngLat(coords);
        return;
      }

      // Cria o elemento externo do marcador
      const markerElement =
        document.createElement("div");

      markerElement.className = "geo-user-location";

      markerElement.setAttribute(
        "aria-label",
        "Sua localização aproximada"
      );

      markerElement.title = "Sua localização aproximada";

      // Cria o círculo branco central
      const markerCenter =
        document.createElement("div");

      markerCenter.className =
        "geo-user-location__center";

      // Cria o ponto verde central
      const markerDot =
        document.createElement("span");

      markerDot.className =
        "geo-user-location__dot";

      // Monta a estrutura visual do marcador
      markerCenter.appendChild(markerDot);

      markerElement.appendChild(markerCenter);

      // Adiciona o marcador ao mapa
      const marker = new mapboxgl.Marker({
        element: markerElement,
        anchor: "center",
      })
        .setLngLat(coords)
        .addTo(map.current);

      // Guarda a referência do marcador
      userLocationMarkerRef.current = marker;
    },
  }));

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-47.4582, -23.5015],
      zoom: 13,
    });

    map.current = mapInstance;

    mapInstance.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: false,
      }),
      "bottom-right"
    );

    mapInstance.on("load", () => {
      bubbles.forEach((bubble) => {
        // Elemento principal do marcador
        const markerElement = document.createElement("button");

        markerElement.type = "button";
        markerElement.className =
          `geo-marker geo-marker--${bubble.color}`;

        markerElement.setAttribute(
          "aria-label",
          `Ver informações: ${bubble.title}`
        );

        markerElement.title = bubble.title;

        // Círculo central do marcador
        const markerCenter = document.createElement("span");

        markerCenter.className = "geo-marker__center";

        // Cria o ícone SVG utilizando o componente do Lucide
        const iconElement = createElement(bubble.icon, {
          size: 21,
          strokeWidth: 2.2,
          "aria-hidden": true,
        });

        // Converte o ícone em SVG para o Mapbox
        markerCenter.innerHTML = renderToStaticMarkup(iconElement);

        markerCenter.setAttribute("aria-hidden", "true");

        // Insere o ícone no marcador
        markerElement.appendChild(markerCenter);

        // Cartão de informações
        const popupContent = document.createElement("div");

        popupContent.className = "geo-popup";

        const popupBadge = document.createElement("span");

        popupBadge.className = "geo-popup__badge";
        popupBadge.textContent = "Ponto demonstrativo";

        const popupTitle = document.createElement("h3");

        popupTitle.className = "geo-popup__title";
        popupTitle.textContent = bubble.title;

        const popupDescription = document.createElement("p");

        popupDescription.className = "geo-popup__description";
        popupDescription.textContent = bubble.description;

        popupContent.append(
          popupBadge,
          popupTitle,
          popupDescription
        );

        // Popup do Mapbox
        const popup = new mapboxgl.Popup({
          offset: 35,
          closeButton: true,
          closeOnClick: true,
          maxWidth: "280px",
          className: "geo-map-popup",
        }).setDOMContent(popupContent);

        // Destaca o marcador quando o popup estiver aberto
        popup.on("open", () => {
          markerElement.classList.add("geo-marker--selected");
        });

        // Remove o destaque quando o popup for fechado
        popup.on("close", () => {
          markerElement.classList.remove("geo-marker--selected");
        });

        // Marcador interativo
        const marker = new mapboxgl.Marker({
          element: markerElement,
          anchor: "center",
        })
          .setLngLat(bubble.coords)
          .setPopup(popup)
          .addTo(mapInstance);

        // Aplica a visibilidade inicial da categoria
        markerElement.style.display =
          visibilityRef.current[bubble.category]
            ? "flex"
            : "none";

        // Guarda a referência para atualizar depois
        markersRef.current.push({
          category: bubble.category,
          marker,
          popup,
        });
      });
    });

    return () => {
      userLocationMarkerRef.current?.remove();
      userLocationMarkerRef.current = null;

      mapInstance.remove();
      map.current = null;
      markersRef.current = [];
    };

  }, []);


// ========================================
// ATUALIZAR VISIBILIDADE DOS MARCADORES
// ========================================

useEffect(() => {
  // Guarda a configuração mais recente
  visibilityRef.current = visibleCategories;

  // Atualiza os marcadores que já existem
  markersRef.current.forEach(
    ({ category, marker, popup }) => {
      const isVisible =
        visibleCategories[category];

      const element = marker.getElement();

      // Mostra ou oculta o marcador
      element.style.display = isVisible
        ? "flex"
        : "none";

      // Fecha o popup caso a categoria seja ocultada
      if (!isVisible && popup.isOpen()) {
        popup.remove();
      }
    }
  );
}, [visibleCategories]);

  return (
    <div className="relative h-full w-full">
      <div
        ref={mapContainer}
        className="absolute inset-0"
        aria-label="Mapa interativo do GeoShield"
      />
    </div>
  );
});

MapView.displayName = "MapView";

export default MapView;
