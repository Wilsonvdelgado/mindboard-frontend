"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function VerifyAccountSuccess() {
  const router = useRouter();

  function handleRedirectLogin() {
    router.replace("/login");
  }
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sucesso</h2>
          <p className="mt-2 text-gray-600">
            A palavra-passe já foi registada. Faça o login para continue a sua
            jornada de brainstorm colaborativo
          </p>
        </div>

        <Button
          type="submit"
          color="blue"
          size="lg"
          className="w-full"
          onClick={handleRedirectLogin}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
