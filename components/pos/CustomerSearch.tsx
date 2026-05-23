'use client'
import { useState } from 'react'
import { usePOSStore, POSCustomer } from '@/store/posStore'

// Mock customers — replace with real API later
const MOCK_CUSTOMERS: POSCustomer[] = [
  { id:'1', name:'Rahul Sharma',  email:'rahul@gmail.com',  phone:'9876543210', totalOrders:5,  totalSpent:45000, marketingOptIn:true  },
  { id:'2', name:'Priya Nair',    email:'priya@gmail.com',  phone:'9823456789', totalOrders:3,  totalSpent:28000, marketingOptIn:true  },
  { id:'3', name:'Karan Singh',   email:'karan@gmail.com',  phone:'9812345678', totalOrders:8,  totalSpent:72000, marketingOptIn:false },
  { id:'4', name:'Sneha Roy',     email:'sneha@gmail.com',  phone:'9834567890', totalOrders:2,  totalSpent:12000, marketingOptIn:true  },
  { id:'5', name:'Arjun Mehta',   email:'arjun@gmail.com',  phone:'9845678901', totalOrders:12, totalSpent:98000, marketingOptIn:true  },
]

interface Props {
  onClose: () => void
}

export default function CustomerSearch({ onClose }: Props) {
  const { customer, attachCustomer, detachCustomer } = usePOSStore()
  const [search, setSearch] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [optIn, setOptIn] = useState(false)

  const filtered = MOCK_CUSTOMERS.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (c: POSCustomer) => {
    attachCustomer(c)
    onClose()
  }

  const handleRemove = () => {
    detachCustomer()
    onClose()
  }

  const handleAddNew = () => {
    if (!newName.trim()) return
    const newCustomer: POSCustomer = {
      id:             `new-${Date.now()}`,
      name:           newName.trim(),
      email:          newEmail.trim() || undefined,
      phone:          newPhone.trim() || undefined,
      totalOrders:    0,
      totalSpent:     0,
      marketingOptIn: optIn,
    }
    attachCustomer(newCustomer)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '1px solid #E1E3E5', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #E1E3E5' }}>
          <h3 className="text-base font-semibold" style={{ color: '#202223' }}>
            {showNew ? 'Add new customer' : 'Add customer to sale'}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F6F6F7] transition-colors"
            style={{ color: '#6D7175' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {!showNew ? (
          <>
            {/* Current customer */}
            {customer && (
              <div className="px-5 py-3" style={{ borderBottom: '1px solid #E1E3E5', background: '#F2F7F5' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#008060', color: '#FFFFFF' }}>
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#202223' }}>{customer.name}</p>
                      <p className="text-xs" style={{ color: '#6D7175' }}>{customer.phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemove}
                    className="text-xs px-2 py-1 rounded transition-colors hover:bg-[#FFF4F4]"
                    style={{ color: '#D82C0D' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Search */}
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ borderColor: '#E1E3E5' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8C9196" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, phone or email..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: '#202223' }}
                />
              </div>
            </div>

            {/* Results */}
            <div className="overflow-y-auto" style={{ maxHeight: 240 }}>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center py-8 gap-2">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E1E3E5" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  <p className="text-sm" style={{ color: '#8C9196' }}>No customers found</p>
                </div>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(c)}
                    className="w-full flex items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-[#F6F6F7]"
                    style={{ borderBottom: '1px solid #F6F6F7' }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: '#F6F6F7', color: '#6D7175' }}>
                      {c.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: '#202223' }}>{c.name}</p>
                      <p className="text-xs" style={{ color: '#8C9196' }}>{c.phone} · {c.totalOrders} orders</p>
                    </div>
                    <p className="text-xs font-medium shrink-0" style={{ color: '#008060' }}>
                      ₹{c.totalSpent.toLocaleString('en-IN')}
                    </p>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3" style={{ borderTop: '1px solid #E1E3E5' }}>
              <button
                onClick={() => setShowNew(true)}
                className="w-full py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-[#F6F6F7]"
                style={{ borderColor: '#E1E3E5', color: '#6D7175' }}
              >
                + Add new customer
              </button>
            </div>
          </>
        ) : (
          <>
            {/* New customer form */}
            <div className="px-5 py-4 space-y-3">
              {[
                { label:'Full name *', key:'name',  placeholder:'e.g. Rahul Sharma', value: newName,  setter: setNewName  },
                { label:'Phone',       key:'phone', placeholder:'+91 98765 43210',   value: newPhone, setter: setNewPhone },
                { label:'Email',       key:'email', placeholder:'rahul@email.com',   value: newEmail, setter: setNewEmail },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-[11px] font-medium uppercase tracking-wide block mb-1" style={{ color: '#6D7175' }}>
                    {f.label}
                  </label>
                  <input
                    value={f.value}
                    onChange={(e) => f.setter(e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors focus:border-[#008060]"
                    style={{ borderColor: '#E1E3E5', color: '#202223' }}
                  />
                </div>
              ))}

              {/* Marketing opt-in */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={optIn}
                  onChange={(e) => setOptIn(e.target.checked)}
                  className="accent-[#008060]"
                />
                <span className="text-sm" style={{ color: '#6D7175' }}>
                  Customer agrees to receive marketing emails
                </span>
              </label>
            </div>

            {/* Footer */}
            <div className="px-5 pb-4 flex gap-2" style={{ borderTop: '1px solid #E1E3E5', paddingTop: 12 }}>
              <button
                onClick={() => setShowNew(false)}
                className="flex-1 py-2 rounded-lg text-sm border transition-colors hover:bg-[#F6F6F7]"
                style={{ borderColor: '#E1E3E5', color: '#6D7175' }}
              >
                Back
              </button>
              <button
                onClick={handleAddNew}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ background: '#008060', color: '#FFFFFF' }}
              >
                Add customer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}