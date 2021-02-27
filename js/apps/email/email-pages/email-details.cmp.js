import { emailService } from '../email-service/email.service.js'

export default {
    template: `
    <section class="email-details" v-if="email">
        <p class="dtls-subject">Subject: {{email.content.subject}}</p> 
        <p class="dtls-from">From: {{email.content.from}}</p> 
        <p class="dtls-to">To: {{email.content.to}}</p> 
        <p class="dtls-date">Created \\ Recieved: {{email.status.timestamp}}</p> 
        <p class="dtls-content">Content: {{email.content.msgBody}}</p>
        <div class="dtls-bts">
            <button @click="markReadUnRead">{{(!email.status.isRead) ? "Mark As Read" : "Mark As Unread"}}</button>
            <router-link to="/email/inbox" class="close-dtls"><button><i class="fas fa-times"></i></button></router-link>
        </div>
        </section>
    `,
    data() {
        return {
            email: null,
        }
    },
    methods: {
        sendEmail(email) {
            console.log('in function');
            emailService.sendEmail(email)
                .then(() => {
                    console.log('email sent:', this.email);
                })
                .catch(err => {
                    console.log('Error sending email:', err);
                });
        },
        markReadUnRead() {
            this.email.status.isRead = !this.email.status.isRead;
            emailService.updateStatus(this.email)
                .then(email => {
                    console.log('email has been marked from:', !this.email.status.isRead + ' to:', this.email.status.isRead);
                })
                .catch(err => {
                    console.log('Error in updating a mail');
                });
        }
    },
    computed: {

    },

    created() {
        const id = this.$route.params.emailId;

        emailService.getById(id)
            .then(email => {
                this.email = email;
            })
            .catch(err => {
                console.log('Error', err);
                this.$router.push('/email');
            });
    },
    components: {

    }
}
