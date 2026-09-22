
import { useState, useRef, useEffect } from "react";

import {
  Layers3,
  ChevronDown,
  ShieldPlus,
  Bug,
  Flame,
  CloudRain,
  Menu,
  Search,
  MapPin,
  LocateFixed,
  ShieldCheck,
  ArrowUpRight,
  Loader2,
  Info,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import MapView, {
  type CategoryVisibility,
  type MarkerCategory,
  type MapHandle,
} from "@/components/MapView";import ProfileSidebar from "@/components/ProfileSidebar";

// Tipagem das sugestões retornadas pelo Mapbox
interface SearchSuggestion {
  id: string;
  place_name: string;
  center: [number, number];
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// ========================================
// CATEGORIAS DISPONÍVEIS NO MAPA
// ========================================
interface MapCategory {
  id: MarkerCategory;
  label: string;
  Icon: LucideIcon;
  color: string;
  background: string;
}

const MAP_CATEGORIES: MapCategory[] = [
  {
    id: "support",
    label: "Pontos de apoio",
    Icon: ShieldPlus,
    color: "#16845A",
    background: "#EAF4EE",
  },
  {
    id: "insects",
    label: "Registros de insetos",
    Icon: Bug,
    color: "#E69A37",
    background: "#FFF1DB",
  },
  {
    id: "fire",
    label: "Ocorrências de fogo",
    Icon: Flame,
    color: "#DC6262",
    background: "#FCEAEA",
  },
  {
    id: "rain",
    label: "Chuva na região",
    Icon: CloudRain,
    color: "#508FC8",
    background: "#EAF2FC",
  },
];

const Map = () => {
  // Controle do menu lateral
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  // Estados da pesquisa
  const [searchQuery, setSearchQuery] =
    useState("");

  const [suggestions, setSuggestions] =
    useState<SearchSuggestion[]>([]);

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const [isSearching, setIsSearching] =
    useState(false);

  const [searchError, setSearchError] =
    useState("");

  // Estados da localização
  const [isLocating, setIsLocating] =
    useState(false);

  const [locationError, setLocationError] =
    useState("");

  // Referências
  const mapRef = useRef<MapHandle | null>(null);

  const selectedPlaceRef = useRef(false);

  // Controle do painel de filtros
  const [isFiltersOpen, setIsFiltersOpen] =
    useState(false);

    // Controle do painel de busca
  const [isSearchPanelOpen, setIsSearchPanelOpen] =
    useState(false);

  // Categorias visíveis no mapa
  const [visibleCategories, setVisibleCategories] =
    useState<CategoryVisibility>({
      support: true,
      insects: true,
      fire: true,
      rain: true,
    });

  // ========================================
  // BUSCA DE LOCALIZAÇÕES
  // ========================================

  useEffect(() => {
    // Não pesquisar novamente após selecionar
    // um endereço da lista.
    if (selectedPlaceRef.current) {
      selectedPlaceRef.current = false;
      return;
    }

    if (searchQuery.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      setSearchError("");
      return;
    }

    const controller = new AbortController();

    setIsSearching(true);
    setSearchError("");
    setSuggestions([]);
    setShowSuggestions(true);

    // Pequeno intervalo para evitar requisições
    // a cada tecla digitada.
    const timeoutId = setTimeout(async () => {
      try {
        const url =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
          `${encodeURIComponent(searchQuery.trim())}.json` +
          `?access_token=${MAPBOX_TOKEN}` +
          `&proximity=-47.4582,-23.5015` +
          `&bbox=-47.6,-23.6,-47.3,-23.4` +
          `&limit=5`;

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            "Não foi possível consultar os endereços."
          );
        }

        const data = await response.json();

        if (controller.signal.aborted) return;

        setSuggestions(data.features || []);
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error(
          "Erro ao buscar localizações:",
          error
        );

        setSearchError(
          "Não foi possível buscar os endereços. Tente novamente."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchQuery]);

  // ========================================
  // SELECIONAR ENDEREÇO
  // ========================================

  const handleSuggestionClick = (
    suggestion: SearchSuggestion
  ) => {
    selectedPlaceRef.current = true;

    setSearchQuery(suggestion.place_name);
    setShowSuggestions(false);
    setSuggestions([]);
    setSearchError("");
    setIsSearching(false);

    mapRef.current?.flyTo(
      suggestion.center,
      15
    );
  };

  // ========================================
  // USAR LOCALIZAÇÃO ATUAL
  // ========================================

  const handleUseLocation = () => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError(
        "Seu navegador não oferece suporte à localização."
      );
      return;
    }

    setIsLocating(true);

    
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { longitude, latitude } =
        position.coords;

      // Coordenadas identificadas pelo navegador
      const userCoords: [number, number] = [
        longitude,
        latitude,
      ];

      // Movimenta o mapa até o usuário
      mapRef.current?.flyTo(userCoords, 15);

      // Exibe o marcador da localização atual
      mapRef.current?.showUserLocation(userCoords);

      // Finaliza o carregamento
      setIsLocating(false);
    },

      (error) => {
        setIsLocating(false);

        if (error.code === 1) {
          setLocationError(
            "Permita o acesso à localização nas configurações do navegador."
          );
        } else if (error.code === 3) {
          setLocationError(
            "A localização demorou para responder. Tente novamente."
          );
        } else {
          setLocationError(
            "Não foi possível identificar sua localização."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };


// ========================================
// CONTROLE DOS FILTROS
// ========================================

  // Abre ou fecha o painel de busca
  const toggleSearchPanel = () => {
    setIsSearchPanelOpen((previous) => !previous);

    // Fecha os filtros ao abrir a busca
    setIsFiltersOpen(false);
  };

  // Abre ou fecha o painel de filtros
  const toggleFiltersPanel = () => {
    setIsFiltersOpen((previous) => !previous);

    // Fecha a busca ao abrir os filtros
    setIsSearchPanelOpen(false);
  };

  // Alterna a visibilidade de uma categoria
  const toggleCategory = (
    category: MarkerCategory
  ) => {
    setVisibleCategories((previous) => ({
      ...previous,
      [category]: !previous[category],
    }));
  };

  // Habilita todas as categorias
  const showAllCategories = () => {
    setVisibleCategories({
      support: true,
      insects: true,
      fire: true,
      rain: true,
    });
  };

  // Conta quantas categorias estão habilitadas
  const activeCategories = Object.values(
    visibleCategories
  ).filter(Boolean).length;

  // ========================================
  // INTERFACE
  // ========================================

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#F7F9F7]">

      {/* MAPA */}

      <MapView
      ref={mapRef}
      visibleCategories={visibleCategories}
    />

      {/* PAINEL DE BUSCA */}

      <div
        className="
          pointer-events-none
          absolute
          left-4
          right-4
          top-4
          z-30
          sm:left-6
          sm:right-auto
          sm:top-6
          sm:w-[370px]
        "
      >
      
      {/* CONTROLES SUPERIORES */}

      <div className="pointer-events-auto mb-3 flex items-center gap-3">

        {/* ABRIR E FECHAR BUSCA */}

        <button
          type="button"
          onClick={toggleSearchPanel}
          aria-expanded={isSearchPanelOpen}
          aria-label={
            isSearchPanelOpen
              ? "Fechar painel de busca"
              : "Abrir painel de busca"
          }
          className="
            flex
            h-12
            flex-1
            items-center
            gap-3
            rounded-2xl
            border
            border-[#E4EAE5]
            bg-white/95
            px-4
            text-sm
            font-semibold
            text-[#123C35]
            shadow-[0_8px_30px_rgba(18,60,53,0.10)]
            backdrop-blur-xl
            transition-colors
            hover:bg-[#EAF4EE]
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16845A]
          "
        >
          <Search
            size={19}
            className="text-[#16845A]"
          />

          <span className="flex-1 text-left">
            Explorar região
          </span>

          <ChevronDown
            size={18}
            className={`
              text-[#16845A]
              transition-transform
              ${isSearchPanelOpen ? "rotate-180" : ""}
            `}
          />
        </button>

        {/* ABRIR MENU LATERAL */}

        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Abrir menu lateral"
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-[#E4EAE5]
            bg-white/95
            text-[#123C35]
            shadow-[0_8px_30px_rgba(18,60,53,0.10)]
            backdrop-blur-xl
            transition-colors
            hover:bg-[#EAF4EE]
          "
        >
          <Menu size={20} />
        </button>

      </div>

      {isSearchPanelOpen && (
        <div
          className="
            pointer-events-auto
            rounded-[24px]
            border
            border-[#E8EEE9]
            bg-white/95
            max-h-[calc(100dvh-6.5rem)]
            overflow-y-auto
            p-5
            shadow-[0_12px_45px_rgba(18,60,53,0.10)]
            backdrop-blur-xl
            sm:p-6
          "
        >

          {/* CABEÇALHO */}

          <div className="mb-5 flex items-center justify-between gap-3">

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#EAF4EE]
                "
              >
                <ShieldCheck
                  size={23}
                  className="text-[#16845A]"
                />
              </div>

              <div>
                <h2 className="text-base font-bold tracking-tight text-[#123C35]">
                  GeoShield
                </h2>

                <p className="text-xs text-[#65716B]">
                  Explore sua região
                </p>
              </div>

            </div>



          </div>

          {/* CONTEÚDO DO PAINEL */}

          <div className="mb-5">

            <span
              className="
                mb-3
                inline-flex
                items-center
                rounded-full
                bg-[#EAF4EE]
                px-3
                py-1
                text-[10px]
                font-bold
                uppercase
                tracking-widest
                text-[#16845A]
              "
            >
              Explorar mapa
            </span>

            <h1
              className="
                mb-2
                text-[22px]
                font-bold
                leading-tight
                tracking-tight
                text-[#123C35]
              "
            >
              Onde vamos explorar hoje?
            </h1>

            <p
              className="
                text-sm
                leading-relaxed
                text-[#65716B]
              "
            >
              Encontre uma localização ou
              explore o mapa a partir da sua região.
            </p>

          </div>

          {/* CAMPO DE PESQUISA */}

          <div className="relative">

            <Search
              size={19}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                z-10
                -translate-y-1/2
                text-[#16845A]
              "
            />

            <Input
              type="text"
              aria-label="Buscar localização"
              placeholder="Buscar bairro ou endereço..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchError("");
              }}
              onFocus={() => {
                if (searchQuery.trim().length >= 3) {
                  setShowSuggestions(true);
                }
              }}
              autoComplete="off"
              className="
                h-12
                rounded-xl
                border-[#DCE6DF]
                bg-white
                pl-11
                pr-4
                text-sm
                text-[#123C35]
                placeholder:text-[#84908A]
                focus-visible:ring-[#16845A]/30
              "
            />

            {/* SUGESTÕES DE ENDEREÇOS */}

            {showSuggestions && (
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-full
                  z-50
                  mt-2
                  max-h-60
                  overflow-y-auto
                  rounded-xl
                  border
                  border-[#E4EAE5]
                  bg-white
                  p-1
                  shadow-xl
                "
              >

                {isSearching ? (

                  <div className="flex items-center gap-2 px-3 py-4 text-sm text-[#65716B]">
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    Buscando endereços...
                  </div>

                ) : searchError ? (

                  <p
                    role="alert"
                    className="px-3 py-4 text-sm text-red-600"
                  >
                    {searchError}
                  </p>

                ) : suggestions.length > 0 ? (

                  suggestions.map((suggestion) => (

                    <button
                      key={suggestion.id}
                      type="button"
                      onClick={() =>
                        handleSuggestionClick(suggestion)
                      }
                      className="
                        flex
                        w-full
                        items-start
                        gap-3
                        rounded-lg
                        px-3
                        py-3
                        text-left
                        transition-colors
                        hover:bg-[#EAF4EE]
                      "
                    >

                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0 text-[#16845A]"
                      />

                      <span
                        className="
                          text-sm
                          leading-relaxed
                          text-[#123C35]
                        "
                      >
                        {suggestion.place_name}
                      </span>

                    </button>

                  ))

                ) : (

                  <p className="px-3 py-4 text-sm text-[#65716B]">
                    Nenhum endereço encontrado na área pesquisada.
                  </p>

                )}

              </div>
            )}

          </div>

          {/* SEPARADOR */}

          <div className="my-5 flex items-center gap-3">

            <div className="h-px flex-1 bg-[#E4EAE5]" />

            <span className="text-xs text-[#84908A]">
              OU
            </span>

            <div className="h-px flex-1 bg-[#E4EAE5]" />

          </div>

          {/* BOTÃO DE LOCALIZAÇÃO */}

          <Button
            type="button"
            onClick={handleUseLocation}
            disabled={isLocating}
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#16845A]
              text-sm
              font-semibold
              text-white
              transition-colors
              hover:bg-[#126E4B]
              disabled:opacity-60
            "
          >

            {isLocating ? (

              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Buscando localização...
              </>

            ) : (

              <>
                <LocateFixed size={18} />

                Usar minha localização

                <ArrowUpRight size={16} />
              </>

            )}

          </Button>

          {/* MENSAGEM DE ERRO */}

          {locationError && (

            <div
              role="alert"
              className="
                mt-3
                flex
                items-start
                gap-2
                rounded-xl
                bg-red-50
                p-3
                text-xs
                leading-relaxed
                text-red-600
              "
            >

              <AlertCircle
                size={16}
                className="shrink-0"
              />

              <span>{locationError}</span>

            </div>

          )}

          {/* OBSERVAÇÃO */}

          <div className="mt-5 flex items-start gap-2">

            <Info
              size={14}
              className="mt-0.5 shrink-0 text-[#84908A]"
            />

            <p className="text-[11px] leading-relaxed text-[#84908A]">
              Os pontos exibidos no mapa são demonstrativos.
              A busca por endereços está limitada à região
              de Sorocaba.
            </p>

          </div>

        </div>

        )}
      </div>

      {/* PAINEL DE FILTROS DO MAPA */}

      {!isSearchPanelOpen && (

    <div
      className="
        pointer-events-none
        absolute
        bottom-16
        left-4
        z-30
        w-[min(320px,calc(100vw-2rem))]
        sm:bottom-6
        sm:left-6
      "
    >
      <div className="pointer-events-auto">

        {/* BOTÃO PARA ABRIR E FECHAR */}

        <button
          type="button"
          onClick={toggleFiltersPanel}
          aria-expanded={isFiltersOpen}
          aria-controls="geoshield-map-filters"
          className="
            flex
            w-full
            items-center
            justify-between
            gap-3
            rounded-2xl
            border
            border-[#E4EAE5]
            bg-white/95
            px-4
            py-3.5
            text-left
            shadow-[0_8px_30px_rgba(18,60,53,0.10)]
            backdrop-blur-xl
            transition-colors
            hover:bg-[#F7F9F7]
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#16845A]
          "
        >
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#EAF4EE]
              "
            >
              <Layers3
                size={20}
                className="text-[#16845A]"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#123C35]">
                Camadas do mapa
              </h3>

              <p className="mt-0.5 text-xs text-[#65716B]">
                {activeCategories} de 4 categorias visíveis
              </p>
            </div>

          </div>

          <ChevronDown
            size={19}
            className={`
              shrink-0
              text-[#65716B]
              transition-transform
              duration-200
              ${isFiltersOpen ? "rotate-180" : ""}
            `}
          />

        </button>

        {/* CONTEÚDO EXPANSÍVEL */}

        {isFiltersOpen && (

          <div
            id="geoshield-map-filters"
            className="
              mt-3
              max-h-[min(55dvh,420px)]
              overflow-y-auto
              rounded-2xl
              border
              border-[#E4EAE5]
              bg-white/95
              p-4
              shadow-[0_12px_40px_rgba(18,60,53,0.12)]
              backdrop-blur-xl
              sm:p-5
            "
          >

            {/* CABEÇALHO */}

            <div className="mb-4">

              <h3 className="text-sm font-bold text-[#123C35]">
                Escolha o que visualizar
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-[#65716B]">
                Selecione as categorias que deseja
                visualizar no mapa.
              </p>

            </div>

            <div className="mb-3 h-px bg-[#E4EAE5]" />

            {/* LISTA DE CATEGORIAS */}

            <div className="space-y-1">

              {MAP_CATEGORIES.map((category) => {

                const isActive =
                  visibleCategories[category.id];

                const CategoryIcon = category.Icon;

                return (

                  <label
                    key={category.id}
                    className="
                      flex
                      cursor-pointer
                      items-center
                      gap-3
                      rounded-xl
                      px-2
                      py-2.5
                      transition-colors
                      hover:bg-[#F7F9F7]
                    "
                  >

                    {/* ÍCONE DA CATEGORIA */}

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                      "
                      style={{
                        backgroundColor:
                          category.background,
                      }}
                    >

                      <CategoryIcon
                        size={19}
                        strokeWidth={2}
                        style={{
                          color: category.color,
                        }}
                      />

                    </div>

                    {/* NOME */}

                    <span
                      className="
                        flex-1
                        text-sm
                        font-medium
                        text-[#123C35]
                      "
                    >
                      {category.label}
                    </span>

                    {/* CHECKBOX */}

                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() =>
                        toggleCategory(category.id)
                      }
                      className="
                        h-4
                        w-4
                        shrink-0
                        cursor-pointer
                        rounded
                        border-[#DCE6DF]
                        accent-[#16845A]
                      "
                    />

                  </label>

                );
              })}

            </div>

            {/* RODAPÉ */}

            <div className="mt-4 border-t border-[#E4EAE5] pt-4">

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-2
                "
              >

                <span className="text-xs text-[#65716B]">
                  {activeCategories} de 4 visíveis
                </span>

                <button
                  type="button"
                  onClick={showAllCategories}
                  disabled={activeCategories === 4}
                  className="
                    text-xs
                    font-semibold
                    text-[#16845A]
                    transition-colors
                    hover:text-[#123C35]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Mostrar todas
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>
      )}

      {/* MENU LATERAL */}

      <ProfileSidebar
        isOpen={isSidebarOpen}
        onClose={() =>
          setIsSidebarOpen(false)
        }
      />

    </div>
  );
};

export default Map;