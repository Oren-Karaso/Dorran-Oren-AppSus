import bookApp from './apps/book/book-pages/book-app.cmp.js';
import homePage from './pages/appsus.cmp.js';
import keepApp from './apps/keep/keep-pages/keep-app.cmp.js';
import emailApp from './apps/email/email-pages/email-app.cmp.js';
import emailDetails from './apps/email/email-pages/email-details.cmp.js';

const routes = [{
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
    {
        path: '/email/:folder/:emailId',
        component: emailDetails
    }

]

export const myRouter = new VueRouter({ routes });