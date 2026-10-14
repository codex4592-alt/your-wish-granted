import {createFileRoute} from '@tanstack/react-router';
import {SearchPage} from '@/components/dashboard/pages';
export const Route=createFileRoute('/search')({head:()=>({meta:[{title:'دیدبان | جست‌وجو و فیلترها'},{name:'description',content:'جست‌وجو و فیلترها در سامانه فارسی پایش اینستاگرام دیدبان.'},{property:'og:title',content:'دیدبان | جست‌وجو و فیلترها'},{property:'og:description',content:'جست‌وجو و فیلترها در سامانه دیدبان.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:SearchPage});
