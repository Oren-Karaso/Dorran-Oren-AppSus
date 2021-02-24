import bookApp from './pages/book-pages/books-app.cmp.js';
import homePage from './pages/appsus.cmp.js';
import keepApp from './pages/keep-pages/keep-app.cmp.js';
import emailApp from './pages/email-pages/email-app.cmp.js';

const routes = [{
        path: '/',
        component: homePage,
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/email',
        component: emailApp
    }
]

export const myRouter = new VueRouter({ routes });