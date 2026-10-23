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

const MbModalMainComponent = ({
  show,
  onClose,
  children,
  title,
}: MbModalProps) => {
  return (
    <Modal dismissible={false} show={show} onClose={onClose}>
      <ModalHeader>
        <span className="text-heading text-lg font-medium">{title}</span>
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 inline-flex items-center rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
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

MbModalMainComponent.displayName = "MbModalMain";

interface MbModalFooterProps {
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  saving?: boolean;
  onSave?: React.MouseEventHandler<HTMLButtonElement>;
}

const MbModalFooterComponent = ({
  onClose,
  saving,
  onSave,
}: MbModalFooterProps) => {
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

MbModalFooterComponent.displayName = "MbModalMain.Footer";

export const MbModalMain = Object.assign(MbModalMainComponent, {
  Footer: MbModalFooterComponent,
});

export { MbModalMain as MbModal };
