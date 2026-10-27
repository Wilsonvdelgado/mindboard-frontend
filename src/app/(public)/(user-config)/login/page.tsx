"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label, TextInput } from "flowbite-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formLoginSchema, type LoginSchema } from "./types";
import { MbButton } from "@/src/components/mbButton";
import { loginRequest } from "@/src/lib/auth";

export default function Login() {
  const router = useRouter();

  const [validating, setValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formLoginSchema),
  });

  async function onSave(userData: LoginSchema) {
    setValidating(true);
    setError(null);
    try {
      loginRequest(userData).then((response) => {
        if (!response.ok) {
          throw new Error("Email ou senha inválidos");
        }
        router.replace("/boards");
        // router.refresh();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro");
      setValue("password", "");
    } finally {
      setValidating(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Login</h2>

          <p className="mt-2 text-gray-600">
            Entre para continuar o seu brainstorm colaborativo
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSave)}>
          <div>
            <Label htmlFor="email">Email</Label>

            <TextInput
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              value={"admin@mindboardips.com"}
              className="mt-2"
              {...register("email")}
              color={errors.email ? "failure" : "gray"}
            />

            {errors.email && (
              <span className="text-sm text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>

            <TextInput
              id="password"
              type="password"
              placeholder="Palavra-passe"
              value={"admin123"}
              className="mt-2"
              {...register("password")}
              color={errors.password ? "failure" : "gray"}
            />

            {errors.password && (
              <span className="text-sm text-red-600">
                {errors.password.message}
              </span>
            )}

            {error && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>

          <MbButton
            loading={validating}
            type="submit"
            color="blue"
            size="lg"
            className="w-full"
          >
            Entrar
          </MbButton>
        </form>
      </div>
    </div>
  );
}
