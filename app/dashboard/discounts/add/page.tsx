"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── SVG Icons ───────────────────────────────────────────────────
const Icons = {
  back: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  percent: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
    </svg>
  ),
  rupee: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  ),
  shipping: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  gift: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
    </svg>
  ),
  refresh: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
    </svg>
  ),
  info: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  check: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  spinner: (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
    </svg>
  ),
  tag: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  users: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  calendar: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
};

// ─── Types ────────────────────────────────────────────────────────
type DiscountType = "percentage" | "fixed" | "free_shipping" | "buy_x_get_y";
type AppliesTo = "all" | "specific_products" | "specific_categories";
type CustomerEligibility = "all" | "specific" | "new_customers";

const DISCOUNT_TYPES: { type: DiscountType; label: string; desc: string; icon: React.ReactNode; color: string; activeBorder: string; activeBg: string }[] = [
  { type: "percentage", label: "Percentage", desc: "e.g. 10% off", icon: Icons.percent, color: "text-[#008060]", activeBorder: "border-[#008060]", activeBg: "bg-[#F2F7F5]" },
  { type: "fixed", label: "Fixed Amount", desc: "e.g. ₹200 off", icon: Icons.rupee, color: "text-[#2C6ECB]", activeBorder: "border-[#2C6ECB]", activeBg: "bg-[#EBF2FF]" },
  { type: "free_shipping", label: "Free Shipping", desc: "Remove shipping fee", icon: Icons.shipping, color: "text-purple-600", activeBorder: "border-purple-500", activeBg: "bg-purple-50" },
  { type: "buy_x_get_y", label: "Buy X Get Y", desc: "Buy 2 get 1 free", icon: Icons.gift, color: "text-[#916A00]", activeBorder: "border-[#FFC453]", activeBg: "bg-[#FFF8E7]" },
];

function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function AddDiscountPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form state
  const [form, setForm] = useState({
    code: "",
    type: "percentage" as DiscountType,
    value: "",
    buyQuantity: "2",
    getQuantity: "1",
    minOrderAmount: "",
    minQuantity: "",
    maxUses: "",
    maxUsesPerCustomer: "1",
    startsAt: "",
    expiresAt: "",
    hasEndDate: false,
    description: "",
    isActive: true,
    appliesTo: "all" as AppliesTo,
    customerEligibility: "all" as CustomerEligibility,
    combineWithOther: false,
  });

  const update = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const selectedType = DISCOUNT_TYPES.find((t) => t.type === form.type)!;

  // Preview
  const previewValue = () => {
    if (form.type === "percentage") return form.value ? `${form.value}% off` : "—";
    if (form.type === "fixed") return form.value ? `₹${form.value} off` : "—";
    if (form.type === "free_shipping") return "Free shipping";
    return `Buy ${form.buyQuantity} get ${form.getQuantity} free`;
  };

  const handleSave = async (active: boolean) => {
    if (!form.code) return;
    setSaving(true);
    update("isActive", active);
    await new Promise((r) => setTimeout(r, 1500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => router.push("/dashboard/discounts"), 800);
  };

  return (
    <div className="max-w-250 mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/discounts"
            className="w-8 h-8 flex items-center justify-center border border-[#E1E3E5] rounded-lg text-[#6D7175] hover:text-[#202223] hover:bg-white no-underline transition-all bg-white"
          >
            {Icons.back}
          </Link>
          <div>
            <h1 className="font-sora text-[20px] font-semibold text-[#202223]">Create Discount</h1>
            <p className="text-[12.5px] text-[#6D7175] mt-0.5">Set up a new discount code for your store</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={saving || !form.code}
            className="px-4 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            Save as Inactive
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving || !form.code}
            className="px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer border-none flex items-center gap-2"
          >
            {saving ? Icons.spinner : saved ? Icons.check : null}
            {saving ? "Saving..." : saved ? "Saved!" : "Save & Activate"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
        {/* Left */}
        <div className="space-y-5">
          {/* Discount Type */}
          <div className="bg-white border border-[#E1E3E5] rounded-xl p-6">
            <h2 className="font-sora text-[15px] font-semibold text-[#202223] mb-4">Discount Type</h2>
            <div className="grid grid-cols-2 gap-3">
              {DISCOUNT_TYPES.map((t) => (
                <button
                  key={t.type}
                  onClick={() => update("type", t.type)}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl text-left transition-all cursor-pointer ${
                    form.type === t.type
                      ? `${t.activeBorder} ${t.activeBg}`
                      : "border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] hover:border-[#8C9196]"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    form.type === t.type ? `${t.activeBg} ${t.color}` : "bg-[#F6F6F7] text-[#6D7175]"
                  }`}>
                    {t.icon}
                  </div>
                  <div>
                    <p className={`text-[13px] font-semibold ${form.type === t.type ? t.color : "text-[#202223]"}`}>
                      {t.label}
                    </p>
                    <p className="text-[11.5px] text-[#8C9196] mt-0.5">{t.desc}</p>
                  </div>
                  {form.type === t.type && (
                    <div className={`ml-auto w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${t.color.replace("text-", "bg-").replace("[#", "[#").replace("]", "]/20")} `}>
                      <span className={t.color}>{Icons.check}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Code & Value */}
          <div className="bg-white border border-[#E1E3E5] rounded-xl p-6 space-y-5">
            <h2 className="font-sora text-[15px] font-semibold text-[#202223]">Discount Details</h2>

            {/* Code */}
            <div>
              <label className="block text-[12.5px] font-medium text-[#202223] mb-1.5">
                Discount Code <span className="text-[#D82C0D]">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => update("code", e.target.value.toUpperCase())}
                  placeholder="e.g. APEX10"
                  className="flex-1 px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all font-mono tracking-widest uppercase"
                />
                <button
                  onClick={() => update("code", generateCode())}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[12.5px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  {Icons.refresh} Generate
                </button>
              </div>
              <p className="text-[11.5px] text-[#6D7175] mt-1.5 flex items-center gap-1">
                {Icons.info} Customers will enter this code at checkout
              </p>
            </div>

            {/* Value fields */}
            {(form.type === "percentage" || form.type === "fixed") && (
              <div>
                <label className="block text-[12.5px] font-medium text-[#202223] mb-1.5">
                  {form.type === "percentage" ? "Percentage Off" : "Fixed Amount Off"}{" "}
                  <span className="text-[#D82C0D]">*</span>
                </label>
                <div className="relative max-w-50">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D7175] text-[13px] font-medium">
                    {form.type === "percentage" ? "%" : "₹"}
                  </span>
                  <input
                    type="number"
                    value={form.value}
                    onChange={(e) => update("value", e.target.value)}
                    placeholder={form.type === "percentage" ? "10" : "200"}
                    min="0"
                    max={form.type === "percentage" ? "100" : undefined}
                    className="w-full pl-8 pr-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Buy X Get Y */}
            {form.type === "buy_x_get_y" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12.5px] font-medium text-[#202223] mb-1.5">Customer Buys (Qty)</label>
                  <input
                    type="number"
                    value={form.buyQuantity}
                    onChange={(e) => update("buyQuantity", e.target.value)}
                    min="1"
                    className="w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-[#202223] mb-1.5">Customer Gets (Qty Free)</label>
                  <input
                    type="number"
                    value={form.getQuantity}
                    onChange={(e) => update("getQuantity", e.target.value)}
                    min="1"
                    className="w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-[12.5px] font-medium text-[#202223] mb-1.5">
                Internal Description
                <span className="ml-1 text-[11px] text-[#8C9196] font-normal">(for your reference)</span>
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="e.g. Summer sale for football products"
                className="w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
              />
            </div>
          </div>

          {/* Minimum Requirements */}
          <div className="bg-white border border-[#E1E3E5] rounded-xl p-6 space-y-4">
            <h2 className="font-sora text-[15px] font-semibold text-[#202223]">Minimum Requirements</h2>
            <div className="space-y-3">
              {[
                { id: "none", label: "No minimum requirements" },
                { id: "amount", label: "Minimum purchase amount (₹)" },
                { id: "quantity", label: "Minimum quantity of items" },
              ].map((opt) => (
                <label key={opt.id} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="minReq"
                    checked={
                      opt.id === "none"
                        ? !form.minOrderAmount && !form.minQuantity
                        : opt.id === "amount"
                        ? !!form.minOrderAmount
                        : !!form.minQuantity
                    }
                    onChange={() => {
                      if (opt.id === "none") {
                        update("minOrderAmount", "");
                        update("minQuantity", "");
                      } else if (opt.id === "amount") {
                        update("minQuantity", "");
                        update("minOrderAmount", "999");
                      } else {
                        update("minOrderAmount", "");
                        update("minQuantity", "2");
                      }
                    }}
                    className="mt-0.5 accent-[#008060] w-4 h-4 shrink-0"
                  />
                  <div className="flex-1">
                    <span className="text-[13px] text-[#202223]">{opt.label}</span>
                    {opt.id === "amount" && form.minOrderAmount && (
                      <div className="mt-2">
                        <div className="relative max-w-45">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D7175] text-[13px]">₹</span>
                          <input
                            type="number"
                            value={form.minOrderAmount}
                            onChange={(e) => update("minOrderAmount", e.target.value)}
                            min="0"
                            className="w-full pl-8 pr-3.5 py-2 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
                          />
                        </div>
                      </div>
                    )}
                    {opt.id === "quantity" && form.minQuantity && (
                      <div className="mt-2">
                        <input
                          type="number"
                          value={form.minQuantity}
                          onChange={(e) => update("minQuantity", e.target.value)}
                          min="1"
                          className="max-w-45 w-full px-3.5 py-2 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
                        />
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Customer Eligibility */}
          <div className="bg-white border border-[#E1E3E5] rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-[#6D7175]">{Icons.users}</div>
              <h2 className="font-sora text-[15px] font-semibold text-[#202223]">Customer Eligibility</h2>
            </div>
            <div className="space-y-2">
              {[
                { value: "all", label: "All customers" },
                { value: "new_customers", label: "New customers only (first order)" },
                { value: "specific", label: "Specific customers" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-3 cursor-pointer p-3 border border-[#E1E3E5] rounded-lg hover:bg-[#F6F6F7] transition-colors">
                  <input
                    type="radio"
                    name="eligibility"
                    value={opt.value}
                    checked={form.customerEligibility === opt.value}
                    onChange={() => update("customerEligibility", opt.value)}
                    className="accent-[#008060] w-4 h-4 shrink-0"
                  />
                  <span className="text-[13px] text-[#202223]">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Usage Limits */}
          <div className="bg-white border border-[#E1E3E5] rounded-xl p-6 space-y-4">
            <h2 className="font-sora text-[15px] font-semibold text-[#202223]">Usage Limits</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12.5px] font-medium text-[#202223] mb-1.5">
                  Total Usage Limit
                  <span className="ml-1 text-[11px] text-[#8C9196] font-normal">(blank = unlimited)</span>
                </label>
                <input
                  type="number"
                  value={form.maxUses}
                  onChange={(e) => update("maxUses", e.target.value)}
                  placeholder="Unlimited"
                  min="1"
                  className="w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12.5px] font-medium text-[#202223] mb-1.5">Uses Per Customer</label>
                <input
                  type="number"
                  value={form.maxUsesPerCustomer}
                  onChange={(e) => update("maxUsesPerCustomer", e.target.value)}
                  min="1"
                  className="w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
                />
              </div>
            </div>

            {/* Combine */}
            <div className="flex items-center justify-between p-3 border border-[#E1E3E5] rounded-lg">
              <div>
                <p className="text-[13px] font-medium text-[#202223]">Combine with other discounts</p>
                <p className="text-[11.5px] text-[#6D7175]">Allow stacking with other active discount codes</p>
              </div>
              <button
                onClick={() => update("combineWithOther", !form.combineWithOther)}
                className={`relative w-10 h-6 rounded-full transition-colors border-none cursor-pointer ${form.combineWithOther ? "bg-[#008060]" : "bg-[#8C9196]"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.combineWithOther ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>

          {/* Active Dates */}
          <div className="bg-white border border-[#E1E3E5] rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-[#6D7175]">{Icons.calendar}</div>
              <h2 className="font-sora text-[15px] font-semibold text-[#202223]">Active Dates</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12.5px] font-medium text-[#202223] mb-1.5">Start Date</label>
                <input
                  type="date"
                  value={form.startsAt}
                  onChange={(e) => update("startsAt", e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-[12.5px] font-medium text-[#202223] mb-1.5">Start Time</label>
                <input
                  type="time"
                  defaultValue="00:00"
                  className="w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasEndDate"
                checked={form.hasEndDate}
                onChange={(e) => update("hasEndDate", e.target.checked)}
                className="w-4 h-4 rounded accent-[#008060] cursor-pointer"
              />
              <label htmlFor="hasEndDate" className="text-[13px] text-[#202223] cursor-pointer">
                Set end date
              </label>
            </div>

            {form.hasEndDate && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12.5px] font-medium text-[#202223] mb-1.5">End Date</label>
                  <input
                    type="date"
                    value={form.expiresAt}
                    onChange={(e) => update("expiresAt", e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-[#202223] mb-1.5">End Time</label>
                  <input
                    type="time"
                    defaultValue="23:59"
                    className="w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-white border border-[#E1E3E5] rounded-xl p-5">
            <h3 className="font-sora text-[14px] font-semibold text-[#202223] mb-4">Status</h3>
            <div className="space-y-2">
              {[
                { value: true, label: "Active", desc: "Customers can use this code" },
                { value: false, label: "Inactive", desc: "Code will not work at checkout" },
              ].map((opt) => (
                <label key={String(opt.value)} className="flex items-start gap-3 p-3 border border-[#E1E3E5] rounded-lg cursor-pointer hover:bg-[#F6F6F7] transition-colors">
                  <input
                    type="radio"
                    name="status"
                    checked={form.isActive === opt.value}
                    onChange={() => update("isActive", opt.value)}
                    className="mt-0.5 accent-[#008060] w-4 h-4 shrink-0"
                  />
                  <div>
                    <p className="text-[13px] font-medium text-[#202223]">{opt.label}</p>
                    <p className="text-[11.5px] text-[#6D7175]">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Summary / Preview */}
          <div className="bg-white border border-[#E1E3E5] rounded-xl p-5">
            <h3 className="font-sora text-[14px] font-semibold text-[#202223] mb-4">Summary</h3>
            <div className="space-y-3">
              {[
                { label: "Code", value: form.code || "—", mono: true },
                { label: "Type", value: selectedType.label },
                { label: "Value", value: previewValue() },
                { label: "Min Order", value: form.minOrderAmount ? `₹${form.minOrderAmount}` : "None" },
                { label: "Max Uses", value: form.maxUses || "Unlimited" },
                { label: "Per Customer", value: form.maxUsesPerCustomer },
                { label: "Eligibility", value: form.customerEligibility === "all" ? "All customers" : form.customerEligibility === "new_customers" ? "New only" : "Specific" },
                { label: "Status", value: form.isActive ? "Active" : "Inactive" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[12px] text-[#6D7175]">{item.label}</span>
                  <span className={`text-[12.5px] font-medium text-[#202223] text-right max-w-35 truncate ${item.mono ? "font-mono tracking-wider" : ""}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white border border-[#E1E3E5] rounded-xl p-5">
            <h3 className="font-sora text-[14px] font-semibold text-[#202223] mb-4">Checklist</h3>
            <div className="space-y-2.5">
              {[
                { label: "Discount code", done: !!form.code },
                { label: "Discount value", done: form.type === "free_shipping" || form.type === "buy_x_get_y" || !!form.value },
                { label: "Start date set", done: !!form.startsAt },
                { label: "Customer eligibility", done: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.done ? "bg-[#008060]" : "bg-[#E1E3E5]"}`}>
                    {item.done && <span className="text-white">{Icons.check}</span>}
                  </div>
                  <span className={`text-[12.5px] ${item.done ? "text-[#202223]" : "text-[#8C9196]"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={() => handleSave(true)}
              disabled={saving || !form.code}
              className="w-full py-2.5 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer border-none flex items-center justify-center gap-2"
            >
              {saving ? Icons.spinner : null}
              {saving ? "Saving..." : "Save & Activate"}
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={saving || !form.code}
              className="w-full py-2.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
            >
              Save as Inactive
            </button>
            <Link
              href="/dashboard/discounts"
              className="block text-center py-2.5 text-[13px] text-[#6D7175] hover:text-[#202223] no-underline transition-colors"
            >
              Discard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}