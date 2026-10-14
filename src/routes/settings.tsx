import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/dashboard/pages";
export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "دیدبان | تنظیمات" },
      { name: "description", content: "تنظیمات در سامانه فارسی پایش اینستاگرام دیدبان." },
      { property: "og:title", content: "دیدبان | تنظیمات" },
      { property: "og:description", content: "تنظیمات در سامانه دیدبان." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});
