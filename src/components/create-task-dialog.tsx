import React, { FormEvent, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface Props extends Dialog.DialogProps {
  handleCreate: () => void;
  setTitle: (title: string) => void;
  value: string;
}

const CreateTaskDialog = ({
  handleCreate,
  setTitle,
  value,
  ...props
}: Props) => {
  const [open, setOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleCreate();
    setOpen(false);
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen} {...props}>
      <Dialog.Trigger asChild>
        <button className="button-primary">Adicionar nova tarefa</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">Nova Tarefa</Dialog.Title>
          <Dialog.DialogDescription className="sr-only">
            Dialog para adicionar uma nova task
          </Dialog.DialogDescription>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Título</label>
              <input
                value={value}
                required
                onChange={({ target }) => setTitle(target.value)}
                type="text"
                placeholder="Digite"
              />
            </div>
            <div className="dialog-buttons">
              <button className="button-primary" type="submit">
                Adicionar
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

export default CreateTaskDialog;
