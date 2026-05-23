'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SPORTS = [
  'Football',
  'Cricket',
  'Basketball',
  'Tennis',
  'Swimming',
  'Running',
  'Cycling',
  'Boxing',
]
const BRANDS = [
  'Nike',
  'Adidas',
  'MRF',
  'SS',
  'Wilson',
  'Spalding',
  'Speedo',
  'Giro',
  'Everlast',
  'Puma',
  'Reebok',
]
const CATEGORIES = [
  'Footwear',
  'Apparel',
  'Equipment',
  'Accessories',
  'Protection Gear',
  'Training Gear',
]

interface Variant {
  id: string
  size: string
  color: string
  sku: string
  price: string
  stock: string
}

export default function AddProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'active' | 'draft'>('draft')
  const [activeTab, setActiveTab] = useState('general')

  // Form state
  const [form, setForm] = useState({
    name: '',
    description: '',
    brand: '',
    sport: '',
    category: '',
    sku: '',
    barcode: '',
    price: '',
    comparePrice: '',
    costPrice: '',
    taxable: true,
    trackInventory: true,
    stock: '',
    lowStockAlert: '5',
    weight: '',
    tags: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
  })

  const [variants, setVariants] = useState<Variant[]>([
    { id: '1', size: '', color: '', sku: '', price: '', stock: '' },
  ])
  const [images, setImages] = useState<string[]>([])
  const [dragOver, setDragOver] = useState(false)

  const updateForm = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        size: '',
        color: '',
        sku: '',
        price: '',
        stock: '',
      },
    ])
  }

  const removeVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id))
  }

  const updateVariant = (id: string, key: keyof Variant, value: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [key]: value } : v)),
    )
  }

  const handleSave = async (saveStatus: 'active' | 'draft') => {
    setSaving(true)
    setStatus(saveStatus)
    await new Promise((r) => setTimeout(r, 1500))
    setSaving(false)
    router.push('/dashboard/products')
  }

  const profit =
    form.price && form.costPrice
      ? (parseFloat(form.price) - parseFloat(form.costPrice)).toFixed(0)
      : null
  const margin =
    form.price && form.costPrice
      ? (
          ((parseFloat(form.price) - parseFloat(form.costPrice)) /
            parseFloat(form.price)) *
          100
        ).toFixed(1)
      : null

  const TABS = [
    { id: 'general', label: 'General' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'variants', label: 'Variants' },
    { id: 'seo', label: 'SEO' },
  ]

  return (
    <div className='max-w-275 mx-auto space-y-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link
            href='/dashboard/products'
            className='w-8 h-8 flex items-center justify-center border border-[#E1E3E5] rounded-lg text-[#6D7175] hover:text-[#202223] hover:bg-white no-underline transition-all bg-white'
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <polyline points='15 18 9 12 15 6' />
            </svg>
          </Link>
          <div>
            <h1 className='font-sora text-[20px] font-semibold text-[#202223]'>
              Add Product
            </h1>
            <p className='text-[12.5px] text-[#6D7175] mt-0.5'>
              Fill in the details to add a new product
            </p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className='px-4 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors disabled:opacity-50 cursor-pointer'
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSave('active')}
            disabled={saving}
            className='px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2'
          >
            {saving ? (
              <>
                <svg
                  className='animate-spin w-3.5 h-3.5'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8v8H4z'
                  />
                </svg>
                Saving...
              </>
            ) : (
              'Save & Publish'
            )}
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5'>
        {/* Left column */}
        <div className='space-y-5'>
          {/* Tabs */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
            <div className='flex border-b border-[#E1E3E5] overflow-x-auto scrollbar-none'>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-b-[#008060] text-[#008060]'
                      : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className='p-6'>
              {/* ── GENERAL TAB ── */}
              {activeTab === 'general' && (
                <div className='space-y-5'>
                  {/* Name */}
                  <div>
                    <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                      Product Name <span className='text-[#D82C0D]'>*</span>
                    </label>
                    <input
                      type='text'
                      value={form.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder='e.g. Pro Strike Football Boots'
                      className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        updateForm('description', e.target.value)
                      }
                      placeholder='Describe your product in detail...'
                      rows={5}
                      className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all resize-none'
                    />
                  </div>

                  {/* Brand + Sport */}
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                        Brand
                      </label>
                      <select
                        value={form.brand}
                        onChange={(e) => updateForm('brand', e.target.value)}
                        className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all bg-white cursor-pointer'
                      >
                        <option value=''>Select brand</option>
                        {BRANDS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                        Sport
                      </label>
                      <select
                        value={form.sport}
                        onChange={(e) => updateForm('sport', e.target.value)}
                        className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all bg-white cursor-pointer'
                      >
                        <option value=''>Select sport</option>
                        {SPORTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => updateForm('category', e.target.value)}
                      className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all bg-white cursor-pointer'
                    >
                      <option value=''>Select category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* SKU + Barcode */}
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                        SKU
                      </label>
                      <input
                        type='text'
                        value={form.sku}
                        onChange={(e) => updateForm('sku', e.target.value)}
                        placeholder='e.g. FB-001'
                        className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                      />
                    </div>
                    <div>
                      <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                        Barcode
                      </label>
                      <input
                        type='text'
                        value={form.barcode}
                        onChange={(e) => updateForm('barcode', e.target.value)}
                        placeholder='ISBN, UPC, GTIN etc.'
                        className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                      Tags
                      <span className='ml-1 text-[11px] text-[#8C9196] font-normal'>
                        (comma separated)
                      </span>
                    </label>
                    <input
                      type='text'
                      value={form.tags}
                      onChange={(e) => updateForm('tags', e.target.value)}
                      placeholder='e.g. football, boots, nike, men'
                      className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                    />
                    {form.tags && (
                      <div className='flex flex-wrap gap-1.5 mt-2'>
                        {form.tags
                          .split(',')
                          .map((tag) => tag.trim())
                          .filter(Boolean)
                          .map((tag) => (
                            <span
                              key={tag}
                              className='px-2.5 py-1 bg-[#F6F6F7] border border-[#E1E3E5] rounded-full text-[11.5px] text-[#6D7175]'
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── PRICING TAB ── */}
              {activeTab === 'pricing' && (
                <div className='space-y-5'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                        Price <span className='text-[#D82C0D]'>*</span>
                      </label>
                      <div className='relative'>
                        <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D7175] text-[13px]'>
                          ₹
                        </span>
                        <input
                          type='number'
                          value={form.price}
                          onChange={(e) => updateForm('price', e.target.value)}
                          placeholder='0.00'
                          className='w-full pl-8 pr-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                        />
                      </div>
                    </div>
                    <div>
                      <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                        Compare-at Price
                        <span className='ml-1 text-[11px] text-[#8C9196] font-normal'>
                          (original)
                        </span>
                      </label>
                      <div className='relative'>
                        <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D7175] text-[13px]'>
                          ₹
                        </span>
                        <input
                          type='number'
                          value={form.comparePrice}
                          onChange={(e) =>
                            updateForm('comparePrice', e.target.value)
                          }
                          placeholder='0.00'
                          className='w-full pl-8 pr-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                        Cost per Item
                        <span className='ml-1 text-[11px] text-[#8C9196] font-normal'>
                          (for margin calc)
                        </span>
                      </label>
                      <div className='relative'>
                        <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D7175] text-[13px]'>
                          ₹
                        </span>
                        <input
                          type='number'
                          value={form.costPrice}
                          onChange={(e) =>
                            updateForm('costPrice', e.target.value)
                          }
                          placeholder='0.00'
                          className='w-full pl-8 pr-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                        />
                      </div>
                    </div>
                    <div className='flex flex-col justify-end pb-0.5'>
                      {profit && margin ? (
                        <div className='p-3 bg-[#F2F7F5] border border-[#008060]/20 rounded-lg'>
                          <p className='text-[11.5px] text-[#6D7175]'>
                            Profit per item
                          </p>
                          <p className='text-[16px] font-bold text-[#008060]'>
                            ₹{profit}
                          </p>
                          <p className='text-[11.5px] text-[#6D7175] mt-0.5'>
                            Margin: {margin}%
                          </p>
                        </div>
                      ) : (
                        <div className='p-3 bg-[#F6F6F7] border border-[#E1E3E5] rounded-lg'>
                          <p className='text-[11.5px] text-[#8C9196]'>
                            Enter price & cost to see margin
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tax */}
                  <div className='flex items-center justify-between p-4 border border-[#E1E3E5] rounded-lg'>
                    <div>
                      <p className='text-[13px] font-medium text-[#202223]'>
                        Charge taxes on this product
                      </p>
                      <p className='text-[12px] text-[#6D7175] mt-0.5'>
                        GST (18%) will be applied at checkout
                      </p>
                    </div>
                    <button
                      onClick={() => updateForm('taxable', !form.taxable)}
                      className={`relative w-10 h-6 rounded-full transition-colors border-none cursor-pointer ${
                        form.taxable ? 'bg-[#008060]' : 'bg-[#8C9196]'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          form.taxable ? 'right-0.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

              {/* ── INVENTORY TAB ── */}
              {activeTab === 'inventory' && (
                <div className='space-y-5'>
                  <div className='flex items-center justify-between p-4 border border-[#E1E3E5] rounded-lg'>
                    <div>
                      <p className='text-[13px] font-medium text-[#202223]'>
                        Track inventory
                      </p>
                      <p className='text-[12px] text-[#6D7175] mt-0.5'>
                        Monitor stock levels for this product
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        updateForm('trackInventory', !form.trackInventory)
                      }
                      className={`relative w-10 h-6 rounded-full transition-colors border-none cursor-pointer ${
                        form.trackInventory ? 'bg-[#008060]' : 'bg-[#8C9196]'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          form.trackInventory
                            ? 'right-0.5'
                            : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {form.trackInventory && (
                    <>
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                            Stock Quantity
                          </label>
                          <input
                            type='number'
                            value={form.stock}
                            onChange={(e) =>
                              updateForm('stock', e.target.value)
                            }
                            placeholder='0'
                            className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                          />
                        </div>
                        <div>
                          <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                            Low Stock Alert
                          </label>
                          <input
                            type='number'
                            value={form.lowStockAlert}
                            onChange={(e) =>
                              updateForm('lowStockAlert', e.target.value)
                            }
                            placeholder='5'
                            className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                          />
                        </div>
                      </div>

                      <div>
                        <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                          Weight (grams)
                        </label>
                        <input
                          type='number'
                          value={form.weight}
                          onChange={(e) => updateForm('weight', e.target.value)}
                          placeholder='e.g. 500'
                          className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ── VARIANTS TAB ── */}
              {activeTab === 'variants' && (
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-[13px] font-medium text-[#202223]'>
                        Product Variants
                      </p>
                      <p className='text-[12px] text-[#6D7175] mt-0.5'>
                        Add different sizes, colors or options
                      </p>
                    </div>
                    <button
                      onClick={addVariant}
                      className='px-3 py-1.5 border border-[#008060] text-[#008060] text-[12.5px] font-medium rounded-lg hover:bg-[#F2F7F5] transition-colors bg-transparent cursor-pointer'
                    >
                      + Add Variant
                    </button>
                  </div>

                  <div className='space-y-3'>
                    {variants.map((variant, index) => (
                      <div
                        key={variant.id}
                        className='p-4 border border-[#E1E3E5] rounded-lg space-y-3'
                      >
                        <div className='flex items-center justify-between'>
                          <span className='text-[12.5px] font-semibold text-[#202223]'>
                            Variant {index + 1}
                          </span>
                          {variants.length > 1 && (
                            <button
                              onClick={() => removeVariant(variant.id)}
                              className='text-[#D82C0D] text-[12px] hover:underline bg-transparent border-none cursor-pointer'
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                          <div>
                            <label className='block text-[11.5px] text-[#6D7175] mb-1'>
                              Size
                            </label>
                            <input
                              type='text'
                              value={variant.size}
                              onChange={(e) =>
                                updateVariant(
                                  variant.id,
                                  'size',
                                  e.target.value,
                                )
                              }
                              placeholder='e.g. UK 8, L, XL'
                              className='w-full px-3 py-2 border border-[#E1E3E5] rounded-lg text-[12.5px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] transition-all'
                            />
                          </div>
                          <div>
                            <label className='block text-[11.5px] text-[#6D7175] mb-1'>
                              Color
                            </label>
                            <input
                              type='text'
                              value={variant.color}
                              onChange={(e) =>
                                updateVariant(
                                  variant.id,
                                  'color',
                                  e.target.value,
                                )
                              }
                              placeholder='e.g. Black, Red'
                              className='w-full px-3 py-2 border border-[#E1E3E5] rounded-lg text-[12.5px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] transition-all'
                            />
                          </div>
                          <div>
                            <label className='block text-[11.5px] text-[#6D7175] mb-1'>
                              SKU
                            </label>
                            <input
                              type='text'
                              value={variant.sku}
                              onChange={(e) =>
                                updateVariant(variant.id, 'sku', e.target.value)
                              }
                              placeholder='e.g. FB-001-BLK-8'
                              className='w-full px-3 py-2 border border-[#E1E3E5] rounded-lg text-[12.5px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] transition-all'
                            />
                          </div>
                          <div>
                            <label className='block text-[11.5px] text-[#6D7175] mb-1'>
                              Price (₹)
                            </label>
                            <input
                              type='number'
                              value={variant.price}
                              onChange={(e) =>
                                updateVariant(
                                  variant.id,
                                  'price',
                                  e.target.value,
                                )
                              }
                              placeholder='0.00'
                              className='w-full px-3 py-2 border border-[#E1E3E5] rounded-lg text-[12.5px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] transition-all'
                            />
                          </div>
                          <div>
                            <label className='block text-[11.5px] text-[#6D7175] mb-1'>
                              Stock
                            </label>
                            <input
                              type='number'
                              value={variant.stock}
                              onChange={(e) =>
                                updateVariant(
                                  variant.id,
                                  'stock',
                                  e.target.value,
                                )
                              }
                              placeholder='0'
                              className='w-full px-3 py-2 border border-[#E1E3E5] rounded-lg text-[12.5px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] transition-all'
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SEO TAB ── */}
              {activeTab === 'seo' && (
                <div className='space-y-5'>
                  <div className='p-4 bg-[#F6F6F7] border border-[#E1E3E5] rounded-lg'>
                    <p className='text-[12.5px] font-medium text-[#202223] mb-1'>
                      Search Engine Preview
                    </p>
                    <div className='mt-3 space-y-1'>
                      <p className='text-[#2C6ECB] text-[15px] truncate'>
                        {form.metaTitle || form.name || 'Product Title'}
                      </p>
                      <p className='text-[#008060] text-[12px]'>
                        apexsport.in/shop/product/
                        {form.name
                          ? form.name.toLowerCase().replace(/\s+/g, '-')
                          : 'product-slug'}
                      </p>
                      <p className='text-[#6D7175] text-[12.5px] leading-relaxed line-clamp-2'>
                        {form.metaDescription ||
                          form.description ||
                          'Product description will appear here...'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                      Meta Title
                      <span className='ml-2 text-[11px] text-[#8C9196] font-normal'>
                        {form.metaTitle.length}/60
                      </span>
                    </label>
                    <input
                      type='text'
                      value={form.metaTitle}
                      onChange={(e) => updateForm('metaTitle', e.target.value)}
                      maxLength={60}
                      placeholder='SEO title for search engines'
                      className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                    />
                    <div className='mt-1.5 h-1 bg-[#E1E3E5] rounded-full overflow-hidden'>
                      <div
                        className={`h-full rounded-full transition-all ${
                          form.metaTitle.length > 50
                            ? 'bg-[#D82C0D]'
                            : form.metaTitle.length > 30
                              ? 'bg-[#008060]'
                              : 'bg-[#FFC453]'
                        }`}
                        style={{
                          width: `${(form.metaTitle.length / 60) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                      Meta Description
                      <span className='ml-2 text-[11px] text-[#8C9196] font-normal'>
                        {form.metaDescription.length}/160
                      </span>
                    </label>
                    <textarea
                      value={form.metaDescription}
                      onChange={(e) =>
                        updateForm('metaDescription', e.target.value)
                      }
                      maxLength={160}
                      placeholder='Brief description for search results...'
                      rows={3}
                      className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all resize-none'
                    />
                    <div className='mt-1.5 h-1 bg-[#E1E3E5] rounded-full overflow-hidden'>
                      <div
                        className={`h-full rounded-full transition-all ${
                          form.metaDescription.length > 140
                            ? 'bg-[#D82C0D]'
                            : form.metaDescription.length > 80
                              ? 'bg-[#008060]'
                              : 'bg-[#FFC453]'
                        }`}
                        style={{
                          width: `${(form.metaDescription.length / 160) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                      Meta Keywords
                      <span className='ml-1 text-[11px] text-[#8C9196] font-normal'>
                        (comma separated)
                      </span>
                    </label>
                    <input
                      type='text'
                      value={form.metaKeywords}
                      onChange={(e) =>
                        updateForm('metaKeywords', e.target.value)
                      }
                      placeholder='football boots, nike, sports shoes'
                      className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Media */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl p-6'>
            <h2 className='font-sora text-[15px] font-semibold text-[#202223] mb-4'>
              Product Images
            </h2>

            {/* Drop zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)
              }}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                dragOver
                  ? 'border-[#008060] bg-[#F2F7F5]'
                  : 'border-[#E1E3E5] hover:border-[#8C9196] hover:bg-[#F6F6F7]'
              }`}
            >
              <div className='w-12 h-12 bg-[#F6F6F7] border border-[#E1E3E5] rounded-xl flex items-center justify-center mx-auto mb-3'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#8C9196'
                  strokeWidth='2'
                >
                  <rect x='3' y='3' width='18' height='18' rx='2' />
                  <circle cx='8.5' cy='8.5' r='1.5' />
                  <polyline points='21 15 16 10 5 21' />
                </svg>
              </div>
              <p className='text-[13px] font-medium text-[#202223]'>
                Drag & drop images here
              </p>
              <p className='text-[12px] text-[#6D7175] mt-1'>
                or{' '}
                <label className='text-[#008060] cursor-pointer hover:underline'>
                  browse files
                  <input
                    type='file'
                    multiple
                    accept='image/*'
                    className='hidden'
                  />
                </label>
              </p>
              <p className='text-[11px] text-[#8C9196] mt-2'>
                PNG, JPG, WEBP up to 10MB each
              </p>
            </div>

            {/* Image grid placeholder */}
            {images.length === 0 && (
              <div className='grid grid-cols-4 gap-3 mt-4'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='aspect-square bg-[#F6F6F7] border border-dashed border-[#E1E3E5] rounded-lg flex items-center justify-center'
                  >
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='#E1E3E5'
                      strokeWidth='2'
                    >
                      <rect x='3' y='3' width='18' height='18' rx='2' />
                      <circle cx='8.5' cy='8.5' r='1.5' />
                      <polyline points='21 15 16 10 5 21' />
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className='space-y-4'>
          {/* Status */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl p-5'>
            <h3 className='font-sora text-[14px] font-semibold text-[#202223] mb-4'>
              Product Status
            </h3>
            <div className='space-y-2'>
              {(['active', 'draft'] as const).map((s) => (
                <label
                  key={s}
                  className='relative flex items-center gap-3 p-3 border border-[#E1E3E5] rounded-lg cursor-pointer hover:bg-[#F6F6F7] transition-colors'
                >
                  <input
                    type='radio'
                    name='status'
                    value={s}
                    checked={status === s}
                    onChange={() => setStatus(s)}
                    className='accent-[#008060] w-4 h-4'
                  />
                  <div>
                    <p className='text-[13px] font-medium text-[#202223] capitalize'>
                      {s}
                    </p>
                    <p className='text-[11.5px] text-[#6D7175]'>
                      {s === 'active'
                        ? 'Visible on storefront'
                        : 'Hidden from storefront'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl p-5'>
            <h3 className='font-sora text-[14px] font-semibold text-[#202223] mb-4'>
              Summary
            </h3>
            <div className='space-y-3'>
              {[
                { label: 'Name', value: form.name || '—' },
                { label: 'Brand', value: form.brand || '—' },
                { label: 'Sport', value: form.sport || '—' },
                { label: 'Category', value: form.category || '—' },
                { label: 'Price', value: form.price ? `₹${form.price}` : '—' },
                { label: 'Stock', value: form.stock || '—' },
                { label: 'SKU', value: form.sku || '—' },
              ].map((item) => (
                <div
                  key={item.label}
                  className='flex items-center justify-between'
                >
                  <span className='text-[12px] text-[#6D7175]'>
                    {item.label}
                  </span>
                  <span className='text-[12.5px] font-medium text-[#202223] truncate max-w-35 text-right'>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl p-5'>
            <h3 className='font-sora text-[14px] font-semibold text-[#202223] mb-4'>
              Checklist
            </h3>
            <div className='space-y-2.5'>
              {[
                { label: 'Product name', done: !!form.name },
                { label: 'Description', done: !!form.description },
                { label: 'Price set', done: !!form.price },
                { label: 'SKU added', done: !!form.sku },
                { label: 'Stock quantity', done: !!form.stock },
                { label: 'Images uploaded', done: images.length > 0 },
                { label: 'SEO title', done: !!form.metaTitle },
              ].map((item) => (
                <div key={item.label} className='flex items-center gap-2.5'>
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      item.done ? 'bg-[#008060]' : 'bg-[#E1E3E5]'
                    }`}
                  >
                    {item.done && (
                      <svg
                        width='8'
                        height='8'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='white'
                        strokeWidth='3'
                      >
                        <polyline points='20 6 9 17 4 12' />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-[12.5px] ${item.done ? 'text-[#202223]' : 'text-[#8C9196]'}`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className='space-y-2'>
            <button
              onClick={() => handleSave('active')}
              disabled={saving}
              className='w-full py-2.5 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer border-none'
            >
              {saving ? 'Saving...' : 'Save & Publish'}
            </button>
            <button
              onClick={() => handleSave('draft')}
              disabled={saving}
              className='w-full py-2.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors disabled:opacity-50 cursor-pointer'
            >
              Save as Draft
            </button>
            <Link
              href='/dashboard/products'
              className='block text-center py-2.5 text-[13px] text-[#6D7175] hover:text-[#202223] no-underline transition-colors'
            >
              Discard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
