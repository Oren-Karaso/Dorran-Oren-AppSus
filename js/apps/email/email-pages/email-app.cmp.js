import { emailService } from '../email-service/email.service.js'
import emailFilter from '../email-cmps/email-filter.cmp.js'
import emailSideBar from '../email-cmps/email-sidebar.cmp.js'

export default {
    template: `
        <section class="email-app">
          <email-filter @filtered="setFilter" /> 
          <side-bar class="side-bar" />
          <router-view />
          <router-link to=""></router-link>

        </section>
    `,
    data() {
        return {
            emails: null,
            selectedEmail: null,
            filterBy: null
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails;
            const searchStr = this.filterBy.toLowerCase();
            const emailsToShow = emailService.searchByContent(this.emails, searchStr);
            return emailsToShow;
        },
    },

        created() {
            this.emails = emailService.query()
                .then(emails => {
                    this.emails = emails
                })
                .catch(err => {
                    console.log('error loading emails from emailApp:', err);
                });
        },
        // watch: {
        //     '$route.params.bookId'(id) {
        //         console.log('Changed to', id);
        //         this.booksToShow();
        //     }
        // },
        components: {
            emailFilter,
            emailSideBar
        }
    }
