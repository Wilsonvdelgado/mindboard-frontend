import { zodResolver } from "@hookform/resolvers/zod";
import { ModalBody } from "flowbite-react";
import { useForm } from "react-hook-form";

import { formCreateSchema, type IFormCreate, type IUser } from "./types";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/src/lib/utils";
import { useState } from "react";
import { updateUser } from "@/src/lib/users";
import { MbModal } from "@/src/components/mbModal";
import { MbTextInput } from "@/src/components/mbTextInput";
import { MbSelect } from "@/src/components/mbSelect";

interface ModalEditProps {
  user: IUser;
  onClose: (reload?: boolean) => void;
}
export function ModalEdit({ user, onClose }: ModalEditProps) {
  const [saving, setSaving] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formCreateSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
    },
  });

  const onSubmit = (data: IFormCreate) => {
    setSaving(true);
    updateUser(user.id, data)
      .then(() => {
        setSaving(false);
        showSuccessNotification("Utilizador atualizado com sucesso!");
        onClose(true);
      })
      .catch((error) => {
        showErrorNotification(error.message || "Erro ao atualizar utilizador!");
        setSaving(false);
      });
  };

  return (
    <MbModal show onClose={onClose} title="Editar">
      <ModalBody>
        <div className="space-y-6">
          <form className="flex flex-col gap-4">
            <div>
              <MbTextInput
                id="name"
                label="Nome"
                errors={errors}
                {...register("name")}
              />
            </div>
            <div>
              <MbTextInput
                id="email"
                label="Email"
                errors={errors}
                placeholder="name@flowbite.com"
                {...register("email")}
              />
            </div>

            <div>
              <MbSelect
                errors={errors}
                id="type"
                label="Tipo"
                dataSource={[
                  { value: "user", label: "Normal" },
                  { value: "admin", label: "Administrador" },
                ]}
                {...register("role")}
              />
            </div>
          </form>
        </div>
      </ModalBody>
      <MbModal.Footer
        onClose={() => onClose(false)}
        saving={saving}
        onSave={handleSubmit(onSubmit)}
      />
    </MbModal>
  );
}
