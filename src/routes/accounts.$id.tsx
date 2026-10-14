import {createFileRoute} from '@tanstack/react-router';
import {AccountDetail} from '@/components/dashboard/pages';
export const Route=createFileRoute('/accounts/$id')({head:()=>({meta:[{title:'دیدبان | جزئیات حساب'},{name:'description',content:'فعالیت‌ها، محتوا و هشدارهای حساب اینستاگرام در دیدبان.'},{property:'og:title',content:'دیدبان | جزئیات حساب'},{property:'og:description',content:'تاریخچه پایش حساب اینستاگرام.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Detail});
function Detail(){const {id}=Route.useParams();return <AccountDetail id={id}/>;}
