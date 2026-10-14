import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/dashboard/pages";
export const Route = createFileRoute("/content")({
  head: () => ({
    meta: [
      { title: "دیدبان | پست‌ها و استوری‌ها" },
      {
        name: "description",
        content: "پست‌ها و استوری‌ها در سامانه فارسی پایش اینستاگرام دیدبان.",
      },
      { property: "og:title", content: "دیدبان | پست‌ها و استوری‌ها" },
      { property: "og:description", content: "پست‌ها و استوری‌ها در سامانه دیدبان." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContentPage,
});
