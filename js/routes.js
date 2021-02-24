import bookApp from './apps/book/book-pages/book-app.cmp.js';
import homePage from './pages/appsus.cmp.js';
import keepApp from './pages/keep-pages/keep-app.cmp.js';
import emailApp from './pages/email-pages/email-app.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage,
    },
    // {
    //     path: '/about',
    //     component: ,
    // },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/email/:folder',
        component: emailApp
    },
    // {
    //     path: '/email/:folder/:emailId',
    //     component: emailDetails
    // }

]

export const myRouter = new VueRouter({ routes });