import { describe, it, expect } from "vitest";
import { isWorkRoutable } from "../../src/lib/content/work";
import { HOME_WORK_SLUGS } from "../../src/data/home";

describe("Work route eligibility", () => {
  for (const publication of ["draft", "review", "published"] as const) {
    for (const visibility of ["private", "unlisted", "public"] as const) {
      it(`${publication}/${visibility} cannot bypass publication rules`, () => {
        const entry = { id: "new-work", data: { publication, visibility } };
        expect(isWorkRoutable(entry)).toBe(
          publication === "published" && visibility === "public",
        );
      });
    }
  }
  for (const id of HOME_WORK_SLUGS) {
    it(`retains only the approved public review snapshot for ${id}`, () => {
      expect(
        isWorkRoutable({
          id,
          data: { publication: "review", visibility: "public" },
        }),
      ).toBe(true);
      expect(
        isWorkRoutable({
          id,
          data: { publication: "draft", visibility: "public" },
        }),
      ).toBe(false);
      expect(
        isWorkRoutable({
          id,
          data: { publication: "review", visibility: "private" },
        }),
      ).toBe(false);
      expect(
        isWorkRoutable({
          id,
          data: { publication: "review", visibility: "unlisted" },
        }),
      ).toBe(false);
    });
  }
});
