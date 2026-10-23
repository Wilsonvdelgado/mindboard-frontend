"use client";

import { verifyUserAcount, verifyUserCreatePassword } from "@/src/lib/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreatePasswordSchema, formSchema } from "../types";
import { showErrorNotification } from "@/src/lib/utils";
import { AppLoading } from "@/src/components/appLoading";
import { Button, Label, TextInput } from "flowbite-react";

export default function VerifyAcountPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const [loadingData, setLoadingData] = useState(true);
  const [userName, setUsername] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    verifyUserAcount(token)
      .then((data) => {
        if (data && data.name) {
          setUsername(data.name);
          setLoadingData(false);
        } else {
          router.replace("/login");
        }
      })
      .catch(() => {
        router.replace("/boards");
      });
  }, [token, router]);

  const password = watch("password", "");

  function onSave(formData: CreatePasswordSchema) {
    if (formData.confirm !== formData.password) {
      showErrorNotification("As palavras-passses não são iguais");
      return;
    }
    verifyUserCreatePassword(token, { ...formData, token })
      .then(() => {
        router.replace("/verify-acount-success");
      })
      .catch(() => {});
  }

  return (
    <>
      {/* Formulário */}
      {loadingData ? (
        <div className="mt-4 flex flex-1 justify-center">
          <AppLoading />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Registar Password
              </h2>
              <p className="mt-2 text-gray-600">
                Olá {userName}, Defina uma nova password para a sua conta e
                continue a sua jornada de brainstorm colaborativo
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSave)}>
              <div>
                <Label htmlFor="password">Palavra-passe</Label>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="password"
                  className="mt-2"
                  {...register("password")}
                  color={errors["password"] ? "failure" : "gray"}
                />
                {errors && errors["password"] && (
                  <p className="text-sm text-red-600">
                    {errors["password"]?.message?.toString()}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar Palavra-passe</Label>
                <TextInput
                  id="confirm"
                  type="password"
                  placeholder="confirmar password"
                  className="mt-2"
                  {...register("confirm", {
                    validate: (value) =>
                      value === password || "Passwords não são iguais",
                  })}
                />
                {errors && errors["confirm"] && (
                  <p className="text-sm text-red-600">
                    {errors["confirm"]?.message?.toString()}
                  </p>
                )}
              </div>

              <Button type="submit" color="blue" size="lg" className="w-full">
                Registar
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
