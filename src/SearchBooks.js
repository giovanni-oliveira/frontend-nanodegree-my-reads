import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBooks: []
    };

    this.myBooks = [];
  }

  async componentDidMount() {
    this.myBooks = await BooksAPI.getAll();
  }

  async searchBooks({target: searchInput}) { 
    const query = searchInput.value.trim();  

    const addBook = result => {
      const searchBooks = Array.isArray(result) ? result : [];
      const myBooks = this.myBooks;
      const myBooksLength = myBooks.length;

      const addShelf = searchBook => {
        for (let index = 0; index < myBooksLength; index++) {
          const myBook = myBooks[index];
          
          if(searchBook.id === myBook.id){
            searchBook.shelf = myBook.shelf;
            break;
          }
        }

        return searchBook;
      };

      return searchBooks.map(addShelf);
    }

    const searchBooks = query 
      ? await BooksAPI.search(query).then(addBook)
      : [];

      this.setState({ searchBooks });
  }

  render() {   
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onKeyUp={this.searchBooks.bind(this)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {
                this.state.searchBooks.map(book => (
                  <li key={book.id}> 
                    <Book {...book} />
                  </li>
                ))
              }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
