import React, { Component } from 'react';

class BookCardPlaceholder extends Component {
	render() {
		const { size } = this.props;
		let placeholders = [];
		for (let i = 1; i <= size; i++) {
			placeholders.push({ key: i });
		}

		return (
			<React.Fragment>
				{placeholders.map(placeholder => (
					<div className="book-wrapper loading blink" key={placeholder.key}>
						<div className="book-card">
							<div className="poster-wrapper">
								<img className="poster"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAF3AQMAAAC2e8TMAAAABlBMVEXMzMyWlpYU2uzLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVRoge3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAApwYwVwABN271wQAAAABJRU5ErkJggg=="
									alt="placeholder" />
							</div>
							<div className="info-wrapper">
								<div className="loading-block" />
								<div className="loading-block small" />
							</div>
							<div className="actions-bar">
								<div className="ui rating" data-rating="3" data-max-rating="5" />
							</div>
						</div>
					</div>
				))}
			</React.Fragment>
		);
	}
}

export default BookCardPlaceholder;