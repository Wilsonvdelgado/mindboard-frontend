import { zodResolver } from "@hookform/resolvers/zod";
import { ModalBody } from "flowbite-react";
import { useForm } from "react-hook-form";

import { formCreateSchema, type IFormCreate, type IBoard } from "./types";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/src/lib/utils";
import { useState } from "react";
import { updateBoard } from "@/src/lib/boards";
import { MbTextInput } from "@/src/components/mbTextInput";
import { MbModal } from "@/src/components/mbModal";
import { MbTextArea } from "@/src/components/mbTextArea";

interface ModalEditProps {
  board: IBoard;
  onClose: (reload?: boolean) => void;
}
export function ModalEdit({ board, onClose }: ModalEditProps) {
  const [saving, setSaving] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formCreateSchema),
    defaultValues: {
      name: board?.name || "",
      description: board?.description || "",
    },
  });

  const onSubmit = (data: IFormCreate) => {
    setSaving(true);
    updateBoard(board.id, data)
      .then(() => {
        setSaving(false);
        showSuccessNotification("Sala atualizada com sucesso!");
        onClose(true);
      })
      .catch((error) => {
        showErrorNotification(error.message || "Erro ao atualizar sala!");
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
