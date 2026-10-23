import { zodResolver } from "@hookform/resolvers/zod";
import { ModalBody } from "flowbite-react";
import { useForm } from "react-hook-form";

import { MbTextInput } from "../../components/mbTextInput";
import { formChangePasswordSchema, type IFormChangePassword } from "./types";
import {
  apiRequest,
  showErrorNotification,
  showSuccessNotification,
} from "../../utils";
import { useState } from "react";
import { MbModal } from "../../components/mbModal";

interface ModalChangeCreateProps {
  show: boolean;
  onClose: (reload?: boolean) => void;
}
export function ModalChangeCreate({ show, onClose }: ModalChangeCreateProps) {
  const [saving, setSaving] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formChangePasswordSchema),
  });

  const onSubmit = (data: IFormChangePassword) => {
    setSaving(true);
    apiRequest("users/change-password", {
      method: "POST",
      body: data,
    })
      .then(() => {
        setSaving(false);
        showSuccessNotification("Palava-passe atualizada!");
        reset();
        onClose(true);
      })
      .catch((error) => {
        showErrorNotification(error.message || "Ocorreu um erro!");
        setSaving(false);
      });
  };

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <MbModal show={show} onClose={handleClose} title="Alterar password">
      <ModalBody>
        <div className="space-y-6">
          <form className="flex  flex-col gap-4">
            <div>
              <MbTextInput
                id="password"
                label="Palava-passe atual"
                type="password"
                errors={errors}
                {...register("currentPassword")}
              />
            </div>
            <div>
              <MbTextInput
                id="newPassword"
                label="Nova palava-passe"
                type="password"
                errors={errors}
                {...register("newPassword")}
              />
            </div>
            <div>
              <MbTextInput
                id="confirmPassword"
                label="Confirmar Palava-passe atual"
                type="password"
                errors={errors}
                {...register("confirmPassword")}
              />
            </div>
          </form>
        </div>
      </ModalBody>

      <MbModal.Footer
        onClose={handleClose}
        saving={saving}
        onSave={handleSubmit(onSubmit)}
      />
    </MbModal>
  );
}
