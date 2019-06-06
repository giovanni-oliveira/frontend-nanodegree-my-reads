import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class Book extends Component {
  constructor(props) {
    super(props);
  }

  async updateBook(id, shelf) {
    await BooksAPI.update(id, shelf);
    
    if(!this.props.updateShelf) return;

    this.props.updateShelf();
  }

  render() {
    const { shelf, id, title, authors = [], imageLinks: { thumbnail = '' } = {} } = this.props;
    
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${thumbnail}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={shelf || 'none'} 
              onChange={({ target }) => this.updateBook(id, target.value)}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(", ")}</div>
      </div>
    );
  }
}

export default Book;
