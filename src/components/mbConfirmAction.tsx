import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import React, { useState } from "react";

interface MbConfirmActionProps {
  title?: string;
  onConfirm: () => Promise<void>;
  children: React.ReactElement;
}
export function MbConfirmAction({
  title,
  onConfirm,
  children,
}: MbConfirmActionProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setOpenModal(false);
  };

  const trigger = React.cloneElement(children, {
    onClick: () => setOpenModal(true),
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <>
      {trigger}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title ?? "Tens certeza?"}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={() => handleConfirm()}>
                Sim
              </Button>
              <Button color="alternative" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
