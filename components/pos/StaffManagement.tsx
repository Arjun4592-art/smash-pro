'use client'
import { useState } from 'react'
import { usePOSStore } from '@/store/posStore'
import type { POSStaffMember, StaffRole } from '@/types'

interface Props {
  onClose: () => void
}

const ROLES: { value: StaffRole; label: string; color: string; bg: string }[] =
  [
    { value: 'owner', label: 'Owner', color: '#B7791F', bg: '#FFF3CD' },
    { value: 'manager', label: 'Manager', color: '#2C6ECB', bg: '#E8F0FD' },
    { value: 'cashier', label: 'Cashier', color: '#008060', bg: '#E3F1EB' },
  ]

const SHIFTS = ['Morning', 'Afternoon', 'Evening', 'Full day', 'Custom']

const EMPTY_FORM = {
  name: '',
  initials: '',
  email: '',
  phone: '',
  role: 'cashier' as StaffRole,
  pin: '',
  shift: 'Morning',
  isActive: true,
}

export default function StaffManagement({ onClose }: Props) {
  const { staffList, addStaff, updateStaff, removeStaff, updateStaffPin } =
    usePOSStore()
  const [view, setView] = useState<'list' | 'add' | 'edit' | 'pin'>('list')
  const [selected, setSelected] = useState<POSStaffMember | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [search, setSearch] = useState('')

  const filtered = staffList.filter(
    (s) => !search || s.name.toLowerCase().includes(search.toLowerCase()),
  )

  const openAdd = () => {
    setForm(EMPTY_FORM)
    setView('add')
  }

  const openEdit = (staff: POSStaffMember) => {
    setSelected(staff)
    setForm({
      name: staff.name,
      initials: staff.initials,
      email: staff.email ?? '',
      phone: staff.phone ?? '',
      role: staff.role,
      pin: staff.pin,
      shift: staff.shift ?? 'Morning',
      isActive: staff.isActive,
    })
    setView('edit')
  }

  const openPin = (staff: POSStaffMember) => {
    setSelected(staff)
    setNewPin('')
    setConfirmPin('')
    setPinError('')
    setView('pin')
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.pin) return
    if (form.pin.length !== 4 || !/^\d+$/.test(form.pin)) return
    if (view === 'add') {
      addStaff({
        ...form,
        initials:
          form.initials ||
          form.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2),
      })
    } else if (view === 'edit' && selected) {
      updateStaff(selected.id, {
        ...form,
        initials:
          form.initials ||
          form.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2),
      })
    }
    setView('list')
  }

  const handlePinChange = () => {
    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      setPinError('PIN must be exactly 4 digits')
      return
    }
    if (newPin !== confirmPin) {
      setPinError('PINs do not match')
      return
    }
    if (selected) updateStaffPin(selected.id, newPin)
    setView('list')
  }

  const handleRemove = (id: string) => {
    if (window.confirm('Remove this staff member?')) removeStaff(id)
  }

  const roleInfo = (role: StaffRole) => ROLES.find((r) => r.value === role)!

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50 p-4'
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className='w-full max-w-lg rounded-xl overflow-hidden'
        style={{
          background: '#FFFFFF',
          border: '1px solid #E1E3E5',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }}
      >
        {/* Header */}
        <div
          className='flex items-center justify-between px-5 py-4'
          style={{ borderBottom: '1px solid #E1E3E5' }}
        >
          <div className='flex items-center gap-2'>
            {view !== 'list' && (
              <button
                onClick={() => setView('list')}
                className='w-7 h-7 flex items-center justify-center rounded hover:bg-[#F6F6F7]'
                style={{ color: '#6D7175' }}
              >
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                >
                  <polyline points='15 18 9 12 15 6' />
                </svg>
              </button>
            )}
            <h3
              className='text-base font-semibold'
              style={{ color: '#202223' }}
            >
              {view === 'list'
                ? 'Staff management'
                : view === 'add'
                  ? 'Add staff member'
                  : view === 'edit'
                    ? 'Edit staff member'
                    : 'Change PIN'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F6F6F7]'
            style={{ color: '#6D7175' }}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </div>

        {/* ── List view ────────────────────────────────────────────────────── */}
        {view === 'list' && (
          <>
            <div className='px-5 pt-4 pb-2 flex gap-2'>
              <div
                className='flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border'
                style={{ borderColor: '#E1E3E5' }}
              >
                <svg
                  width='13'
                  height='13'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#8C9196'
                  strokeWidth='2'
                  strokeLinecap='round'
                >
                  <circle cx='11' cy='11' r='8' />
                  <line x1='21' y1='21' x2='16.65' y2='16.65' />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search staff...'
                  className='flex-1 bg-transparent outline-none text-sm'
                  style={{ color: '#202223' }}
                />
              </div>
              <button
                onClick={openAdd}
                className='flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium'
                style={{ background: '#008060', color: '#FFFFFF' }}
              >
                <svg
                  width='13'
                  height='13'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                >
                  <line x1='12' y1='5' x2='12' y2='19' />
                  <line x1='5' y1='12' x2='19' y2='12' />
                </svg>
                Add staff
              </button>
            </div>

            <div className='overflow-y-auto' style={{ maxHeight: 400 }}>
              {filtered.map((staff) => {
                const role = roleInfo(staff.role)
                return (
                  <div
                    key={staff.id}
                    className='flex items-center gap-3 px-5 py-3 hover:bg-[#F6F6F7] transition-colors'
                    style={{ borderBottom: '1px solid #F6F6F7' }}
                  >
                    {/* Avatar */}
                    <div
                      className='w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0'
                      style={{ background: role.bg, color: role.color }}
                    >
                      {staff.initials}
                    </div>

                    {/* Info */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 mb-0.5'>
                        <p
                          className='text-sm font-medium'
                          style={{ color: '#202223' }}
                        >
                          {staff.name}
                        </p>
                        <span
                          className='text-[10px] px-1.5 py-0.5 rounded-full font-medium'
                          style={{ background: role.bg, color: role.color }}
                        >
                          {role.label}
                        </span>
                        {!staff.isActive && (
                          <span
                            className='text-[10px] px-1.5 py-0.5 rounded-full font-medium'
                            style={{ background: '#F6F6F7', color: '#8C9196' }}
                          >
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className='text-xs' style={{ color: '#8C9196' }}>
                        {staff.shift} · PIN: {'•'.repeat(staff.pin.length)} · ₹
                        {staff.totalSales.toLocaleString('en-IN')} sales
                      </p>
                    </div>

                    {/* Actions */}
                    <div className='flex items-center gap-1 shrink-0'>
                      <button
                        onClick={() => openPin(staff)}
                        className='px-2 py-1 rounded text-xs border transition-colors hover:border-[#008060] hover:text-[#008060]'
                        style={{ borderColor: '#E1E3E5', color: '#6D7175' }}
                      >
                        PIN
                      </button>
                      <button
                        onClick={() => openEdit(staff)}
                        className='w-7 h-7 flex items-center justify-center rounded transition-colors hover:bg-[#F6F6F7]'
                        style={{ color: '#6D7175' }}
                      >
                        <svg
                          width='13'
                          height='13'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                        >
                          <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
                          <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
                        </svg>
                      </button>
                      {staff.role !== 'owner' && (
                        <button
                          onClick={() => handleRemove(staff.id)}
                          className='w-7 h-7 flex items-center justify-center rounded transition-colors hover:bg-[#FFF4F4]'
                          style={{ color: '#8C9196' }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = '#D82C0D')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = '#8C9196')
                          }
                        >
                          <svg
                            width='13'
                            height='13'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                          >
                            <polyline points='3 6 5 6 21 6' />
                            <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Staff stats */}
            <div
              className='px-5 py-3'
              style={{ borderTop: '1px solid #E1E3E5', background: '#F6F6F7' }}
            >
              <div className='grid grid-cols-3 gap-3 text-center'>
                {[
                  { label: 'Total staff', value: staffList.length },
                  {
                    label: 'Active',
                    value: staffList.filter((s) => s.isActive).length,
                  },
                  {
                    label: 'On shift',
                    value: staffList.filter(
                      (s) => s.isActive && s.shift !== 'Off',
                    ).length,
                  },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      className='text-base font-semibold'
                      style={{ color: '#202223' }}
                    >
                      {s.value}
                    </p>
                    <p className='text-[11px]' style={{ color: '#8C9196' }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Add / Edit form ───────────────────────────────────────────────── */}
        {(view === 'add' || view === 'edit') && (
          <>
            <div
              className='p-5 space-y-3 overflow-y-auto'
              style={{ maxHeight: 440 }}
            >
              <div className='grid grid-cols-2 gap-3'>
                <div className='col-span-2'>
                  <label
                    className='text-[11px] font-medium uppercase tracking-wide block mb-1'
                    style={{ color: '#6D7175' }}
                  >
                    Full name *
                  </label>
                  <input
                    autoFocus
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder='e.g. Rahul Sharma'
                    className='w-full px-3 py-2 rounded-lg border text-sm outline-none focus:border-[#008060]'
                    style={{ borderColor: '#E1E3E5', color: '#202223' }}
                  />
                </div>
                <div>
                  <label
                    className='text-[11px] font-medium uppercase tracking-wide block mb-1'
                    style={{ color: '#6D7175' }}
                  >
                    Initials
                  </label>
                  <input
                    value={form.initials}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        initials: e.target.value.toUpperCase().slice(0, 2),
                      })
                    }
                    placeholder='Auto'
                    maxLength={2}
                    className='w-full px-3 py-2 rounded-lg border text-sm outline-none focus:border-[#008060]'
                    style={{ borderColor: '#E1E3E5', color: '#202223' }}
                  />
                </div>
                <div>
                  <label
                    className='text-[11px] font-medium uppercase tracking-wide block mb-1'
                    style={{ color: '#6D7175' }}
                  >
                    PIN * (4 digits)
                  </label>
                  <input
                    type='password'
                    value={form.pin}
                    onChange={(e) =>
                      setForm({ ...form, pin: e.target.value.slice(0, 4) })
                    }
                    placeholder='••••'
                    maxLength={4}
                    className='w-full px-3 py-2 rounded-lg border text-sm outline-none focus:border-[#008060]'
                    style={{ borderColor: '#E1E3E5', color: '#202223' }}
                  />
                </div>
                <div>
                  <label
                    className='text-[11px] font-medium uppercase tracking-wide block mb-1'
                    style={{ color: '#6D7175' }}
                  >
                    Phone
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder='+91 98765 43210'
                    className='w-full px-3 py-2 rounded-lg border text-sm outline-none focus:border-[#008060]'
                    style={{ borderColor: '#E1E3E5', color: '#202223' }}
                  />
                </div>
                <div>
                  <label
                    className='text-[11px] font-medium uppercase tracking-wide block mb-1'
                    style={{ color: '#6D7175' }}
                  >
                    Email
                  </label>
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder='staff@apexsport.in'
                    className='w-full px-3 py-2 rounded-lg border text-sm outline-none focus:border-[#008060]'
                    style={{ borderColor: '#E1E3E5', color: '#202223' }}
                  />
                </div>
                <div>
                  <label
                    className='text-[11px] font-medium uppercase tracking-wide block mb-1'
                    style={{ color: '#6D7175' }}
                  >
                    Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value as StaffRole })
                    }
                    className='w-full px-3 py-2 rounded-lg border text-sm outline-none'
                    style={{ borderColor: '#E1E3E5', color: '#202223' }}
                  >
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className='text-[11px] font-medium uppercase tracking-wide block mb-1'
                    style={{ color: '#6D7175' }}
                  >
                    Shift
                  </label>
                  <select
                    value={form.shift}
                    onChange={(e) =>
                      setForm({ ...form, shift: e.target.value })
                    }
                    className='w-full px-3 py-2 rounded-lg border text-sm outline-none'
                    style={{ borderColor: '#E1E3E5', color: '#202223' }}
                  >
                    {SHIFTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active toggle */}
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className='accent-[#008060]'
                />
                <span className='text-sm' style={{ color: '#6D7175' }}>
                  Staff member is active
                </span>
              </label>
            </div>

            <div
              className='px-5 pb-5 flex gap-2'
              style={{ borderTop: '1px solid #E1E3E5', paddingTop: 12 }}
            >
              <button
                onClick={() => setView('list')}
                className='flex-1 py-2.5 rounded-lg text-sm border hover:bg-[#F6F6F7]'
                style={{ borderColor: '#E1E3E5', color: '#6D7175' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className='flex-1 py-2.5 rounded-lg text-sm font-medium'
                style={{ background: '#008060', color: '#FFFFFF' }}
              >
                {view === 'add' ? 'Add staff member' : 'Save changes'}
              </button>
            </div>
          </>
        )}

        {/* ── Change PIN view ───────────────────────────────────────────────── */}
        {view === 'pin' && selected && (
          <>
            <div className='p-5 space-y-3'>
              <div
                className='flex items-center gap-3 p-3 rounded-lg'
                style={{ background: '#F6F6F7' }}
              >
                <div
                  className='w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold'
                  style={{
                    background: roleInfo(selected.role).bg,
                    color: roleInfo(selected.role).color,
                  }}
                >
                  {selected.initials}
                </div>
                <div>
                  <p
                    className='text-sm font-medium'
                    style={{ color: '#202223' }}
                  >
                    {selected.name}
                  </p>
                  <p className='text-xs' style={{ color: '#8C9196' }}>
                    {roleInfo(selected.role).label}
                  </p>
                </div>
              </div>

              <div>
                <label
                  className='text-[11px] font-medium uppercase tracking-wide block mb-1'
                  style={{ color: '#6D7175' }}
                >
                  New PIN (4 digits)
                </label>
                <input
                  autoFocus
                  type='password'
                  value={newPin}
                  onChange={(e) => {
                    setNewPin(e.target.value.slice(0, 4))
                    setPinError('')
                  }}
                  placeholder='••••'
                  maxLength={4}
                  className='w-full px-3 py-2 rounded-lg border text-sm outline-none focus:border-[#008060]'
                  style={{
                    borderColor: pinError ? '#D82C0D' : '#E1E3E5',
                    color: '#202223',
                  }}
                />
              </div>
              <div>
                <label
                  className='text-[11px] font-medium uppercase tracking-wide block mb-1'
                  style={{ color: '#6D7175' }}
                >
                  Confirm PIN
                </label>
                <input
                  type='password'
                  value={confirmPin}
                  onChange={(e) => {
                    setConfirmPin(e.target.value.slice(0, 4))
                    setPinError('')
                  }}
                  placeholder='••••'
                  maxLength={4}
                  className='w-full px-3 py-2 rounded-lg border text-sm outline-none focus:border-[#008060]'
                  style={{
                    borderColor: pinError ? '#D82C0D' : '#E1E3E5',
                    color: '#202223',
                  }}
                />
              </div>
              {pinError && (
                <p className='text-xs' style={{ color: '#D82C0D' }}>
                  {pinError}
                </p>
              )}
            </div>

            <div
              className='px-5 pb-5 flex gap-2'
              style={{ borderTop: '1px solid #E1E3E5', paddingTop: 12 }}
            >
              <button
                onClick={() => setView('list')}
                className='flex-1 py-2.5 rounded-lg text-sm border hover:bg-[#F6F6F7]'
                style={{ borderColor: '#E1E3E5', color: '#6D7175' }}
              >
                Cancel
              </button>
              <button
                onClick={handlePinChange}
                className='flex-1 py-2.5 rounded-lg text-sm font-medium'
                style={{ background: '#008060', color: '#FFFFFF' }}
              >
                Update PIN
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
