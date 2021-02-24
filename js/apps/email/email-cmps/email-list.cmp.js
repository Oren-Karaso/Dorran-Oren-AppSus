import emailPreview from './email-preview.cmp.js'

export default {
    props: ['books'],
    template: `
    <ul class="book-list">
        <li v-for="book in books" :key="book.id" class="book-preview-container" >
            <book-preview :book="book" @click.native="logId(book.id)" />
            <div class="btns-container">
                <button @click="remove(book.id)">🗑</button>
                <router-link tag="button" :to="'/book/'+book.id" >Details</router-link>
            </div>
        </li>
    </ul>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)
        },
        select(book) {
            console.log('book:', book.id + ' is selected')
            this.$emit('selected', book)
        },
        logId(bookId) {
            console.log('Id is', bookId);
        }
    },
    components:{
        emailPreview
    }
}
