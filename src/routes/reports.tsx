import { createFileRoute } from "@tanstack/react-router";
import { ReportsPage } from "@/components/dashboard/pages";
export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "دیدبان | تحلیل و گزارش‌ها" },
      { name: "description", content: "تحلیل و گزارش‌ها در سامانه فارسی پایش اینستاگرام دیدبان." },
      { property: "og:title", content: "دیدبان | تحلیل و گزارش‌ها" },
      { property: "og:description", content: "تحلیل و گزارش‌ها در سامانه دیدبان." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});
