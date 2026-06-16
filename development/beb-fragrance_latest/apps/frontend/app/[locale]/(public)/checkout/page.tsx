'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector/PaymentMethodSelector';
import styles from './checkout.module.scss';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const [paymentMethod, setPaymentMethod] = useState<'payme' | 'click' | 'cash'>('payme');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    region: '',
    zipCode: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Submit order to backend
      console.log('Placing order:', { ...formData, paymentMethod });
      router.push(`/${locale}/checkout/result?status=success`);
    } catch (error) {
      console.error('Error placing order:', error);
      router.push(`/${locale}/checkout/result?status=error`);
    } finally {
      setLoading(false);
    }
  };

  // Mock cart data
  const cartItems = [
    { id: '1', name: 'Luxury Rose', price: 250000, quantity: 1 },
    { id: '2', name: 'Ocean Breeze', price: 320000, quantity: 1 },
  ];
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 30000;
  const tax = Math.floor(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  return (
    <div className={styles.checkout}>
      <div className={styles.container}>
        <h1>{t('title')}</h1>
        <div className={styles.content}>
          <div className={styles.form}>
            <form onSubmit={handleSubmit}>
              <section className={styles.section}>
                <h2>{t('shippingInfo')}</h2>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder={t('fullName')}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t('phone')}
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder={t('email')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder={t('address')}
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <div className={styles.formRow}>
                  <input
                    type="text"
                    name="city"
                    placeholder={t('city')}
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="region"
                    placeholder={t('region')}
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <input
                  type="text"
                  name="zipCode"
                  placeholder={t('zipCode')}
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
                <textarea
                  name="notes"
                  placeholder={t('notes')}
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                />
              </section>

              <section className={styles.section}>
                <h2>{t('paymentMethod')}</h2>
                <PaymentMethodSelector
                  selected={paymentMethod}
                  onChange={setPaymentMethod}
                />
              </section>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? t('loading') : t('placeOrder')}
              </button>
            </form>
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryHeader}>
              <h2>{t('orderReview')}</h2>
            </div>
            <div className={styles.items}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.item}>
                  <span>{item.name}</span>
                  <span className={styles.qty}>x{item.quantity}</span>
                  <span>{(item.price * item.quantity).toLocaleString()} UZS</span>
                </div>
              ))}
            </div>
            <div className={styles.divider} />
            <div className={styles.line}>
              <span>Subtotal:</span>
              <span>{subtotal.toLocaleString()} UZS</span>
            </div>
            <div className={styles.line}>
              <span>{t('shipping')}:</span>
              <span>{shipping.toLocaleString()} UZS</span>
            </div>
            <div className={styles.line}>
              <span>{t('tax')}:</span>
              <span>{tax.toLocaleString()} UZS</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.total}>
              <span>{t('total')}:</span>
              <span>{total.toLocaleString()} UZS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
