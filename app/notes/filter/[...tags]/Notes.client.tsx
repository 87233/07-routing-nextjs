"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useModalControl from "@/hooks/useModalControl";
import NotesPage from "@/components/NotesPage/NotesPage";
import { fetchNotes } from "@/lib/api";

import type { FetchNotesParams, FetchNotesResponse } from "@/lib/api";

interface NotesClientProps {
  initialTag?: string;
}

function NotesClient({ initialTag }: NotesClientProps) {
  const [params, setParams] = useState<FetchNotesParams>({
    search: "",
    page: 1,
    sortBy: "created",
    tag: initialTag,
  });

  const { data, isLoading, isSuccess, isError } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ["notes", params.search, params.sortBy, params.page, params.tag],
    queryFn: () => fetchNotes(params),
    staleTime: 1000 * 60 * 4,
    placeholderData: keepPreviousData,
  });

  const debounceSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setParams((prev) => ({
        ...prev,
        search: event.target.value,
        page: 1,
      }));
    },
    300
  );

  const createNoteModal = useModalControl();

  return (
    <NotesPage
      params={params}
      setParams={setParams}
      data={data}
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
      debounceSearch={debounceSearch}
      createNoteModal={createNoteModal}
    />
  );
}

export default NotesClient;
