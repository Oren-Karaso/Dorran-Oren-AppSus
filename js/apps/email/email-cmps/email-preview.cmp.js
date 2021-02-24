export default {
    props: ['email'],
    template: `
    <section class="email-preview">
        <p class="subject">Subject: {{email.content.subject}}</p>
        <p class ="from">From: {{email.content.from}}</p>
        <!-- <img :src="book.thumbnail"> -->
        
    </section>
    `,
    computed: {
        // priceToShow() {
        //     if (this.book.listPrice.currencyCode === 'EUR') return ('€' + this.book.listPrice.amount);
        //     if (this.book.listPrice.currencyCode === 'USD') return ( '$' + this.book.listPrice.amount);
        //     else return ( '₪' + this.book.listPrice.amount); 
    },
}

