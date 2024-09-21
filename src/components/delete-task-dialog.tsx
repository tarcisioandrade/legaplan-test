import React, { FormEvent, ReactNode, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface Props extends Dialog.DialogProps {
  children: ReactNode;
  handleRemove: () => void;
}

const DeleteTaskDialog = ({ handleRemove, children, ...props }: Props) => {
  const [open, setOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleRemove();
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} {...props}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">Deletar tarefa</Dialog.Title>
          <Dialog.DialogDescription className="sr-only">
            Dialog para remove uma task
          </Dialog.DialogDescription>
          <form onSubmit={handleSubmit}>
            <p>Tem certeza que você deseja deletar essa tarefa?</p>
            <div className="dialog-buttons">
              <button className="button-destructive" type="submit">
                Deletar
              </button>
              <Dialog.Close asChild>
                <button className="button-secondary" aria-label="Close">
                  Cancelar
                </button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteTaskDialog;
