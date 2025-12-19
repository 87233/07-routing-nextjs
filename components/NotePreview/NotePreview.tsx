"use client";

import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";

interface NotePreviewProps {
  note: Note;
}

const NotePreview = ({ note }: NotePreviewProps) => {
  const router = useRouter();

  const close = () => router.back();

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
