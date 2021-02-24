export default {
    props: ['book'],
    template: `
    <section class="book-preview">
        <p class="book-title">{{book.title}}</p>
        <p>{{priceToShow}}</p>
    </section>
    `,
    computed: {
        priceToShow() {
            // console.log(this.book.listPrice.currencyCode);
            if (this.book.listPrice.currencyCode === 'USD') return `$ ${this.book.listPrice.amount}`;
            else if (this.book.listPrice.currencyCode === 'EUR') return `₤ ${this.book.listPrice.amount}`;
            else if (this.book.listPrice.currencyCode === 'ILS') return `${this.book.listPrice.amount} ₪`;
        }
    }

}