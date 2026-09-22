
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  UserRound,
  Eye,
  EyeOff,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  MapPinned,
  Layers3,
  LocateFixed,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Header from "@/components/Header";

import ManImage from "../../public/image 4.png";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Acesso demonstrativo:
  // ainda não existe autenticação real nesta tela.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate("/map");
  };

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F7F9F7]
      "
    >
      {/* CABEÇALHO EXISTENTE */}

      <Header />

      {/* CONTEÚDO PRINCIPAL */}

      <main
        className="
          relative
          mx-auto
          flex
          min-h-[calc(100dvh-80px)]
          w-full
          max-w-[1440px]
          items-center
          justify-center
          px-4
          py-8
          sm:px-8
          sm:py-10
          lg:justify-start
          lg:px-12
          lg:py-12
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-1
            items-center
            gap-10
            lg:grid-cols-2
            lg:gap-12
          "
        >

          {/* ================================
              SEÇÃO DO FORMULÁRIO
          ================================= */}

          <section
            className="
              relative
              z-10
              mx-auto
              w-full
              max-w-[480px]
              py-4
              sm:py-6
              lg:py-8
            "
          >

            {/* IDENTIDADE */}

            <div className="mb-9">

              <div
                className="
                  mb-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#DCE9E1]
                  bg-[#EAF4EE]
                  px-3
                  py-2
                "
              >
                <ShieldCheck
                  size={16}
                  className="text-[#16845A]"
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    text-[#16845A]
                  "
                >
                  Bem-vindo ao GeoShield
                </span>
              </div>

              <h1
                className="
                  max-w-[430px]
                  text-[30px]
                  font-bold
                  leading-[1.15]
                  tracking-tight
                  text-[#123C35]
                  sm:text-[38px]
                  lg:text-[42px]
                "
              >
                Sua região,
                <br />

                <span className="text-[#16845A]">
                  suas informações.
                </span>
              </h1>

              <p
                className="
                  mt-5
                  max-w-[400px]
                  text-sm
                  leading-7
                  text-[#65716B]
                  sm:text-base
                "
              >
                Acesse a plataforma e explore
                informações sobre a sua região
                de forma simples e interativa.
              </p>

            </div>

            {/* CARTÃO DO FORMULÁRIO */}

            <div
              className="
                rounded-[24px]
                border
                border-[#E4EAE5]
                bg-white
                p-5
                shadow-[0_12px_45px_rgba(18,60,53,0.05)]
                sm:p-8
              "
            >

              {/* CABEÇALHO DO CARTÃO */}

              <div className="mb-7">

                <h2
                  className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-[#123C35]
                  "
                >
                  Acesse sua conta
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-[#65716B]
                  "
                >
                  Insira suas informações para
                  continuar explorando o GeoShield.
                </p>

              </div>

              {/* FORMULÁRIO */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* NOME DE USUÁRIO */}

                <div className="space-y-2">

                  <label
                    htmlFor="login-username"
                    className="
                      block
                      text-sm
                      font-semibold
                      text-[#123C35]
                    "
                  >
                    Nome de usuário
                  </label>

                  <div className="relative">

                    <UserRound
                      size={19}
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[#84908A]
                      "
                    />

                    <Input
                      id="login-username"
                      type="text"
                      autoComplete="username"
                      placeholder="Seu nome de usuário"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          username: e.target.value,
                        })
                      }
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

                  </div>

                </div>

                {/* SENHA */}

                <div className="space-y-2">

                  <label
                    htmlFor="login-password"
                    className="
                      block
                      text-sm
                      font-semibold
                      text-[#123C35]
                    "
                  >
                    Senha
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={19}
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[#84908A]
                      "
                    />

                    <Input
                      id="login-password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                      className="
                        h-12
                        rounded-xl
                        border-[#DCE6DF]
                        bg-white
                        pl-11
                        pr-12
                        text-sm
                        text-[#123C35]
                        placeholder:text-[#84908A]
                        focus-visible:ring-[#16845A]/30
                      "
                    />

                    {/* MOSTRAR OU OCULTAR SENHA */}

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (previous) => !previous
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Ocultar senha"
                          : "Mostrar senha"
                      }
                      aria-pressed={showPassword}
                      className="
                        absolute
                        right-3
                        top-1/2
                        flex
                        h-9
                        w-9
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-lg
                        text-[#84908A]
                        transition-colors
                        hover:bg-[#EAF4EE]
                        hover:text-[#16845A]
                        focus-visible:outline
                        focus-visible:outline-2
                        focus-visible:outline-[#16845A]
                      "
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* BOTÃO PRINCIPAL */}

                <Button
                  type="submit"
                  className="
                    mt-2
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
                    focus-visible:ring-[#16845A]/30
                  "
                >
                  Acessar demonstração

                  <ArrowRight size={18} />
                </Button>

                <p
                  className="
                    text-center
                    text-xs
                    leading-relaxed
                    text-[#84908A]
                  "
                >
                  Versão demonstrativa.
                  Os dados informados não são
                  autenticados.
                </p>

              </form>

              {/* CADASTRO */}

              <div
                className="
                  mt-6
                  border-t
                  border-[#E4EAE5]
                  pt-6
                "
              >

                <p
                  className="
                    text-center
                    text-sm
                    text-[#65716B]
                  "
                >
                  Ainda não tem uma conta?{" "}

                  <Link
                    to="/register"
                    className="
                      font-semibold
                      text-[#16845A]
                      transition-colors
                      hover:text-[#123C35]
                      hover:underline
                    "
                  >
                    Criar uma conta
                  </Link>
                </p>

              </div>

            </div>

          </section>

          {/* ================================
              SEÇÃO VISUAL
          ================================= */}

          <section
            aria-label="Apresentação do GeoShield"
            className="
              relative
              hidden
              min-h-[640px]
              overflow-hidden
              rounded-[32px]
              bg-[#EAF4EE]
              lg:block
            "
          >
            {/* ELEMENTOS DECORATIVOS */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-24
                top-24
                h-[450px]
                w-[450px]
                rounded-full
                border
                border-[#C7E3D1]
                bg-[#DAEDE2]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                right-8
                top-32
                h-[350px]
                w-[350px]
                rounded-full
                border
                border-white/60
              "
            />

            {/* GLOW SUAVE ATRÁS DA FOTO */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-6
                right-10
                h-[280px]
                w-[280px]
                rounded-full
                bg-white/50
                blur-3xl
              "
            />

            {/* TEXTO DE APRESENTAÇÃO */}

            <div
              className="
                relative
                z-20
                max-w-[380px]
                px-9
                pt-10
                xl:px-12
                xl:pt-12
              "
            >
              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#CFE6D8]
                  bg-white/80
                  px-3
                  py-2
                "
              >
                <MapPinned
                  size={15}
                  className="text-[#16845A]"
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    text-[#16845A]
                  "
                >
                  Explore sua região
                </span>
              </div>

              <h2
                className="
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-[#123C35]
                  xl:text-[36px]
                "
              >
                O que acontece
                <br />
                ao seu redor?
              </h2>

              <p
                className="
                  mt-4
                  max-w-[290px]
                  text-sm
                  leading-relaxed
                  text-[#65716B]
                "
              >
                Explore o mapa e visualize
                diferentes categorias de
                informações em uma única plataforma.
              </p>
            </div>

            {/* FOTO MELHOR POSICIONADA */}
            <img
              src={ManImage}
              alt="Homem olhando para o celular"
              className="
                pointer-events-none
                absolute
                bottom-[-60%]
                right-[-6%]
                z-10
                h-[88%]
                w-auto
                max-w-none
                object-contain
                object-bottom
                select-none
                origin-bottom
                scale-[1.70]
                drop-shadow-[0_20px_40px_rgba(18,60,53,0.16)]
              "
            />

            {/* CARD FLUTUANTE */}
            <div
              className="
                absolute
                bottom-10
                left-8
                z-20
                max-w-[255px]
                rounded-2xl
                border
                border-white/80
                bg-white/95
                p-4
                shadow-[0_10px_30px_rgba(18,60,53,0.10)]
                backdrop-blur-md
                xl:left-10
              "
            >
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EAF4EE]
                  "
                >
                  <Layers3
                    size={19}
                    className="text-[#16845A]"
                  />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-[#123C35]
                    "
                  >
                    Mapa interativo
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[11px]
                      text-[#65716B]
                    "
                  >
                    Informações por categoria
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  border-t
                  border-[#E4EAE5]
                  pt-3
                "
              >
                <LocateFixed
                  size={15}
                  className="text-[#16845A]"
                />

                <span
                  className="
                    text-xs
                    text-[#65716B]
                  "
                >
                  Explore sua localização
                </span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Login;