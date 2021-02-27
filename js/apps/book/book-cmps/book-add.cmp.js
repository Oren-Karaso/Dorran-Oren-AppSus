export default {
    props: ['books'],
    template: `
    <section class="book-add">
        <section class="search-nav">
            <h5 @click="showSearch">Search <br> & Add</h5>
            <input ref="searchInput" v-show="searching" type="search" @keydown.enter="onSearch" class="google-input" v-model="searchTerm" placeholder="Search"/>
        </section>
        <section v-if="showRes" class="search-results" >
            <div class="screen"></div>
            <div class="result" v-for="book in books">
                <p class="result-title">{{book.volumeInfo.title}} <span v-if="book.volumeInfo.authors">By:</span> <span v-for="author in book.volumeInfo.authors">{{author}}</span></p> 
                <button @click="addBook(book)" class="add-book"><i class="fas fa-plus"></i></button>
            </div>
        </section>
    </section>

    `,
    data() {
        return {
            searching: false,
            searchTerm: null,
            by: false,
            isFixed: true,
            showRes: false
        }
    },
    methods: {
        showSearch() {
            if (!this.searching) {
                this.searching = true;
                setTimeout(() => {
                    this.setFocus()
                }, 0)
            } else {
                this.searching = false;
            }

            if (this.showRes) {
                this.showRes = false;
            }
        },
        setFocus() {
            console.dir(this.$refs.searchInput)
            this.$refs.searchInput.focus();
        },
        onSearch() {
            this.$emit('searchBooks', this.searchTerm);
            setTimeout(() => { this.showRes = true; }, 0);

        },
        addBook(googleBook) {
            this.$emit('addBook', googleBook);

        }


    },
    created() {

    },
    mounted() {
        // this.setFocus();

    }

}