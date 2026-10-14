import { createFileRoute } from "@tanstack/react-router";
import { Overview } from "@/components/dashboard/pages";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "دیدبان | نمای کلی پایش اینستاگرام" },
      {
        name: "description",
        content: "داشبورد فارسی دیدبان برای پایش حساب‌ها، محتوا و هشدارهای اینستاگرام.",
      },
      { property: "og:title", content: "دیدبان | نمای کلی" },
      {
        property: "og:description",
        content: "نمای یکپارچه فعالیت حساب‌های اینستاگرام در داشبورد فارسی دیدبان.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Overview,
});
