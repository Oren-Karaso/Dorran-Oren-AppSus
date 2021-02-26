import emailPreview from '../email-cmps/email-preview.cmp.js'
import emailCompose from '../email-cmps/email-compose.cmp.js'
import { emailService } from '../email-service/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <section class="main-list-container">
     <button @click="newEmail" >+ Compose</button>
     <button @click="filter(emails, filterByRead)">{{(filterByRead) ? "By read" : "By unread"}}</button>
     <button @click="refreshDisplay">View All Emails</button>
     <ul class="email-list">
        <li v-if="emails" v-for="email in emails" :key="email.id" class="email-preview-container" >
            <email-preview :email="email" />
            <div class="btns-container">
                <button @click="removeEmail(email.id)">🗑</button>
                <router-link :to="'/email/:folder/' +email.id"><button>Open</button></router-link>
            </div>
        </li>
     </ul>
     <email-compose v-if="emptyEmail" @saved="sendAnEmail" :emptyEmail="emptyEmail" />
    </section>
    `,
    data() {
        return {
            emails: null,
            filterByRead: true,
            emptyEmail: null
        }
    },
    methods: {
        removeEmail(emailId) {
            emailService.removeEmail(emailId)
                .then(() => {
                    emailService.query()
                        .then(emails => this.emails = emails);
                    console.log('email has been removed');
                })
                .catch(err => console.log('Error in removing email'));
        },
        emailsToShow(filterBy) {
            if (!filterBy || filterBy === '') this.refreshDisplay();
            const searchStr = filterBy.toLowerCase();
            const emailsToShow = emailService.searchByContent(this.emails, searchStr);
            this.emails = emailsToShow;
        },
        refreshDisplay() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                });
        },

        filter(emails, filterByRead) {
            emailService.query()       // didn't work with refreshDisplay
                .then(emails => {
                    this.emails = emails;
                    const filteredEmails = emailService.filterByReadUnRead(emails, filterByRead);
                    this.filterByRead = !this.filterByRead;
                    this.emails = filteredEmails;
                })
                .catch(err => console.log('Error in filtering emails'));
        },
        newEmail() {
            this.emptyEmail = emailService.getEmptyEmail()
        },
        sendAnEmail(email) {
            emailService.sendEmail(email)
                .then(email => console.log('email sent:', email))
                .catch(err => console.log('Error in sending email'));
        }
    },
    components: {
        emailPreview,
        emailCompose
    },
    created() {
        this.refreshDisplay();
        eventBus.$on('filtered', this.emailsToShow);
    },
    destroyed() {
        eventBus.$off('filtered', this.emailsToShow);
    }
}
