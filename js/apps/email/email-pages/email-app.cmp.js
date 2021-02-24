import { emailService } from '../email-service/email.service.js'
import emailFilter from '../email-cmps/email-filter.cmp.js'
import emailList from '../email-cmps/email-list.cmp.js'


export default {
    template: `
        <section class="email-app">
          <book-filter @filtered="setFilter"/> 
          <book-list :books="booksToShow" @selected="selectBook" @remove="removeBook"></book-list> 
          <router-link to="/book/edit">Add a new book!</router-link>

        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null
        }
    },
    methods: {
        removeBook(bookId) {
            emailService.remove(bookId)
                .then(() => {
                    emailService.query()
                        .then(books => this.books = books);
                })
            // this.booksToShow();
        },
        selectBook(book) {
            console.log('pook:', book);
            this.selectedBook = book;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const searchStr = this.filterBy.byTitle.toLowerCase();
            const booksToShow = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr);
            })
            return booksToShow;
        }

    },
    created() {
        this.books = bookService.query()
            .then(books => this.books = books);
    },
    // watch: {
    //     '$route.params.bookId'(id) {
    //         console.log('Changed to', id);
    //         this.booksToShow();
    //     }
    // },
    components: {
        emailFilter,
        emailList,
    }
}