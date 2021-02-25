import bookApp from './apps/book/book-pages/book-app.cmp.js';
import homePage from './pages/appsus.cmp.js';
import keepApp from './apps/keep/keep-pages/keep-app.cmp.js';
import emailApp from './apps/email/email-pages/email-app.cmp.js';
import emailDetails from './apps/email/email-pages/email-details.cmp.js';
import emailList from './apps/email/email-cmps/email-list.cmp.js';

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
        name: 'bookApp',
        component: bookApp
    },
    {
        path: '/keep',
        name: 'keepApp',
        component: keepApp
    },
    {
        path: '/email',
        redirect: '/email/inbox',
        name: 'emailApp',
        component: emailApp,
        children: [{
                path: ':folder',
                name: 'emailList',
                component: emailList
            },
            {
                path: ':folder/:emailId',
                name: 'emailDetails',
                component: emailDetails
            }
        ]
    },


]

export const myRouter = new VueRouter({ routes });