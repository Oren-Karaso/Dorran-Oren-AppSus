import { bookService } from './services/book.service.js'
import booksApp from './pages/books-app.cmp.js'
import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import { myRouter } from './routes.js'





const options = {
    el: '#app',
    router: myRouter,
    template: `
        <section>
        <user-msg />
        <app-header />
        <router-view />

        </section>
    `,
    components: {
        appHeader,
        userMsg,
        booksApp,
        bookService
    }
}

const app = new Vue(options);