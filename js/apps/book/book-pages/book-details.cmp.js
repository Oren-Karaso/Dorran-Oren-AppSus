import { bookService } from "../book-service/book.service.js";


export default {
    template: `
    <section v-if="book" class="modal-container">
        <div class="screen"></div>
        <section class="book-details">
            <router-link active-class="active-link" to="/book" exact class="nav-link"><button @click="$emit('close')"><i class="fas fa-times"></i></button></router-link>
                <img class="book-img" v-bind:src="book.thumbnail"/>
                <h1>{{book.title}}</h1>
                <h4>{{book.subtitle}}</h4>
                <p v-for="author in book.authors" :author="author" class="authors">{{author}}, 
                <span class="published"> {{book.publishedDate}} <span class="age">{{bookAge}}</span> </span>
                <span class="language"> {{book.language}}</span>.
                </p>
                <p><span v-for="category in book.categories" :category="category" class="categories">{{category + ' '}}</span></p>
                <p class="description">{{book.description}}</p>
                <p v-bind:class="priceClass" class="price">{{priceToShow}} <span v-if="book.listPrice.isOnSale" class="sale">On <span>SALE!</span></span></p>
                
                <p class="pages">{{bookLength}}</p>
                <p class="review" @click="showReview">Add Review</p>
                <section v-if="addReview">

                    <form action="" class="review-form" @submit.prevent="addBookReview">
                        <input type="text" class="full-name" name="full-name" placeholder="Full Name" v-model="newReview.reader" >

                        <select name="rate" class="rate" v-model="newReview.rate" >
                            <option value="5">⭐⭐⭐⭐⭐</option>
                            <option value="4">⭐⭐⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="1">⭐</option>
                        </select>

                        <label for="read-time">Read at:</label>
                        <input type="date" id="read-time" name="read-time"
                            min="1900-01-01" max="2025-12-31" v-model="newReview.date">

                        <textarea placeholder="Free Text" v-model="newReview.freeText"></textarea>

                        <button>Submit</button>
                    </form>
                </section>

                <section v-if="book.reviews">
                    <div v-for="(review, idx) in book.reviews" class="reviews">
                        <p v-if="review.reader">Reader Name:  {{review.reader}}</p>
                        <p v-if="review.rate">Rate:  {{review.rate}}</p>
                        <p v-if="review.date">Reading Date:  {{review.date}}</p>
                        <p v-if="review.freeText">Review:  {{review.freeText}}</p>
                        <button @click="deleteReview(book.id, idx)" class="delete"><i class="fas fa-trash-alt"></i></button> 
                    </div>
                </section>
        </section>
    </section>
    `,
    data() {
        return {
            author: null,
            book: null,
            addReview: false,
            newReview: {
                reader: null,
                rate: null,
                date: null,
                freeText: null
            }
        }
    },
    methods: {
        showReview() {
            this.addReview = true;
        },

        addBookReview() {
            console.log('review: ', this.newReview);
            console.log('book: ', this.book);
            bookService.saveReview(this.newReview, this.book)
                .then(() => {
                    bookService.getById(this.book.id).then(book => this.book = book);
                });
        },
        deleteReview(bookId, idx) {
            bookService.removeReview(bookId, idx)
                .then(() => {
                    bookService.getById(bookId).then(book => this.book = book);
                });
            console.log('hi')
        },


    },
    computed: {
        priceToShow() {
            if (this.book.listPrice.currencyCode === 'USD') return `$ ${this.book.listPrice.amount}`;
            else if (this.book.listPrice.currencyCode === 'EUR') return `₤ ${this.book.listPrice.amount}`;
            else if (this.book.listPrice.currencyCode === 'ILS') return `${this.book.listPrice.amount} ₪`;
        },
        priceClass() {
            if (this.book.listPrice.amount > 150) { return { red: true } } else if (this.book.listPrice.amount < 20) {
                return { green: true }
            }
        },
        bookLength() {
            if (this.book.pageCount > 500) return '📕 Long Reading';
            else if (this.book.pageCount > 200) return '📘 Decent Reading';
            else if (this.book.pageCount < 100) return '📗 Light Reading';

        },
        bookAge() {
            let year = new Date().getFullYear();
            if (year - this.book.publishedDate > 10) return '⭐ Vetern Book!';
            else if (year - this.book.publishedDate <= 1) return '💡 New Book!'
        }

    },
    created() {
        const id = this.$route.params.bookId;
        bookService.getById(id)
            .then(book => this.book = book);
    },
    watch: {

    }


}