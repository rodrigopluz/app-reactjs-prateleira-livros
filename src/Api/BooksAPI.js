const api = "https://reactnd-books-api.udacity.com"

// gera um token exclusivo para armazenar os dados da estante no servidor back-end.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

// mostra o livro selecionado
export const get = (bookId) =>
    fetch(`${ api }/books/${ bookId }`, { headers })
        .then(res => res.json())
        .then(data => data.book);

// lista todos os livros
export const getAll = () =>
    fetch(`${ api }/books`, { headers })
        .then(res => res.json())
        .then(data => data.books);

// faz o update da alteracao da estante.
export const update = (book, shelf) =>
    fetch(`${ api }/books/${ book.id }`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({shelf})
    }).then(res => res.json());

// forma a busca pelo livro desejado na api.
export const search = (query) =>
    fetch(`${ api }/search`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    }).then(res => res.json())
        .then(data => data.books);
