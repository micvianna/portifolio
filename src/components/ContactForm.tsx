'use client';

import { useActionState, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { submitContact, ContactState } from '@/actions/contact';

const initialState: ContactState = {
    status: 'idle',
    message: ''
};

export function ContactForm() {
    const t = useTranslations('contact.form');
    const [state, formAction, isPending] = useActionState(submitContact, initialState);
    const [phone, setPhone] = useState<string>();

    useEffect(() => {
        if (state.status === 'success') {
            const form = document.getElementById('contact-form') as HTMLFormElement;
            if (form) form.reset();
            setTimeout(() => {
                setPhone(undefined);
            }, 0);
        }
    }, [state.status]);

    return (
        <form id="contact-form" action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder={t('name')}
                        required
                        style={{
                            background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)',
                            padding: '0.75rem 1rem', borderRadius: '0.5rem', width: '100%', fontFamily: 'var(--font-body)', outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                    />
                    {state.errors?.name && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{state.errors.name}</span>}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input
                        type="email"
                        name="email"
                        placeholder={t('email')}
                        required
                        style={{
                            background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)',
                            padding: '0.75rem 1rem', borderRadius: '0.5rem', width: '100%', fontFamily: 'var(--font-body)', outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                    />
                    {state.errors?.email && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{state.errors.email}</span>}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <style>{`
                    .custom-phone-input {
                        background: var(--bg-secondary);
                        border: 1px solid var(--border-subtle);
                        border-radius: 0.5rem;
                        padding: 0.75rem 1rem;
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        transition: border-color 0.2s;
                    }
                    .custom-phone-input:focus-within {
                        border-color: var(--accent-cyan);
                    }
                    .custom-phone-input input {
                        background: transparent;
                        border: none;
                        color: var(--text-primary);
                        font-family: var(--font-body);
                        outline: none;
                        width: 100%;
                    }
                    .PhoneInputCountry {
                        --PhoneInputCountryFlag-borderColor: var(--border-subtle);
                        --PhoneInputCountrySelectArrow-color: var(--text-muted);
                    }
                    .PhoneInputCountrySelect {
                        background-color: var(--bg-secondary);
                        color: var(--text-primary);
                    }
                    .PhoneInputCountrySelect option {
                        background-color: var(--bg-secondary);
                        color: var(--text-primary);
                    }
                `}</style>
                <PhoneInput
                    defaultCountry="BR"
                    placeholder={t('phone')}
                    value={phone}
                    onChange={setPhone}
                    className="custom-phone-input"
                />
                <input type="hidden" name="phone" value={phone || ''} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <textarea
                    name="message"
                    placeholder={t('message')}
                    rows={4}
                    required
                    style={{
                        background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)',
                        padding: '0.75rem 1rem', borderRadius: '0.5rem', width: '100%', fontFamily: 'var(--font-body)', resize: 'vertical', outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginTop: '0.5rem' }}>
                <input
                    type="checkbox"
                    id="lgpd"
                    name="lgpd"
                    defaultChecked
                    style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer', marginTop: '0.125rem' }}
                />
                <label htmlFor="lgpd" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer', lineHeight: '1.4' }}>
                    {t('lgpd')}
                </label>
            </div>
            {state.errors?.lgpd && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{state.errors.lgpd}</span>}

            {state.message && (
                <div style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginTop: '0.5rem',
                    background: state.status === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: state.status === 'success' ? '#4ade80' : '#f87171',
                    border: `1px solid ${state.status === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                }}>
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                style={{
                    background: 'var(--gradient-accent)', color: '#fff', border: 'none', padding: '0.75rem 2rem',
                    borderRadius: '0.5rem', fontWeight: 600, cursor: isPending ? 'not-allowed' : 'pointer', alignSelf: 'flex-start',
                    transition: 'transform 0.2s, box-shadow 0.2s', opacity: isPending ? 0.7 : 1, marginTop: '1rem'
                }}
                onMouseOver={(e) => !isPending && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
                {isPending ? t('sending') : t('send')}
            </button>
        </form>
    );
}
