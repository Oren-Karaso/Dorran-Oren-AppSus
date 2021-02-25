import emailPreview from './email-preview.cmp.js'
import { emailService } from '../email-service/email.service.js'

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
            filterBy: null
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
    },
    logId(emailId) {
        console.log('Id is', emailId);
    },
    setFilter(filterBy) {
        this.filterBy = filterBy;
    },

    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails;
            const searchStr = this.filterBy.byTitle.toLowerCase();
            const emailsToShow = emailService.searchByContent(this.emails, searchStr);
            return emailsToShow;
        },

        components: {
            emailPreview
        },
        created() {
            return emailService.query()
                .then(emails => {
                    this.emails = emails
                    console.log('emails from list:', this.emails);
                })
        }
    }
}
