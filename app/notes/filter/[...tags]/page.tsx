import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

interface Props {
  params: Promise<{ tags: string[] }>;
}

export default async function NotesPage({ params }: Props) {
  const { tags } = await params;
  const tag = tags?.[0] === "all" ? undefined : tags?.[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<FetchNotesResponse>({
    queryKey: ["notes", "", tag, "created", 1],
    queryFn: () =>
      fetchNotes({
        search: "",
        page: 1,
        sortBy: "created",
        tag: tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}
