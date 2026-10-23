import { zodResolver } from "@hookform/resolvers/zod";
import { ModalBody } from "flowbite-react";
import { useForm } from "react-hook-form";

import { formCreateSchema, type IFormCreate } from "./types";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/src/lib/utils";
import { useState } from "react";
import { MbModal } from "@/src/components/mbModal";
import { MbTextInput } from "@/src/components/mbTextInput";
import { MbTextArea } from "@/src/components/mbTextArea";
import { createBoard } from "@/src/lib/boards";

interface ModalCreateProps {
  show: boolean;
  onClose: (reload?: boolean) => void;
}
export function ModalCreate({ show, onClose }: ModalCreateProps) {
  const [saving, setSaving] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formCreateSchema),
  });

  const onSubmit = (data: IFormCreate) => {
    setSaving(true);
    createBoard(data)
      .then(() => {
        setSaving(false);
        showSuccessNotification("Quadro criado com sucesso!");
        onClose(true);
      })
      .catch((error) => {
        showErrorNotification(error.message || "Erro ao criar quadro!");
        setSaving(false);
      });
  };

  return (
    <MbModal show={show} onClose={onClose} title="Criar">
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
              <MbTextArea
                id="description"
                label="Descrição"
                errors={errors}
                {...register("description")}
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
