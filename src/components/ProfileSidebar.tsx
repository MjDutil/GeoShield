
import { useEffect, useRef } from "react";

import {
  ShieldCheck,
  UserRound,
  MapPinned,
  Info,
  LogOut,
  PanelLeftClose,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSidebar = ({
  isOpen,
  onClose,
}: ProfileSidebarProps) => {
  const navigate = useNavigate();

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // ========================================
  // FECHAR O MENU COM ESC
  // ========================================

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  // ========================================
  // NAVEGAÇÃO
  // ========================================

  const handleExploreMap = () => {
    onClose();
    navigate("/map");
  };

  const handleLogout = () => {
    onClose();
    navigate("/login");
  };

  // ========================================
  // INTERFACE
  // ========================================

  return (
    <>
      {/* FUNDO ESCURECIDO */}

      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-[#123C35]/20
            backdrop-blur-[1px]
          "
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* MENU LATERAL */}

      <aside
        aria-label="Menu lateral do GeoShield"
        aria-hidden={!isOpen}
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          h-screen
          h-[100dvh]
          w-[340px]
          max-w-[90vw]
          flex-col
          overflow-y-auto
          border-r
          border-[#E4EAE5]
          bg-white
          shadow-[12px_0_45px_rgba(18,60,53,0.10)]
          transition-transform
          duration-300
          ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full invisible pointer-events-none"
          }
        `}
      >

        {/* CABEÇALHO */}

        <div className="border-b border-[#E4EAE5] px-6 py-6">

          <div className="flex items-center justify-between gap-3">

            <div className="flex items-center gap-3">

              {/* LOGO */}

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#EAF4EE]
                "
              >
                <ShieldCheck
                  size={24}
                  strokeWidth={2}
                  className="text-[#16845A]"
                />
              </div>

              {/* IDENTIDADE */}

              <div>
                <h2 className="text-base font-bold tracking-tight text-[#123C35]">
                  GeoShield
                </h2>

                <p className="text-xs text-[#65716B]">
                  Explore sua região
                </p>
              </div>

            </div>

            {/* FECHAR MENU */}

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[#E4EAE5]
                bg-white
                text-[#123C35]
                transition-colors
                hover:bg-[#EAF4EE]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-[#16845A]
              "
            >
              <PanelLeftClose size={20} />
            </button>

          </div>

        </div>

        {/* PERFIL DO USUÁRIO */}

        <div className="px-6 pt-7 pb-6">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#EAF4EE]
              "
            >
              <UserRound
                size={23}
                strokeWidth={1.8}
                className="text-[#16845A]"
              />
            </div>

            <div className="min-w-0">

              <h3 className="text-sm font-semibold text-[#123C35]">
                Olá, Maju!
              </h3>

              <p className="mt-1 text-xs text-[#65716B]">
                Bem-vinda ao GeoShield.
              </p>

            </div>

          </div>

        </div>

        {/* NAVEGAÇÃO */}

        <nav
          aria-label="Navegação principal"
          className="flex-1 px-4"
        >

          <div className="mb-3 px-3">

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#84908A]
              "
            >
              Navegação
            </span>

          </div>

          <div className="space-y-1">

            {/* EXPLORAR MAPA */}

            <button
              type="button"
              onClick={handleExploreMap}
              aria-current="page"
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                bg-[#EAF4EE]
                px-4
                py-3.5
                text-left
                text-[#16845A]
                transition-colors
                hover:bg-[#DDEFE4]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-[#16845A]
              "
            >

              <MapPinned
                size={20}
                strokeWidth={2}
                className="shrink-0"
              />

              <span className="flex-1 text-sm font-semibold">
                Explorar mapa
              </span>

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#16845A]
                "
              />

            </button>

            {/* MEU PERFIL */}

            <button
              type="button"
              disabled
              className="
                flex
                w-full
                cursor-not-allowed
                items-center
                gap-3
                rounded-xl
                px-4
                py-3.5
                text-left
                text-[#65716B]
              "
            >

              <UserRound
                size={20}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span className="flex-1 text-sm font-medium">
                Meu perfil
              </span>

              <span className="text-[10px] text-[#84908A]">
                Em breve
              </span>

            </button>

            {/* PERMISSÕES */}

            <button
              type="button"
              disabled
              className="
                flex
                w-full
                cursor-not-allowed
                items-center
                gap-3
                rounded-xl
                px-4
                py-3.5
                text-left
                text-[#65716B]
              "
            >

              <LockKeyhole
                size={20}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span className="flex-1 text-sm font-medium">
                Permissões
              </span>

              <span className="text-[10px] text-[#84908A]">
                Em breve
              </span>

            </button>

            {/* SOBRE O GEOSHIELD */}

            <button
              type="button"
              disabled
              className="
                flex
                w-full
                cursor-not-allowed
                items-center
                gap-3
                rounded-xl
                px-4
                py-3.5
                text-left
                text-[#65716B]
              "
            >

              <Info
                size={20}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span className="flex-1 text-sm font-medium">
                Sobre o GeoShield
              </span>

              <span className="text-[10px] text-[#84908A]">
                Em breve
              </span>

            </button>

          </div>

        </nav>

        {/* RODAPÉ DO MENU */}

        <div className="mt-auto px-6 pb-7 pt-8">

          <div className="mb-5 h-px bg-[#E4EAE5]" />

          {/* BOTÃO SAIR */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-left
              text-[#DC6262]
              transition-colors
              hover:bg-[#FCEAEA]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#DC6262]
            "
          >

            <LogOut
              size={19}
              strokeWidth={1.8}
              className="shrink-0"
            />

            <span className="flex-1 text-sm font-semibold">
              Sair da conta
            </span>

            <ArrowRight size={17} />

          </button>

          {/* IDENTIFICAÇÃO */}

          <div className="mt-6 flex items-center justify-center gap-2">

            <ShieldCheck
              size={13}
              className="text-[#16845A]"
            />

            <span className="text-[10px] text-[#84908A]">
              GeoShield · Sua região, suas informações.
            </span>

          </div>

        </div>

      </aside>
    </>
  );
};

export default ProfileSidebar;