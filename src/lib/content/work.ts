import { HOME_WORK_SLUGS } from "../../data/home";

type WorkPublication = {
  id: string;
  data: {
    publication: "draft" | "review" | "published";
    visibility: "private" | "unlisted" | "public";
  };
};

/** Preserve the three Home review snapshots without publishing other reviews. */
export function isWorkRoutable(entry: WorkPublication): boolean {
  return (
    entry.data.visibility === "public" &&
    (entry.data.publication === "published" ||
      (entry.data.publication === "review" &&
        HOME_WORK_SLUGS.some((id) => id === entry.id)))
  );
}
