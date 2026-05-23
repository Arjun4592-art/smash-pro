import Hero from '@/components/website/Hero'
import BrandsBar from '@/components/website/BrandsBar'
import CategoryFilter from '@/components/website/CategoryFilter'
import ProductGrid from '@/components/website/ProductGrid'
import {
  featuredProducts,
  newArrivals,
  bestSellers,
  saleProducts,
} from '@/lib/mockData'
import {
  TruckIcon,
  ShieldIcon,
  RefreshIcon,
  HeartIcon,
} from '@/components/ui/Icons'
import { formatCurrency } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants'
import Link from 'next/link'

const TRUST_FEATURES = [
  {
    icon: <TruckIcon size={24} />,
    title: 'Free Shipping',
    desc: `On orders above ${formatCurrency(FREE_SHIPPING_THRESHOLD)}`,
  },
  {
    icon: <ShieldIcon size={24} />,
    title: '100% Authentic',
    desc: 'Genuine products guaranteed',
  },
  {
    icon: <RefreshIcon size={24} />,
    title: 'Easy Returns',
    desc: '7-day hassle-free returns',
  },
  {
    icon: <HeartIcon size={24} />,
    title: 'Expert Support',
    desc: 'By sports enthusiasts',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Slider */}
      <Hero />

      {/* Trust Bar */}
      <section className='bg-[#0A1F44] py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
            {TRUST_FEATURES.map((f) => (
              <div key={f.title} className='flex items-center gap-3'>
                <div className='text-[#E8553A] shrink-0'>{f.icon}</div>
                <div>
                  <p className='font-montserrat font-bold text-white text-sm'>
                    {f.title}
                  </p>
                  <p className='font-lato text-white/60 text-xs mt-0.5'>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryFilter />

      {/* Featured Products */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <ProductGrid
            products={featuredProducts}
            title='Featured Products'
            showSort={true}
            showViewToggle={true}
            columns={3}
          />
        </div>
      </section>

      {/* Sale Banner */}
      <section className='py-12 bg-[#E8553A] relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-4 left-8 text-8xl'>⚽</div>
          <div className='absolute top-2 right-24 text-7xl'>🏏</div>
          <div className='absolute bottom-4 left-48 text-6xl'>🎾</div>
          <div className='absolute bottom-2 right-8 text-8xl'>🏀</div>
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
            <div className='text-center lg:text-left'>
              <p className='font-lato text-white/80 text-sm uppercase tracking-widest mb-2'>
                Limited Time Offer
              </p>
              <h2 className='font-montserrat font-black text-white text-4xl sm:text-5xl mb-3'>
                UP TO 40% OFF
              </h2>
              <p className='font-lato text-white/80 text-lg'>
                On selected sports equipment — don&apos;t miss out!
              </p>
            </div>
            <div className='flex flex-col items-center gap-3'>
              <div className='flex items-center gap-3 text-white font-lato text-sm'>
                <span>Use code:</span>
                <span className='bg-white text-[#E8553A] font-montserrat font-black px-4 py-1.5 rounded-full text-base'>
                  Smash10
                </span>
              </div>
              <Link
                href='/shop?badge=SALE'
                className='bg-white text-[#E8553A] font-montserrat font-black px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg text-lg'
              >
                Shop Sale Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className='py-16 bg-[#F2F4F7]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <ProductGrid
            products={newArrivals}
            title='New Arrivals'
            showSort={false}
            showViewToggle={false}
            columns={4}
          />
          <div className='text-center mt-8'>
            <Link
              href='/shop?badge=NEW'
              className='inline-flex items-center gap-2 border-2 border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white font-montserrat font-bold px-8 py-3 rounded-full transition-all duration-200'
            >
              View All New Arrivals →
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Bar */}
      <BrandsBar />

      {/* Best Sellers */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <ProductGrid
            products={bestSellers}
            title='Best Sellers'
            showSort={false}
            showViewToggle={false}
            columns={3}
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='py-16 bg-[#0A1F44]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <p className='text-xs font-semibold text-[#E8553A] uppercase tracking-widest font-montserrat mb-2'>
              Why Smash Pro
            </p>
            <h2 className='font-montserrat font-black text-3xl sm:text-4xl text-white'>
              Built for Athletes, by Athletes
            </h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                emoji: '🏆',
                title: 'Premium Quality',
                desc: 'Every product is sourced directly from authorized brand distributors. 100% authentic, zero compromise.',
              },
              {
                emoji: '⚡',
                title: 'Fast Delivery',
                desc: 'Order before 2 PM and get same-day dispatch. Most orders delivered within 48 hours across India.',
              },
              {
                emoji: '💬',
                title: 'Expert Advice',
                desc: 'Our team are active sports players. We test every product and give honest recommendations.',
              },
              {
                emoji: '↩️',
                title: 'Easy Returns',
                desc: "7-day no-questions-asked returns policy. If you're not happy, we're not happy.",
              },
              {
                emoji: '💳',
                title: 'Flexible Payments',
                desc: 'Pay via UPI, card, net banking or EMI. No-cost EMI available on orders above ₹3,000.',
              },
              {
                emoji: '🔒',
                title: 'Secure Shopping',
                desc: '256-bit SSL encryption on all transactions. Your data is always safe with us.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className='bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#E8553A]/30 transition-all duration-300 group'
              >
                <span className='text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300'>
                  {item.emoji}
                </span>
                <h3 className='font-montserrat font-bold text-white text-lg mb-2'>
                  {item.title}
                </h3>
                <p className='font-lato text-white/60 text-sm leading-relaxed'>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-10'>
            <p className='text-xs font-semibold text-[#E8553A] uppercase tracking-widest font-montserrat mb-2'>
              Reviews
            </p>
            <h2 className='font-montserrat font-black text-3xl text-[#0A1F44]'>
              What Athletes Say
            </h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                name: 'Arjun Sharma',
                sport: 'Cricket',
                city: 'Bengaluru',
                rating: 5,
                review:
                  'Got my SS Ton bat within 2 days. Absolutely genuine product and the quality is outstanding. Will definitely order again!',
                avatar: 'AS',
              },
              {
                name: 'Priya Patel',
                sport: 'Tennis',
                city: 'Mumbai',
                rating: 5,
                review:
                  'The Wilson RF97 I ordered was 100% authentic. Great packaging, fast delivery, and the customer support team was super helpful.',
                avatar: 'PP',
              },
              {
                name: 'Rohit Verma',
                sport: 'Football',
                city: 'Delhi',
                rating: 5,
                review:
                  'Best sports store online in India. Nike boots arrived in perfect condition. Free shipping saved me ₹99 on my order!',
                avatar: 'RV',
              },
              {
                name: 'Sneha Iyer',
                sport: 'Running',
                city: 'Chennai',
                rating: 5,
                review:
                  'Ordered the Garmin watch and Air Zoom Pegasus together. Both arrived quickly. The EMI option made it super affordable.',
                avatar: 'SI',
              },
              {
                name: 'Vikram Singh',
                sport: 'Basketball',
                city: 'Kolkata',
                rating: 5,
                review:
                  'Official NBA Spalding ball at a great price. Verified authentic. The product quality speaks for itself.',
                avatar: 'VS',
              },
              {
                name: 'Kavya Nair',
                sport: 'Boxing',
                city: 'Hyderabad',
                rating: 5,
                review:
                  'Everlast gloves at a discounted price with free shipping. The quality is amazing and packaging was perfect.',
                avatar: 'KN',
              },
            ].map((review) => (
              <div
                key={review.name}
                className='bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-[#E8553A]/20 transition-all duration-300'
              >
                {/* Stars */}
                <div className='flex items-center gap-0.5 mb-3'>
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className='text-amber-400 text-base'>
                      ★
                    </span>
                  ))}
                </div>

                {/* Review */}
                <p className='font-lato text-gray-600 text-sm leading-relaxed mb-4'>
                  &quot;{review.review}&quot;
                </p>

                {/* Author */}
                <div className='flex items-center gap-3'>
                  <div className='w-9 h-9 bg-[#0A1F44] text-white rounded-full flex items-center justify-center font-montserrat font-bold text-xs shrink-0'>
                    {review.avatar}
                  </div>
                  <div>
                    <p className='font-montserrat font-bold text-sm text-[#0A1F44]'>
                      {review.name}
                    </p>
                    <p className='font-lato text-xs text-gray-400'>
                      {review.sport} · {review.city}
                    </p>
                  </div>
                  <span className='ml-auto text-green-500 text-xs font-semibold font-lato'>
                    ✓ Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className='py-16 bg-[#F2F4F7]'>
        <div className='max-w-2xl mx-auto px-4 text-center'>
          <p className='text-xs font-semibold text-[#E8553A] uppercase tracking-widest font-montserrat mb-2'>
            Stay in the Game
          </p>
          <h2 className='font-montserrat font-black text-3xl text-[#0A1F44] mb-3'>
            Get Exclusive Deals
          </h2>
          <p className='font-lato text-gray-500 mb-8'>
            Subscribe and get 10% off your first order + early access to new
            arrivals and flash sales.
          </p>
          <div className='flex gap-3 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Enter your email address'
              className='flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E8553A] transition-colors font-lato'
            />
            <button className='bg-[#E8553A] hover:bg-[#D4441F] text-white font-montserrat font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap'>
              Subscribe
            </button>
          </div>
          <p className='text-xs text-gray-400 font-lato mt-3'>
            No spam ever. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  )
}
