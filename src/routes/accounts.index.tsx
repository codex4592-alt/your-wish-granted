import {createFileRoute} from '@tanstack/react-router';
import {AccountsPage} from '@/components/dashboard/pages';
export const Route=createFileRoute('/accounts/')({head:()=>({meta:[{title:'دیدبان | حساب‌های تحت پایش'},{name:'description',content:'حساب‌های تحت پایش در سامانه فارسی پایش اینستاگرام دیدبان.'},{property:'og:title',content:'دیدبان | حساب‌های تحت پایش'},{property:'og:description',content:'حساب‌های تحت پایش در سامانه دیدبان.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:AccountsPage});
