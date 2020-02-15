import React, { Component } from 'react';
import { Link } from "react-router-dom";

class BookView extends Component {
    render() {
        let book = this.props.book;

        const date = new Date(book.publishedDate);
        const imagem = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAF3AQMAAAC2e8TMAAAABlBMVEXMzMyWlpYU2uzLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVRoge3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAApwYwVwABN271wQAAAABJRU5ErkJggg==";

        return (
            <React.Fragment>
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
                        <div className="book-card-txt">
                            <p>{ book.description }</p>
                            <p>&nbsp;</p>
                            <Link className="ui icon right labeled button" to={`/book/edit/${ book.id }`}><i className="edit icon"></i> Editar</Link>
                            <p>&nbsp;</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BookView;