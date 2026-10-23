"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ModalBody } from "flowbite-react";
import { useForm } from "react-hook-form";
import { formCreateSchema, type IFormCreate } from "./types";
import { useState } from "react";
import { MbModal } from "@/src/components/mbModal";
import { MbTextArea } from "@/src/components/mbTextArea";
import { ColorSelect } from "@/src/components/colorSelect";

interface ModalCreateCardProps {
  saving: boolean;
  onCancel: () => void;
  onSubmit: (data: IFormCreate) => void;
}
export function ModalCreateCard({
  onCancel,
  onSubmit,
  saving,
}: ModalCreateCardProps) {
  const [color, setColor] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formCreateSchema),
  });

  function handleChangeColor(value: string) {
    setColor(value);
  }

  function handleSubmitForm(data: IFormCreate) {
    onSubmit({ ...data, color: color });
  }

  return (
    <MbModal show onClose={onCancel} title="Criar cartão">
      <ModalBody>
        <div className="space-y-6">
          <form className="flex flex-col gap-4">
            <div>
              <MbTextArea
                id="description"
                label="Descrição"
                errors={errors}
                {...register("description")}
              />
            </div>

            <div>
              <ColorSelect onChange={handleChangeColor} />
            </div>
          </form>
        </div>
      </ModalBody>

      <MbModal.Footer
        onClose={onCancel}
        saving={saving}
        onSave={handleSubmit(handleSubmitForm)}
      />
    </MbModal>
  );
}
