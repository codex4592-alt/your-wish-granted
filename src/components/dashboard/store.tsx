import {createContext,useContext,useState,type ReactNode} from 'react';
import {initialAccounts,initialAlerts,type Account} from './data';
const useDemoState = () => {
 const [accounts,setAccounts]=useState(initialAccounts);
 const [alerts,setAlerts]=useState(initialAlerts);
 const [search,setSearch]=useState('');
 const [contentFilter,setContentFilter]=useState('all');
 const [addOpen,setAddOpen]=useState(false);
 return {accounts,setAccounts,alerts,setAlerts,search,setSearch,contentFilter,setContentFilter,addOpen,setAddOpen,addAccount:(account:Account)=>setAccounts(a=>[account,...a])};
};
const DemoContext=createContext<ReturnType<typeof useDemoState>|null>(null);
export function DemoProvider({children}:{children:ReactNode}) { const state=useDemoState(); return <DemoContext.Provider value={state}>{children}</DemoContext.Provider>; }
export function useDemo(){const state=useContext(DemoContext);if(!state)throw new Error('DemoProvider missing');return state;}
