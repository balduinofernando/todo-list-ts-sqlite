import { setLocale } from 'yup';

setLocale({
    mixed: {
        default: 'O campo ${path} é inválido',
        required: 'O campo ${path} é obrigatório',
        oneOf: 'O campo ${path} deve ter um dos seguintes valores: ${values}',
        notOneOf: 'O campo ${path} não deve ter nenhum dos seguintes valores: ${values}',
        notType: 'O Formato digitado não é válido',
        defined: 'O campo ${path} não deve ser indefinido',
    },
    string: {
        length: ({ path, length }: any) => `O campo ${path} deve ter exatamente ${length} ${length === 1 ? 'caractere' : 'caracteres'}`,
        min: ({ path, min }: any) => `O campo ${path} deve ter pelo menos ${min} ${min === 1 ? 'caractere' : 'caracteres'}`,
        max: ({ path, max }: any) => `O campo ${path} deve ter no máximo ${max} ${max === 1 ? 'caractere' : 'caracteres'}`,
        matches: 'O campo ${path} deve corresponder ao padrão: "${regex}"',
        email: 'O campo ${path} deve ser um e-mail válido',
        url: 'O campo ${path} deve ser uma URL válida',
        trim: 'O campo ${path} não deve conter espaços adicionais no início nem no fim',
        lowercase: 'O campo ${path} deve estar em letras minúsculas',
        uppercase: 'O campo ${path} deve estar em letras maiúsculas',
    },
    number: {
        min: 'O campo ${path} deve ser maior ou igual a ${min}',
        max: 'O campo ${path} deve menor ou igual a ${max}',
        lessThan: 'O campo ${path} deve ser menor que ${less}',
        moreThan: 'O campo ${path} deve ser maior que ${more}',
        positive: 'O campo ${path} deve ser um número positivo',
        negative: 'O campo ${path} deve ser um número negativo',
        integer: 'O campo ${path} deve ser um número inteiro',
    },
    date: {
        min: 'O campo ${path} deve ser posterior a ${min}',
        max: 'O campo ${path} deve ser anterior a ${max}',
    },
    boolean: {},
    object: {
        noUnknown: 'O campo ${path} tem chaves desconhecidas: ${unknown}',
    },
    array: {
        min: ({ path, min }: any) => `${path} deve ter pelo menos ${min} ${min === 1 ? 'item' : 'itens'}`,
        max: ({ path, max }: any) => `${path} deve ter no máximo ${max} ${max === 1 ? 'item' : 'itens'}`,
        length: ({ path, length }: any) => `${path} deve ter exatamente ${length} ${length === 1 ? 'caractere' : 'caracteres'}`,
    }

});