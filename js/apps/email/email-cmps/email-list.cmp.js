import emailPreview from './email-preview.cmp.js'
import { emailService } from '../email-service/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <ul class="email-list">
        <li v-if="emails" v-for="email in emails" :key="email.id" class="email-preview-container" >
            <email-preview :email="email" @click.native="logId(email.id)" />
            <div class="btns-container">
                <button @click="removeEmail(email.id)">🗑</button>
                <router-link :to="'/email/:folder/' +email.id"><button>Details</button></router-link>
            </div>
        </li>
    </ul>
    `,
    data() {
        return {
            emails: null,
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
                    // console.log('emails from list:', this.emails);
                });
        },

        logId(emailId) {
            console.log('Id is', emailId);
        },
    },
    components: {
        emailPreview
    },
    created() {
        this.refreshDisplay();
        eventBus.$on('filtered', this.emailsToShow);
    },
    distroyed() {
        eventBus.$off('filtered', this.emailsToShow);
    }
}

