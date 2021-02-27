import emailPreview from '../email-cmps/email-preview.cmp.js'
import emailCompose from '../email-cmps/email-compose.cmp.js'
import { emailService } from '../email-service/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <section class="main-list-container">
        <div class="btns-container-top">
          <button @click="filter(filterByRead)">{{(filterByRead) ? "By read" : "By unread"}}</button>
          <button @click="refreshDisplay">View All Emails</button>
        </div>
     <ul class="email-list">
        <li v-if="emails" v-for="email in emails" :key="email.id" class="email-preview-container" :class="{'read': email.status.isRead, 'unread': !email.status.isRead}">
            <router-link :to="'/email/'+email.folder+'/' +email.id"><email-preview :email="email" /></router-link>
            <div class="btns-container-bottom">
                <div class="remove-email" @click="removeEmail(email.id)">🗑</div>
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
                .catch(err => console.log('Error in removing email', err));
        },
        emailsToShow(searchBy) {
            if (!searchBy || searchBy === '') this.refreshDisplay();
            const searchStr = searchBy.toLowerCase();
            const emailsToShow = emailService.searchByContent(this.emails, searchStr);
            this.emails = emailsToShow;
        },
        refreshDisplay() {
            emailService.query()
                .then(emails => {
                    this.emails = emails;
                //    if (this.folder !== 'inbox') this.$router.replace('/email/inbox');
                });
        },

        filter(filterByRead) {
            emailService.query()       // didn't work with refreshDisplay
                .then(emails => {
                    this.emails = emails;
                    const filteredEmails = emailService.filterBykey(emails, filterByRead);
                    this.filterByRead = !this.filterByRead;
                    this.emails = filteredEmails;
                })
                .catch(err => console.log('Error in filtering emails', err));
        },
        newEmail() {
            this.emptyEmail = emailService.getEmptyEmail()
        },
        sendAnEmail(email) {
            emailService.sendEmail(email)
                .then(email => console.log('email sent:', email))
                .catch(err => console.log('Error in sending email', err));
        },
        showByFolder(folder) {
            console.log('folder:', folder);
            emailService.query()      
            .then(emails => {
                this.emails = emails;
                const filteredEmails = emailService.filterBykey(emails, folder);
                this.emails = filteredEmails;
            })
            .catch(err => console.log('Error in filtering emails', err));
        }

    },
    components: {
        emailPreview,
        emailCompose
    },
    created() {
        const folder = this.$route.params.folder;               

        this.refreshDisplay();
        eventBus.$on('searchKeyPassed', this.emailsToShow);
        eventBus.$on('changeFolder', this.showByFolder);
        eventBus.$on('sending', this.newEmail);
    },
    destroyed() {
        eventBus.$off('searchKeyPassed', this.emailsToShow);
        eventBus.$off('changeFolder', this.showByFolder);
        eventBus.$off('sending', this.newEmail);
    },
}

