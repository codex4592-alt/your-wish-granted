import tehran from '@/assets/tehran.jpg';
import cafe from '@/assets/cafe.jpg';
import nature from '@/assets/nature.jpg';
export const fa = (n: number) => n.toLocaleString('fa-IR');
export type Account = { id:string; user:string; name:string; group:string; followers:number; growth:number; status:string; image?:string; initials:string; posts:number };
export const initialAccounts: Account[] = [
 { id:'1',user:'tehran.daily',name:'تهران دیلی',group:'خبری',followers:128450,growth:12.8,status:'active',image:tehran,initials:'ت',posts:24 },
 { id:'2',user:'cafe.tehroon',name:'کافه تهرون',group:'فرهنگی',followers:84320,growth:8.4,status:'active',image:cafe,initials:'ک',posts:18 },
 { id:'3',user:'iran.nature',name:'طبیعت ایران',group:'گردشگری',followers:215680,growth:15.2,status:'active',image:nature,initials:'ط',posts:31 },
 { id:'4',user:'eco.news.ir',name:'اخبار اقتصادی',group:'اقتصادی',followers:56780,growth:-2.3,status:'error',initials:'ا',posts:12 },
 { id:'5',user:'art.gallery.ir',name:'گالری هنر ایران',group:'فرهنگی',followers:42150,growth:5.6,status:'paused',initials:'ه',posts:9 },
];
export const posts = [
 {id:'p1',account:'1',type:'photo',label:'پست',image:tehran,caption:'تهران، از زاویه‌ای دیگر؛ یک عصر دل‌انگیز در میدان آزادی. #تهران #گردشگری',likes:1240,comments:86,time:'۱۲ دقیقه پیش',fresh:true},
 {id:'p2',account:'2',type:'reel',label:'ریلز',image:cafe,caption:'عطر قهوه و طعم یک روز خوب ☕ کیک پسته‌ای تازه کافه تهرون. #کافه #قهوه',likes:856,comments:42,time:'۲۸ دقیقه پیش',fresh:true},
 {id:'p3',account:'3',type:'story',label:'استوری',image:nature,caption:'صبحی آرام در دل طبیعت شمال ایران 🌿 #طبیعت #ایران',likes:2340,comments:124,time:'۴۵ دقیقه پیش',fresh:false},
];
export const initialAlerts = [
 {id:'a1',account:'3',title:'رشد غیرعادی دنبال‌کنندگان',description:'افزایش ۱۵.۲٪ دنبال‌کنندگان در ۲۴ ساعت گذشته',time:'۱۰ دقیقه پیش',type:'warning',read:false},
 {id:'a2',account:'1',title:'انتشار پست جدید',description:'یک پست جدید از tehran.daily دریافت شد',time:'۱۲ دقیقه پیش',type:'info',read:false},
 {id:'a3',account:'4',title:'خطا در دریافت اطلاعات',description:'دریافت اطلاعات حساب با مشکل مواجه شده است',time:'۳۵ دقیقه پیش',type:'danger',read:false},
];
export const growthData = Array.from({length:14},(_,i)=>({day:fa(i+1)+' مهر',tehran:105+ i*1.6+Math.sin(i*1.1)*3,cafe:72+i*.9+Math.sin(i*1.3)*2,nature:174+i*3+Math.cos(i*1.5)*4}));
export const contentTypes = [{name:'عکس',value:42,color:'var(--primary)',type:'photo'},{name:'ریلز',value:28,color:'var(--violet)',type:'reel'},{name:'استوری',value:22,color:'var(--success)',type:'story'},{name:'ویدئو',value:8,color:'var(--warning)',type:'video'}];
