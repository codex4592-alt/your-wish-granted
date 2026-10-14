import { Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";
import {
  ArrowUpLeft,
  ArrowDownLeft,
  Users,
  Image,
  Layers,
  Activity,
  TriangleAlert,
  Heart,
  MessageCircle,
  Check,
  ChevronLeft,
  MoreHorizontal,
  Bell,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "./store";
import { fa, growthData, contentTypes, posts, type Account } from "./data";
export function Avatar({ account }: { account: Account }) {
  return account.image ? (
    <img className="avatar" src={account.image} alt={account.name} width={34} height={34} />
  ) : (
    <span className="avatar">{account.initials}</span>
  );
}
export function Stats() {
  const { accounts, alerts } = useDemo();
  const values = [
    {
      label: "حساب‌های تحت پایش",
      value: accounts.length,
      change: "+۲",
      note: "حساب در این هفته",
      icon: Users,
      color: "",
    },
    {
      label: "کل پست‌های ثبت‌شده",
      value: 1284,
      change: "+۱۲.۵٪",
      note: "نسبت به هفته قبل",
      icon: Image,
      color: "",
    },
    {
      label: "کل استوری‌های ثبت‌شده",
      value: 3562,
      change: "+۸.۲٪",
      note: "نسبت به هفته قبل",
      icon: Layers,
      color: "",
    },
    {
      label: "پست‌های جدید امروز",
      value: 47,
      change: "+۱۸٪",
      note: "نسبت به روز قبل",
      icon: Activity,
      color: "",
    },
    {
      label: "فعالیت‌های غیرعادی",
      value: alerts.filter((a) => a.type !== "info" && !a.read).length,
      change: "نیاز به بررسی",
      note: "در ۲۴ ساعت گذشته",
      icon: TriangleAlert,
      color: "warning",
    },
  ];
  return (
    <div className="stats">
      {values.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat-top">
            <span>{s.label}</span>
            <span className={`stat-icon ${s.color}`}>
              <s.icon />
            </span>
          </div>
          <div className="stat-number">{fa(s.value)}</div>
          <div className="stat-foot">
            <span className={s.color || "positive"}>
              {!s.color && <ArrowUpLeft size={11} className="inline" />} {s.change}
            </span>
            <span>{s.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
export function GrowthChart({ selectedPeriod }: { selectedPeriod?: string }) {
  const [period, setPeriod] = useState("ماهانه");
  useEffect(() => {
    if (selectedPeriod)
      setPeriod(
        selectedPeriod === "week" ? "هفتگی" : selectedPeriod === "day" ? "روزانه" : "ماهانه",
      );
  }, [selectedPeriod]);
  const [comparison, setComparison] = useState("all");
  const [from, setFrom] = useState("2026-10-01");
  const [to, setTo] = useState("2026-10-14");
  const slice =
    period === "روزانه"
      ? growthData.slice(-4)
      : period === "هفتگی"
        ? growthData.slice(-7)
        : period === "دلخواه"
          ? growthData.filter(
              (_, i) => i >= Number(from.slice(-2)) - 1 && i <= Number(to.slice(-2)) - 1,
            )
          : growthData;
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>روند رشد دنبال‌کنندگان</h2>
          <p>مقایسه تغییرات دنبال‌کنندگان حساب‌ها</p>
        </div>
        <div className="segments">
          {["روزانه", "هفتگی", "ماهانه", "دلخواه"].map((p) => (
            <Button key={p} variant="ghost" data-active={period === p} onClick={() => setPeriod(p)}>
              {p}
            </Button>
          ))}
        </div>
      </div>
      <div className="panel-body">
        <div className="flex items-center gap-2">
          <select
            aria-label="حساب‌های نمودار"
            className="select-control"
            value={comparison}
            onChange={(e) => setComparison(e.target.value)}
          >
            <option value="all">مقایسه همه حساب‌ها</option>
            <option value="tehran">تهران دیلی</option>
            <option value="cafe">کافه تهرون</option>
            <option value="nature">طبیعت ایران</option>
          </select>
          <span className="text-[10px] text-muted-foreground mr-auto">واحد: هزار نفر</span>
        </div>
        {period === "دلخواه" && (
          <div className="flex gap-2 mt-2">
            <input
              aria-label="از تاریخ"
              type="date"
              className="field"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <input
              aria-label="تا تاریخ"
              type="date"
              className="field"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        )}
        <div className="growth-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={slice} margin={{ top: 15, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="growthBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 4" />
              <XAxis
                dataKey="day"
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                interval={2}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                domain={[50, 250]}
                tickFormatter={(n) => fa(n) + "k"}
              />
              <Tooltip
                formatter={(v: number, name: string) => [fa(Math.round(v * 1000)), name]}
                contentStyle={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: 6,
                  fontSize: 11,
                  color: "var(--foreground)",
                  direction: "rtl",
                }}
              />
              {(comparison === "all" || comparison === "nature") && (
                <Area
                  isAnimationActive={false}
                  name="طبیعت ایران"
                  type="monotone"
                  dataKey="nature"
                  stroke="var(--success)"
                  strokeWidth={2.5}
                  fill="transparent"
                />
              )}
              {(comparison === "all" || comparison === "tehran") && (
                <Area
                  isAnimationActive={false}
                  name="تهران دیلی"
                  type="monotone"
                  dataKey="tehran"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#growthBlue)"
                />
              )}
              {(comparison === "all" || comparison === "cafe") && (
                <Area
                  isAnimationActive={false}
                  name="کافه تهرون"
                  type="monotone"
                  dataKey="cafe"
                  stroke="var(--violet)"
                  strokeWidth={2.5}
                  fill="transparent"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-legend">
          <span>
            <i className="legend-dot" />
            تهران دیلی
          </span>
          <span>
            <i className="legend-dot green" />
            طبیعت ایران
          </span>
          <span>
            <i className="legend-dot violet" />
            کافه تهرون
          </span>
        </div>
      </div>
    </section>
  );
}
export function ContentChart() {
  const { setContentFilter } = useDemo();
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>توزیع انواع محتوا</h2>
          <p>محتواهای منتشرشده در ۳۰ روز گذشته</p>
        </div>
        <Image size={17} className="text-muted-foreground" />
      </div>
      <div className="panel-body">
        <div className="donut-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                isAnimationActive={false}
                data={contentTypes}
                innerRadius={55}
                outerRadius={72}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                cornerRadius={3}
                onClick={(d) => setContentFilter(d.type)}
              >
                {contentTypes.map((c) => (
                  <Cell key={c.type} fill={c.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => [fa(v) + "٪", "سهم محتوا"]}
                contentStyle={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  fontSize: 11,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">
            <strong>۴٬۸۴۶</strong>
            <span>کل محتوا</span>
          </div>
        </div>
        <div className="content-legend">
          {contentTypes.map((c, i) => (
            <Link key={c.type} to="/content" onClick={() => setContentFilter(c.type)}>
              <i className={`legend-dot ${["", "violet", "green", "orange"][i]}`} />
              {c.name}
              <strong>{fa(c.value)}٪</strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function AccountTable({
  limit,
  group = "all",
  status = "all",
  sort = "followers",
}: {
  limit?: number;
  group?: string;
  status?: string;
  sort?: string;
}) {
  const { accounts, search, setAccounts } = useDemo();
  const rows = accounts
    .filter(
      (a) =>
        (group === "all" || a.group === group) &&
        (status === "all" || a.status === status) &&
        (a.user + " " + a.name).toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "growth"
        ? b.growth - a.growth
        : sort === "activity"
          ? b.posts - a.posts
          : b.followers - a.followers,
    )
    .slice(0, limit);
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>حساب اینستاگرام</th>
            <th>گروه</th>
            <th>دنبال‌کنندگان</th>
            <th>تغییرات</th>
            <th>آخرین فعالیت</th>
            <th>وضعیت پایش</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => (
            <tr key={a.id}>
              <td>
                <div className="account-cell">
                  <Avatar account={a} />
                  <div>
                    <Link to="/accounts/$id" params={{ id: a.id }}>
                      <bdi>@{a.user}</bdi>
                    </Link>
                    <small>{a.name}</small>
                  </div>
                </div>
              </td>
              <td>{a.group}</td>
              <td>{fa(a.followers)}</td>
              <td className={a.growth < 0 ? "negative" : "positive"}>
                <span dir="ltr">
                  {a.growth < 0 ? (
                    <ArrowDownLeft size={12} className="inline" />
                  ) : (
                    <ArrowUpLeft size={12} className="inline" />
                  )}{" "}
                  {a.growth > 0 ? "+" : ""}
                  {fa(a.growth)}٪
                </span>
              </td>
              <td className="text-muted-foreground">
                {a.status === "paused" ? "۲ ساعت پیش" : "۱۲ دقیقه پیش"}
              </td>
              <td>
                <Button
                  variant="ghost"
                  className="h-auto p-0"
                  title="تغییر وضعیت پایش"
                  onClick={() =>
                    setAccounts((prev) =>
                      prev.map((x) =>
                        x.id === a.id
                          ? { ...x, status: x.status === "active" ? "paused" : "active" }
                          : x,
                      ),
                    )
                  }
                >
                  <span
                    className={`status-pill ${a.status === "paused" ? "paused" : a.status === "error" ? "error" : ""}`}
                  >
                    <span className="status-dot" />
                    {a.status === "active"
                      ? "فعال"
                      : a.status === "paused"
                        ? "متوقف"
                        : "خطای دریافت"}
                  </span>
                </Button>
              </td>
              <td>
                <Button asChild variant="ghost" size="icon" title="جزئیات حساب">
                  <Link to="/accounts/$id" params={{ id: a.id }}>
                    <MoreHorizontal size={17} />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="empty">حسابی با این مشخصات پیدا نشد.</div>}
    </div>
  );
}
export function PostsGrid({
  accountId,
  view = "grid",
  accountFilter = "all",
}: {
  accountId?: string;
  view?: string;
  accountFilter?: string;
}) {
  const { accounts, search, contentFilter } = useDemo();
  const filtered = posts.filter(
    (p) =>
      (!accountId || p.account === accountId) &&
      (accountFilter === "all" || p.account === accountFilter) &&
      (contentFilter === "all" || p.type === contentFilter) &&
      (p.caption + " " + accounts.find((a) => a.id === p.account)?.user)
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const [selected, setSelected] = useState<(typeof posts)[number] | null>(null);
  return (
    <>
      {filtered.length === 0 ? (
        <div className="empty">محتوایی با این فیلترها پیدا نشد.</div>
      ) : view === "table" ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>محتوا</th>
                <th>حساب</th>
                <th>نوع</th>
                <th>زمان انتشار</th>
                <th>لایک</th>
                <th>دیدگاه</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Button variant="link" onClick={() => setSelected(p)}>
                      {p.caption.slice(0, 35)}…
                    </Button>
                  </td>
                  <td>
                    <bdi>{accounts.find((a) => a.id === p.account)?.user}</bdi>
                  </td>
                  <td>{p.label}</td>
                  <td>{p.time}</td>
                  <td>{fa(p.likes)}</td>
                  <td>{fa(p.comments)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="content-grid">
          {filtered.map((p) => {
            const a = accounts.find((a) => a.id === p.account);
            if (!a) return null;
            return (
              <article className="post-card" key={p.id}>
                <div className="post-image">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto w-full block rounded-none"
                    onClick={() => setSelected(p)}
                    aria-label={"مشاهده محتوای " + a.name}
                  >
                    <img loading="lazy" src={p.image} alt={p.caption} width={1024} height={768} />
                  </Button>
                  <span className="post-type">{p.label}</span>
                  {p.fresh && <span className="new">جدید</span>}
                </div>
                <div className="post-info">
                  <div className="account-cell">
                    <Avatar account={a} />
                    <bdi>@{a.user}</bdi>
                    <span className="mr-auto text-muted-foreground">{p.time}</span>
                  </div>
                  <p>{p.caption.split(" #")[0]}</p>
                  <div className="post-meta">
                    <span>
                      <Heart size={12} />
                      {fa(p.likes)}
                    </span>
                    <span>
                      <MessageCircle size={12} />
                      {fa(p.comments)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={selected.image}
              alt={selected.caption}
              className="w-full rounded-md"
              width={1024}
              height={768}
            />
            <p className="mt-4 leading-8">{selected.caption}</p>
            <p className="mt-2 text-muted-foreground">
              {selected.time} · {fa(selected.likes)} لایک · {fa(selected.comments)} دیدگاه
            </p>
            <p className="demo-badge mt-4">محتوای نمایشی · لینک واقعی متصل نیست</p>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setSelected(null)}>
                بستن
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export function AlertsList({
  full = false,
  accountId,
  type = "all",
}: {
  full?: boolean;
  accountId?: string | undefined;
  type?: string;
}) {
  const { alerts, setAlerts, accounts } = useDemo();
  const filtered = alerts.filter(
    (a) => (!accountId || a.account === accountId) && (type === "all" || a.type === type),
  );
  return (
    <>
      {filtered.map((a) => (
        <div className="alert-row" key={a.id}>
          <div className={`alert-icon ${a.type}`}>
            {a.type === "info" ? (
              <Bell size={16} />
            ) : a.type === "danger" ? (
              <RefreshCw size={16} />
            ) : (
              <TriangleAlert size={16} />
            )}
          </div>
          <div>
            <h3>
              {a.title} {a.read && <Check size={13} className="inline text-success" />}
            </h3>
            <p>{a.description}</p>
            {full && (
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setAlerts((prev) =>
                      prev.map((x) => (x.id === a.id ? { ...x, read: !x.read } : x)),
                    )
                  }
                >
                  {a.read ? "بررسی‌نشده" : "علامت‌گذاری بررسی‌شده"}
                </Button>
                <Button variant="link" size="sm" asChild>
                  <Link to="/accounts/$id" params={{ id: a.account }}>
                    جزئیات {accounts.find((x) => x.id === a.account)?.name}
                    <ChevronLeft size={12} />
                  </Link>
                </Button>
              </div>
            )}
          </div>
          <time>{a.time}</time>
        </div>
      ))}
      {filtered.length === 0 && <div className="empty">هشداری یافت نشد.</div>}
    </>
  );
}
