import z from 'zod';

export const bookSchema = z
    .object({
        title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
        author: z.string().min(1, 'Autor é obrigatório').max(100, 'Nome do autor muito longo'),
        publicationYear: z
            .number({ message: 'Ano deve ser um número' })
            .int('Ano deve ser um número inteiro')
            .min(1000, 'Ano inválido')
            .max(new Date().getFullYear(), 'Ano inválido'),
        gender: z.string().min(1, 'Gênero é obrigatório').max(50, 'Gênero muito longo'),
        qttEstoque: z
            .number({ message: 'Quantidade deve ser um número' })
            .int('Deve ser um número inteiro')
            .min(0, 'Quantidade não pode ser negativa'),
        qttAlugados: z
            .number({ message: 'Quantidade deve ser um número' })
            .int('Deve ser um número inteiro')
            .min(0, 'Quantidade não pode ser negativa'),
        sobre: z
            .string()
            .min(10, 'Descrição deve ter pelo menos 10 caracteres')
            .max(1000, 'Descrição muito longa'),
        rented: z.boolean(),
    })
    .refine((data) => data.qttAlugados <= data.qttEstoque, {
        message: 'Quantidade alugada não pode ser maior que o estoque',
        path: ['qttAlugados'],
    });

export type BookFormData = z.infer<typeof bookSchema>;
