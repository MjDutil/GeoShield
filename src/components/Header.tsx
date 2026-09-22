
import { useEffect, useState } from "react";

import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import Logo from "../../public/logo.png";

const Header = () => {
  // Controla a abertura do menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Permite fechar o menu pressionando ESC
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Fecha o menu ao selecionar uma opção
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        border-b
        border-[#E4EAE5]
        bg-white/95
        backdrop-blur-xl
      "
    >
      {/* CABEÇALHO PRINCIPAL */}

      <nav
        aria-label="Navegação principal"
        className="
          container
          mx-auto
          flex
          h-[72px]
          items-center
          justify-between
          gap-4
          px-4
          sm:px-6
        "
      >

        {/* LOGO */}

        <div className="flex shrink-0 items-center gap-2">

          <img
            src={Logo}
            alt=""
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />

          <span
            className="
              text-lg
              font-bold
              tracking-tight
              text-[#123C35]
              sm:text-xl
            "
          >
            GeoShield
          </span>

        </div>

        {/* ========================================
            NAVEGAÇÃO DESKTOP
        ======================================== */}

        <div
          className="
            hidden
            items-center
            gap-8
            lg:flex
          "
        >

          <a
            href="#about"
            className="
              text-sm
              text-[#123C35]
              transition-colors
              hover:text-[#16845A]
            "
          >
            About us
          </a>

          <a
            href="#services"
            className="
              text-sm
              text-[#123C35]
              transition-colors
              hover:text-[#16845A]
            "
          >
            Services
          </a>

          <a
            href="#how-it-works"
            className="
              text-sm
              text-[#123C35]
              transition-colors
              hover:text-[#16845A]
            "
          >
            How it Works
          </a>

          <Button
            className="
              rounded-xl
              bg-[#16845A]
              px-6
              text-white
              hover:bg-[#126E4B]
            "
          >
            Contact us
          </Button>

        </div>

        {/* ========================================
            BOTÃO DO MENU MOBILE
        ======================================== */}

        <button
          type="button"
          onClick={() =>
            setIsMenuOpen((previous) => !previous)
          }
          aria-label={
            isMenuOpen
              ? "Fechar menu de navegação"
              : "Abrir menu de navegação"
          }
          aria-expanded={isMenuOpen}
          aria-controls="geoshield-mobile-menu"
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
            lg:hidden
          "
        >

          {isMenuOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}

        </button>

      </nav>

      {/* ========================================
          MENU EXPANSÍVEL MOBILE
      ======================================== */}

      {isMenuOpen && (

        <nav
          id="geoshield-mobile-menu"
          aria-label="Navegação mobile"
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
            border-b
            border-[#E4EAE5]
            bg-white
            px-4
            pb-5
            pt-3
            shadow-[0_12px_30px_rgba(18,60,53,0.08)]
            sm:px-6
            lg:hidden
          "
        >

          <div className="flex flex-col gap-1">

            {/* SOBRE NÓS */}

            <a
              href="#about"
              onClick={closeMenu}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                px-4
                py-3.5
                text-sm
                font-medium
                text-[#123C35]
                transition-colors
                hover:bg-[#EAF4EE]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-[#16845A]
              "
            >
              About us

              <ArrowUpRight
                size={17}
                className="text-[#16845A]"
              />
            </a>

            {/* SERVIÇOS */}

            <a
              href="#services"
              onClick={closeMenu}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                px-4
                py-3.5
                text-sm
                font-medium
                text-[#123C35]
                transition-colors
                hover:bg-[#EAF4EE]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-[#16845A]
              "
            >
              Services

              <ArrowUpRight
                size={17}
                className="text-[#16845A]"
              />
            </a>

            {/* COMO FUNCIONA */}

            <a
              href="#how-it-works"
              onClick={closeMenu}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                px-4
                py-3.5
                text-sm
                font-medium
                text-[#123C35]
                transition-colors
                hover:bg-[#EAF4EE]
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-[#16845A]
              "
            >
              How it Works

              <ArrowUpRight
                size={17}
                className="text-[#16845A]"
              />
            </a>

            {/* CONTATO */}

            <Button
              onClick={closeMenu}
              className="
                mt-3
                h-12
                w-full
                rounded-xl
                bg-[#16845A]
                text-sm
                font-semibold
                text-white
                hover:bg-[#126E4B]
              "
            >
              Contact us
            </Button>

          </div>

        </nav>

      )}

    </header>
  );
};

export default Header;