import { bookService } from '../book-service/book.service.js';
import { googleService } from '../book-service/google.service.js';
import bookList from '../book-cmps/book-list.cmp.js';
import bookDetails from '../book-pages/book-details.cmp.js';
import bookAdd from '../book-cmps/book-add.cmp.js';



export default {
    template: `
        <section class="book-app">
        <book-add @searchBooks="search" @addBook="add" :books="booksToSearch"></book-add>
        <book-details v-if="selectedBook" :book="selectedBook" @close="selectedBook = null" />
        <book-list v-else :books="booksToShow" @selected="selectBook" />

        </section>
    `,

    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null,
            booksToSearch: null
        }
    },

    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },


        selectBook(book) {
            this.selectedBook = book;
        },

        search(searchTerm) {
            googleService.getBooks(searchTerm)
                .then(books => {
                    this.booksToSearch = books;
                    console.log('booksToSearch', this.booksToSearch)
                });
        },
        add(googleBook) {
            console.log('google book ', googleBook);
        }

    },

    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const searchStr = this.filterBy.toLowerCase()
            const booksToShow = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr)
            })
            return booksToShow;
        }
    },
    created() {
        bookService.query().then(books => this.books = books);
    },

    components: {
        // bookFilter,
        bookList,
        bookDetails,
        bookAdd
    }
}