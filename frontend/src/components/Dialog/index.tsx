import { useEffect, useRef } from "react";
import "./styles.css";

interface IDialogProps {
  /**
   * The id of the dialog
   * */
  id: string;
  /**
   * A title for the dialog
   * */
  title: string;
  children: React.ReactNode;
  /**
   * Whether the dialog is open or not
   * */
  open: boolean;
  /**
   * A function to close the dialog, must be set the open prop to false
   * @example
   * onClose={() => setOpen(false); ...}
   * */
  onClose: () => void;
}

export default function (props: IDialogProps) {
  const { id, title, children, onClose, open } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current as HTMLDialogElement;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog id={id} className="modal" ref={dialogRef} onClose={onClose}>
      <h3>{title}</h3>

      {open && children}

      {/* This is the action buttons */}
      <div className="modal-action">
        <form method="dialog">
          <button className="ghost">Cerrar</button>
        </form>
      </div>
    </dialog>
  );
}
