import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] === "all" ? undefined : slug?.[0];
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
      <NotesClient tag={tag ?? ""} />
    </HydrationBoundary>
  );
}
