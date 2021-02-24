import { emailService } from '../email-service/email.service.js'
import emailFilter from '../email-cmps/email-filter.cmp.js'
import emailList from '../email-cmps/email-list.cmp.js'


export default {
    template: `
        <section class="email-app">
          <email-filter v-if="emails" @filtered="setFilter"/> 
          <email-list  v-if="emails" :emails="emailsToShow"></email-list> 
          <router-link to="">under construction</router-link>

        </section>
    `,
    data() {
        return {
            emails: null,
            selectedMail: null,
            filterBy: null
        }
    },
    methods: {
        removeBook(emailId) {
            emailService.remove(emailId)
                .then(() => {
                    emailService.query()
                        .then(emails => this.emails = emails);
                })
        },
        selectBook(email) {
            console.log('pook:', email);
            this.selectedMail = email;
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
            .then(emails => this.emails = emails);
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
    }
}