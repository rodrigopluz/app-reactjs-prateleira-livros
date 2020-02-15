import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

// api
// import * as BooksAPI from '../Api/BooksAPI';

const options = [
    { text: 'Para Ler', value: 'read' },
    { text: 'Desejo Ler', value: 'wantToRead' },
    { text: 'Lendo atualmente', value: 'currentlyReading' },
];

class BookEdit extends Component {
    static defaultProps  = {
        book: {},
        shelfbooks: [],
    };

    handleChange = (e, { value }) => {
        this.setState({ value });
        // BooksAPI.update(value, shelf);
    }
    
    render() {
        let book = this.props.book;

        const { shelfbooks } = this.props;

        if (shelfbooks) {
            const shelfBook = shelfbooks.filter(shelfBook => shelfBook.id === book.id);
            book = shelfBook[0] ? shelfBook[0] : book;
        }

        return (
            <React.Fragment>
                <div className="book-wrapper" key={ book.id }>
                    <div className="book-card">
                        <p>&nbsp;</p>
                        <Form className="book-card-txt">
                            <p>Editar Livro - { book.title }</p>
                            <Form.Group widths='equal'>
                                <Form.Input 
                                    fluid 
                                    value={ book.title } 
                                    label='Titulo do Livro' 
                                    placeholder='Titulo do Livro'
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Select
                                    fluid
                                    label='Categoria'
                                    options={ options }
                                    placeholder='Categoria'
                                    defaultValue={ book.shelf }
                                />
                            </Form.Group>
                            <Form.TextArea 
                                placeholder='...' 
                                label='Descrição' 
                                value={ book.description } 
                            />
                            <Form.Button>Salvar</Form.Button>
                        </Form>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BookEdit;