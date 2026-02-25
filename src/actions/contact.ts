'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

export interface ContactState {
    status: 'idle' | 'success' | 'error';
    message: string;
    errors?: Record<string, string>;
}

export async function submitContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const marketingOptIn = formData.get('lgpd') === 'on';

    const errors: Record<string, string> = {};

    if (!name || name.trim().length === 0) {
        errors.name = 'Nome é obrigatório';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'E-mail inválido';
    }

    if (!formData.get('lgpd')) {
        errors.lgpd = 'Você precisa aceitar os termos';
    }

    if (Object.keys(errors).length > 0) {
        return {
            status: 'error',
            message: 'Verifique os erros no formulário.',
            errors
        };
    }

    if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase credentials missing.');
        return {
            status: 'error',
            message: 'Erro interno no servidor de banco de dados.'
        };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        const { error } = await supabase
            .from('leads')
            .insert([
                {
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone ? phone.trim() : null,
                    message: message ? message.trim() : null,
                    marketing_opt_in: marketingOptIn
                }
            ]);

        if (error) {
            console.error('Supabase Insert Error:', error);
            return {
                status: 'error',
                message: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.'
            };
        }

        return {
            status: 'success',
            message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.'
        };
    } catch (err) {
        console.error('Unexpected error submitting form:', err);
        return {
            status: 'error',
            message: 'Ocorreu um erro inesperado.'
        };
    }
}
