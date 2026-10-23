import { Button, Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Brainstorm colaborativo, em tempo real
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Crie, organize e desenvolva ideias com sua equipa de forma
              simples. Transforme pensamentos soltos em planos concretos usando
              uma plataforma online, rápida e colaborativa.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/login">
                <Button size="lg">Entrar</Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://plus.unsplash.com/premium_vector-1683133928836-bf1824624644?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Brainstorm - imagens de pessoas compartilhando ideias"
              width={1632}
              height={1088} // Ajuste a altura proporcional à proporção real da imagem
              className="rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Por que fazer brainstorm online?
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card>
              <h5 className="text-xl font-semibold">
                Colaboração em tempo real
              </h5>
              <p className="text-gray-600">
                Todos participam simultaneamente, vendo ideias aparecerem ao
                vivo.
              </p>
            </Card>

            <Card>
              <h5 className="text-xl font-semibold">Organização visual</h5>
              <p className="text-gray-600">
                Use post-its digitais, categorias e cores para estruturar
                ideias.
              </p>
            </Card>

            <Card>
              <h5 className="text-xl font-semibold">
                Acesso em qualquer lugar
              </h5>
              <p className="text-gray-600">
                Trabalhe com sua equipa remotamente, sem perder produtividade.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Image section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <Image
            src="https://images.unsplash.com/vector-1757394158090-f76e0d78d661?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Equipa a colaborar e a partilhar ideias"
            width={1170}
            height={780}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full rounded-2xl object-contain shadow-lg"
          />

          <div>
            <h3 className="text-3xl font-bold text-gray-900">
              Da ideia ao plano
            </h3>
            <p className="mt-4 text-gray-600">
              Capture ideias, discuta com a equipa e transforme tudo em ações. O
              brainstorm online elimina barreiras e acelera decisões.
            </p>
            <div className="mt-6">
              <Link href="/login">
                <Button>Começar agora</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <p className="text-sm text-gray-500">© 2026 Brainstorm App</p>
          <Link href="/login" className="text-sm font-medium text-blue-600">
            Entrar
          </Link>
        </div>
      </footer>
    </div>
  );
}
