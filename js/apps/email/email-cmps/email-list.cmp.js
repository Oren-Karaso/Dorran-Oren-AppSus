import emailPreview from './email-preview.cmp.js'
import { emailService } from '../email-service/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <section class="main-list-container">
     <button @click="filter(emails, filterByRead)">{{(filterByRead) ? "read" : "unread"}}</button>
     <ul class="email-list">
        <li v-if="emails" v-for="email in emails" :key="email.id" class="email-preview-container" >
            <email-preview :email="email" @click.native="logId(email.id)" />
            <div class="btns-container">
                <button @click="removeEmail(email.id)">🗑</button>
                <router-link :to="'/email/:folder/' +email.id"><button>Details</button></router-link>
            </div>
        </li>
     </ul>
    </section>
    `,
    data() {
        return {
            emails: null,
            filterByRead: true,
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

        logId(emailId) {
            console.log('Id is', emailId);
        },

        filter(emails, filterByRead) {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                    const filteredEmails = emailService.filterByReadUnRead(emails, filterByRead);
                    this.filterByRead = !this.filterByRead;
                    this.emails = filteredEmails;
                });
        }
    },
    components: {
        emailPreview
    },
    created() {
        this.refreshDisplay();
        eventBus.$on('filtered', this.emailsToShow);
    },
    destroyed() {
        eventBus.$off('filtered', this.emailsToShow);
    }
}

