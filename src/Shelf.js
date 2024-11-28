import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import BookCard from "./Book/BookCard";
import BookView from "./Book/BookView";
import BookEdit from "./Book/BookEdit";
import BookCardPlaceholder from "./Book/BookCardPlaceholder";

const currently_reading = "currentlyReading";

class Shelf extends Component {
	render() {
		const { books, loading, shelf, onChangeShelfBook, id, view, edit, search } = this.props;
		const filterBooks = books.filter((book) => book.shelf === shelf);

		const bookView = books.filter((book) => book.id === id);
		const bookEdit = books.filter((book) => book.id === id);

		return (
			<div className="books-container">
				{loading && (<BookCardPlaceholder size={1} />)}

				{!loading && (filterBooks.map(
					(book) => (
						<BookCard book={book} shelfbooks={[]} onChangeShelfBook={onChangeShelfBook} key={book.id} />
					)
				)
				)}

				{!loading && view && (bookView.map(
					(book) => (
						<BookView book={book} shelfbooks={[]} onChangeShelfBook={onChangeShelfBook} key={book.id} />
					)
				)
				)}

				{!loading && edit && (bookEdit.map(
					(book) => (
						<BookEdit book={book} shelfbooks={[]} onChangeShelfBook={onChangeShelfBook} key={book.id} />
					)
				)
				)}

				{search && (filterBooks.length === 0 && (
					<div className="ui floating message">
						<p>Nenhum livro selecionado! Vamos tentar uma nova <Link to="/search">Busca</Link></p>
					</div>
				))}

				<div className="clearfix"></div>
				{(shelf !== currently_reading && (
					<Link className="ui icon left labeled button" to="/"><i className="arrow left icon heart"></i> Voltar Home</Link>
				))}
			</div>
		);
	}
}

export default Shelf;