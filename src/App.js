import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import logo from "./logo.png";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import * as BooksAPI from "./Api/BooksAPI";

import Shelf from "./Shelf";
import Search from "./Search";

const view = "view";
const edit = "edit";
const read = "read";
const search = "search";
const want_to_read = "wantToRead";
const currently_reading = "currentlyReading";

const title = {
	search: "Busca",
	read: "Para Ler",
	want_to_read: "Desejo Ler",
	currently_reading: "Lendo atualmente",
};

class App extends Component {
	notify = (msg) =>
		toast.success(msg, {
			position: "top-center",
		});

	state = {
		books: [],
		loading: true,
	};

	componentDidMount() {
		this.getAllBooks();
	}

	getBookView = () => {
		this.setState({ loading: true });
		BooksAPI.get().then((book) => {
			this.setState({ book });
		});
	};

	getAllBooks = () => {
		this.setState({ loading: true });

		BooksAPI.getAll().then((books) => {
			this.setState({ loading: false, books });
		});
	};

	changeShelfBook = (book, shelf) => {
		if (book.shelf === shelf) return false;

		BooksAPI.update(book, shelf);

		// this.notify('Book update with success');
		let books = this.state.books;
		book.shelf = shelf;

		const existBook = books.filter((b) => b.id === book.id);

		if (existBook.length === 0) books.push(book);

		books.filter((b) => b.id === book.id).concat([book]);

		this.setState({ books: books });
	};

	render() {
		const { books, loading } = this.state;

		return (
			<div>
				<ToastContainer />
				<div className="app-container">
					<div className="side-menu">
						<div className="profile-section">
							<a className="logo-wrapper" href="/">
								<i className="book "></i>
								<img src={logo} className="logo" alt="Prateleira de Livros" />
								<h2>Livros</h2>
							</a>
						</div>
						<ul className="menu-list">
							<NavLink
								exact={true}
								to="/"
								activeClassName={"active"}
								className={"menu-item"}
							>
								<i className="eye icon" />
								{title.currently_reading}
							</NavLink>
							<NavLink to="/want-to-read" className="menu-item">
								<i className="heart icon" />
								{title.want_to_read}
							</NavLink>
							<NavLink to="/read" className="menu-item">
								<i className="archive icon" />
								{title.read}
							</NavLink>
							<NavLink to="/search" className="menu-item">
								<i className="search icon" />
								{title.search}
							</NavLink>
						</ul>
					</div>

					<div className="feed-container">
						<div>
							<Route
								exact
								path="/"
								render={() => (
									<Shelf
										onChangeShelfBook={this.changeShelfBook}
										books={books}
										loading={loading}
										shelf={currently_reading}
									/>
								)}
							/>
							<Route
								exact
								path="/want-to-read"
								render={() => (
									<Shelf
										onChangeShelfBook={this.changeShelfBook}
										books={books}
										loading={loading}
										shelf={want_to_read}
									/>
								)}
							/>
							<Route
								exact
								path="/read"
								render={() => (
									<Shelf
										onChangeShelfBook={this.changeShelfBook}
										books={books}
										loading={loading}
										shelf={read}
									/>
								)}
							/>
							<Route
								exact
								path="/search"
								render={() => (
									<Search
										shelfbooks={books}
										onChangeShelfBook={this.changeShelfBook}
										search={search}
									/>
								)}
							/>
							<Route
								path="/book/view/:id"
								render={({ match }) => (
									<Shelf
										onChangeShelfBook={this.getBookView}
										books={books}
										loading={loading}
										id={match.params.id}
										view={view}
									/>
								)}
							/>
							<Route
								path="/book/edit/:id"
								render={({ match }) => (
									<Shelf
										onChangeShelfBook={this.changeShelfBook}
										books={books}
										loading={loading}
										id={match.params.id}
										edit={edit}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
