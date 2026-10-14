import {createFileRoute} from '@tanstack/react-router';
import {AlertsPage} from '@/components/dashboard/pages';
export const Route=createFileRoute('/alerts')({head:()=>({meta:[{title:'دیدبان | هشدارها'},{name:'description',content:'هشدارها در سامانه فارسی پایش اینستاگرام دیدبان.'},{property:'og:title',content:'دیدبان | هشدارها'},{property:'og:description',content:'هشدارها در سامانه دیدبان.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:AlertsPage});
