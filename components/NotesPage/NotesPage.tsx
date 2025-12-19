import css from "./NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Modal from "@/components/Modal/Modal";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";

import { Toaster } from "react-hot-toast";
import type { FetchNotesParams, FetchNotesResponse } from "@/lib/api";

type NotesPageProps = {
  params: FetchNotesParams;
  setParams: React.Dispatch<React.SetStateAction<FetchNotesParams>>;
  data?: FetchNotesResponse;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  debounceSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createNoteModal: {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
};

const NotesPage = ({
  params,
  setParams,
  data,
  isLoading,
  isError,
  isSuccess,
  debounceSearch,
  createNoteModal,
}: NotesPageProps) => {
  return (
    <div className={css.app}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "toast-container",
          style: {
            zIndex: 9999,
          },
        }}
      />
      <header className={css.toolbar}>
        <SearchBox search={params.search ?? ""} onChange={debounceSearch} />
        {isSuccess && data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={params.page ?? 1}
            totalPages={data.totalPages}
            onPageChange={(page) => setParams((prev) => ({ ...prev, page }))}
          />
        )}

        <button className={css.button} onClick={createNoteModal.openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && !isLoading && <NoteList notes={data.notes} />}
      {createNoteModal.isModalOpen && (
        <Modal onClose={createNoteModal.closeModal}>
          <NoteForm onClose={createNoteModal.closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesPage;
