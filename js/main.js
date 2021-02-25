import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import { myRouter } from './routes.js' //to adjust

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
    }
}

const app = new Vue(options);