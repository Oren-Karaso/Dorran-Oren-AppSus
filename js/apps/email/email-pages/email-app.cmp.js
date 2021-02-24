import { emailService } from '../email-service/email.service.js'
import emailFilter from '../email-cmps/email-filter.cmp.js'
import emailList from '../email-cmps/email-list.cmp.js'
import emailDetails from '../email-pages/email-details.cmp.js'


export default {
    template: `
        <section class="email-app">
          <email-filter @filtered="setFilter" /> 
          <router-view />
          <!-- <email-details @selected="selectEmail" v-if="selectedEmail" />  -->
          <!-- <email-list v-else :emails="emailsToShow" /> -->
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
        removeEmail(emailId) {
            emailService.removeEmail(emailId)
                .then(() => {
                    emailService.query()
                        .then(emails => this.emails = emails);
                })
        },
        selectEmail(email) {
            console.log('pook:', email);
            this.selectedEmail = email;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails;
            const searchStr = this.filterBy.byTitle.toLowerCase();
            const emailsToShow = this.emails.filter(email => {
                return email.title.toLowerCase().includes(searchStr);
            })
            return emailsToShow;
        }

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
        emailList,
        emailDetails
    }
}