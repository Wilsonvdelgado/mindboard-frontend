import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  type ModalProps,
} from "flowbite-react";
import { MbButton } from "./mbButton";

interface MbModalProps extends ModalProps {
  title?: string;
  show: boolean;
  onClose: (reload?: boolean) => void;
  children: React.ReactNode;
}
export const MbModalMain = ({
  show,
  onClose,
  children,
  title,
}: MbModalProps) => {
  return (
    <Modal dismissible={false} show={show} onClose={onClose}>
      <ModalHeader>
        <span className="text-lg font-medium text-heading">{title}</span>
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </ModalHeader>
      {children}
    </Modal>
  );
};

interface MbModalFooterProps {
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  saving?: boolean;
  onSave?: React.MouseEventHandler<HTMLButtonElement>;
}

MbModalMain.Footer = ({ onClose, saving, onSave }: MbModalFooterProps) => {
  return (
    <ModalFooter className="justify-end">
      <Button color="alternative" onClick={onClose}>
        Cancelar
      </Button>
      <MbButton loading={saving} onClick={onSave}>
        Guardar
      </MbButton>
    </ModalFooter>
  );
};

export { MbModalMain as MbModal };
