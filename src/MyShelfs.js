import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class MyShelfs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };

    this.myBooks = [];
  }

  async mountShelfs() {
    const myBooks = await BooksAPI.getAll(); 
    const addBook = (shelfs, book) => {
      const shelf = shelfs[book.shelf];
      if(shelf) {
        shelf.push(book);
      }

      return shelfs
    }

    const myShelfs = myBooks.reduce(addBook, {
      currentlyReading: [],
      wantToRead: [],
      read: []
    });

    this.setState(myShelfs);
  }

  async componentDidMount() {
    await this.mountShelfs();
  }

  setShelf([books, title]) {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                {" "}
                <Book updateShelf={() => this.mountShelfs()} {...book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  render() {
    const shelfs = [
      [this.state.currentlyReading, 'Currently Reading'],
      [this.state.wantToRead, 'Want To Read'],
      [this.state.read, 'Read']
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelfs.map((shelf, index) => (
            <div key={index}>{this.setShelf(shelf)}</div>
          ))}
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MyShelfs;
