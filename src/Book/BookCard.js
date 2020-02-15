import React, { Component } from 'react';
import { Link } from "react-router-dom";

// CONSTANTS
const none = "nome";
const read = "read";
const want_to_read = "wantToRead";
const currently_reading = "currentlyReading";

const title = {
    read: 'Para Ler',
    want_to_read: 'Desejo Ler',
    currently_reading: 'Lendo atualmente'
};

class BookCard extends Component {
    static defaultProps  = {
        book: {},
        shelfbooks: [],
        onChangeShelfBook: () => {
        }
    };

    render() {
        let book = this.props.book;

        const { onChangeShelfBook, shelfbooks } = this.props;

        if (shelfbooks) {
            const shelfBook = shelfbooks.filter(shelfBook => shelfBook.id === book.id);
            book = shelfBook[0] ? shelfBook[0] : book;
        }

        const date = new Date(book.publishedDate);
        const imagem = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAF3AQMAAAC2e8TMAAAABlBMVEXMzMyWlpYU2uzLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVRoge3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAApwYwVwABN271wQAAAABJRU5ErkJggg==";

        const description = book.description.slice(0, 100);

        return (
            <div className="book-wrapper" key={ book.id }>
                <div className="book-card">
                    <div className="poster-wrapper">
                        <img className="poster" src={ imagem } alt={ book.title } style={{ opacity: 1 }} />
                        <div className="colored-shadow" style={{ backgroundImage: 'url(' + imagem + ')' }} />
                    </div>
                    <div className="info-wrapper">
                        <div className="title"><h4>{ book.title }</h4></div>
                        <div className="genres">
                            { book.authors && (
                                <div>
                                    <div className="ui small label">
                                        <i className="user icon"/>
                                        { book.authors.map(author => author) }
                                    </div>
                                    <div className="ui small label">{ date.getFullYear() }</div>
                                    <div className="ui small label">lang: { book.language }</div>
                                    <div className="ui small label">Pg: { book.pageCount }</div>
                                    { book.categories && book.categories.map((category, index) => (
                                        <div className="ui small label" key={ index }>{ category }</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="want-to-read-wrapper">
                        <Link to="/search"><i className="zoom-in icon heart"></i></Link>
                        
                        <a key={ book.id }>
                            <i className={"heart icon icon-want-to-read " + (book.shelf === want_to_read ? "active" : "")} onClick={ () => onChangeShelfBook(book, want_to_read) } />
                        </a>
                        <a>
                            <i className="heart icon trash alternate outline" onClick={() => onChangeShelfBook(book, none)} />
                        </a>
                        <Link className="heart icon right labeled button" to={`/book/edit/${ book.id }`}><i className="edit icon"></i></Link>
                    </div>
                    <div className="book-card-txt">
                        <p>{ description }...</p>
                        <Link className="ui icon left labeled button" to={`/book/view/${ book.id }`}><i className="eye icon"></i> Leia mais</Link>
                    </div>
                    <div className="actions-bar">
                        <div className="ui buttons">
                            <button className={"ui button " + (book.shelf === currently_reading ? "disabled" : "")} onClick={ () => onChangeShelfBook(book, currently_reading) }>{ title.currently_reading }</button>
                            <button className={"ui button " + (book.shelf === want_to_read ? "disabled" : "")} onClick={ () => onChangeShelfBook(book, want_to_read) }>{ title.want_to_read }</button>
                            <button className={"ui button " + (book.shelf === read ? "disabled" : "")} onClick={ () => onChangeShelfBook(book, read) }>{ title.read }</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookCard;