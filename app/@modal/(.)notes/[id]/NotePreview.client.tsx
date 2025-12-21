"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

interface NotePreviewClientProps {
  id?: string;
}
const NotePreviewClient = ({ id: propId }: NotePreviewClientProps) => {
  const params = useParams<{ id: string }>();
  const id = propId ?? params.id;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id!),
    refetchOnMount: false,
    enabled: Boolean(id),
  });

  const router = useRouter();
  const close = () => router.back();

  if (isLoading) {
    return (
      <Modal onClose={close}>
        <p>Loading, please wait...</p>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={close}>
        <p>Something went wrong.</p>
      </Modal>
    );
  }

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
export default NotePreviewClient;
