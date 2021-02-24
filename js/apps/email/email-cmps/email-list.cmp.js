import emailPreview from './email-preview.cmp.js'
import { emailService } from '../email-service/email.service.js'

export default {
    template: `
    <ul class="email-list">
        <li v-for="email in emails" :key="email.id" class="email-preview-container" >
            <email-preview :email="email" @click.native="logId(email.id)" />
            <div class="btns-container">
                <button @click="remove(email.id)">🗑</button>
                <router-link tag="button" :to="'/email/'+email.id" @click="select(email)">Details</router-link>
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
        remove(emailId) {
            this.$emit('remove', emailId)
        },
        select(email) {
            console.log('email:', email.id + ' is selected')
            this.$emit('selected', email)
        },
        logId(bookId) {
            console.log('Id is', bookId);
        }
    },
    created() {
        return emailService.query()
            .then(emails => {
                this.emails = emails
                console.log('emails from list:', this.emails);
            })
    },
    components: {
        emailPreview
    }
}
