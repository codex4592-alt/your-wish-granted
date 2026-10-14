import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Images,
  Bell,
  ChartNoAxesCombined,
  Search,
  Settings,
  Instagram,
  PanelRightClose,
  PanelRightOpen,
  ChevronDown,
  Menu,
  X,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "./store";
import { fa } from "./data";
const nav = [
  { to: "/" as const, label: "نمای کلی", icon: LayoutDashboard },
  { to: "/accounts" as const, label: "حساب‌های تحت پایش", icon: Users },
  { to: "/content" as const, label: "پست‌ها و استوری‌ها", icon: Images },
  { to: "/alerts" as const, label: "هشدارها", icon: Bell },
  { to: "/reports" as const, label: "تحلیل و گزارش‌ها", icon: ChartNoAxesCombined },
  { to: "/search" as const, label: "جست‌وجو و فیلترها", icon: Search },
  { to: "/settings" as const, label: "تنظیمات", icon: Settings },
];
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { search, setSearch, alerts, addOpen, setAddOpen, addAccount, accounts } = useDemo();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("خبری");
  const [error, setError] = useState("");
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const user = username.trim().replace(/^@/, "");
    if (!/^[A-Za-z0-9._]{1,30}$/.test(user)) {
      setError("نام کاربری معتبر اینستاگرام را وارد کنید.");
      return;
    }
    if (accounts.some((a) => a.user.toLowerCase() === user.toLowerCase())) {
      setError("این حساب قبلاً اضافه شده است.");
      return;
    }
    addAccount({
      id: crypto.randomUUID(),
      user,
      name: name || user,
      group,
      followers: 0,
      growth: 0,
      status: "paused",
      initials: (name || user)[0] || "ا",
      posts: 0,
    });
    setAddOpen(false);
    setUsername("");
    setName("");
    setError("");
    navigate({ to: "/accounts" });
  };
  return (
    <div className="app-shell">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobile ? "mobile-open" : ""}`}>
        <div className="brand">
          <span className="brand-icon">
            <Instagram size={24} />
          </span>
          <div className="brand-copy">
            <strong>دیدبان</strong>
            <small>سامانه پایش اینستاگرام</small>
          </div>
          <Button
            className="mobile-menu mr-auto"
            variant="ghost"
            size="icon"
            title="بستن منو"
            onClick={() => setMobile(false)}
          >
            <X />
          </Button>
        </div>
        <div className="nav-label">فضای کاری</div>
        <nav>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              title={n.label}
              className={`nav-link ${path === n.to || (n.to !== "/" && path.startsWith(n.to)) ? "active" : ""}`}
              onClick={() => setMobile(false)}
            >
              <n.icon />
              <span className="nav-text">{n.label}</span>
              {n.to === "/alerts" && (
                <span className="nav-count">{fa(alerts.filter((a) => !a.read).length)}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot" />
            محیط پیش‌نمایش<p>اتصال اینستاگرام برقرار نشده است</p>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "باز کردن نوار کناری" : "جمع کردن نوار کناری"}
          >
            {collapsed ? <PanelRightOpen /> : <PanelRightClose />}
            <span className="nav-text">جمع کردن منو</span>
          </Button>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            onClick={() => setMobile(true)}
            aria-label="باز کردن منو"
          >
            <Menu />
          </Button>
          <form
            className="global-search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/search" });
            }}
          >
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جست‌وجوی حساب، محتوا یا کلمه کلیدی..."
              aria-label="جست‌وجوی سراسری"
            />
            <span className="shortcut">جست‌وجو ↵</span>
          </form>
          <div className="user-tools">
            <span className="demo-badge hidden sm:inline-flex">داده‌های نمایشی</span>
            <Button asChild variant="ghost" size="icon" title="اعلان‌ها" className="relative">
              <Link to="/alerts">
                <Bell size={19} />
                <span className="absolute top-1 right-2 h-1.5 w-1.5 bg-destructive rounded-full" />
              </Link>
            </Button>
            <Link to="/settings" className="user-info text-foreground no-underline">
              <span className="avatar">ا ر</span>
              <div className="user-name">
                آرمان رضایی<small>مدیر سامانه · نمایشی</small>
              </div>
              <ChevronDown size={13} className="text-muted-foreground hidden sm:block" />
            </Link>
          </div>
        </header>
        <main className="main">
          {children}
          <footer className="footer">
            <span>دیدبان · پایش هوشمند، دیدی روشن‌تر</span>
            <span>نسخه نمایشی · اطلاعات به اینستاگرام متصل نیستند</span>
          </footer>
        </main>
      </div>
      {addOpen && (
        <div className="modal-overlay" onClick={() => setAddOpen(false)}>
          <form className="modal" onSubmit={add} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2>افزودن حساب جدید</h2>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                title="بستن"
                onClick={() => setAddOpen(false)}
              >
                <X />
              </Button>
            </div>
            <p className="demo-badge mt-3">حساب فقط در این پیش‌نمایش اضافه می‌شود</p>
            <label htmlFor="username">نام کاربری اینستاگرام</label>
            <input
              id="username"
              className="field"
              dir="ltr"
              placeholder="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="account-name">نام نمایشی</label>
            <input
              id="account-name"
              className="field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام حساب"
            />
            <label htmlFor="group">گروه حساب</label>
            <select
              id="group"
              className="field"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              {["خبری", "اقتصادی", "فرهنگی", "گردشگری", "سیاسی", "سایر"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
            {error && <p className="negative mt-3">{error}</p>}
            <div className="modal-actions">
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                انصراف
              </Button>
              <Button type="submit">
                <Plus />
                افزودن حساب
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
