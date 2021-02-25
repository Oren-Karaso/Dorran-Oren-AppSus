import { emailService } from '../email-service/email.service.js'

export default {
    template: `
    <section class="email-details" v-if="email">
        <p>Subject: {{email.content.subject}}</p> 
        <p>From: {{email.content.from}}</p> 
        <p>To: {{email.content.to}}</p> 
        <p>Created \\ Recieved at: {{email.status.timestamp}}</p> 
        <p>Content: {{email.content.msgBody}}</p> 
        <button @click="">Edit</button>
        <router-link to="/email/:folder"><button>X</button></router-link>
    </section>
    `,
    data() {
        return {
            email: null,
            // msgBodyToShow: null
        }
    },
    methods: {

        // more() {
        //     this.newDescrip = this.book.description;
        // },
        // showDetails() {
        //     if (this.email.content.msgBody.length > 80) {
        //         this.newDescrip = this.newDescrip.substring(96, 0);
        //         this.newDescrip += '...';
        //     }
        // },
        selecEmail(email) {
            this.selectedEmail = email;
        },
        // addReview() {
        //     this.isAddingRev = true;
        // },
        sendEmail(email) {
            console.log('in function');
            emailService.sendEmail(email)
                .then(() => {
                    console.log('email sent:', this.email);
                })
                .catch(err => {
                    console.log('Error sending email:', err);
                });
        }
    },
    computed: {
        // showExactDate() {
        //     return (this.email.status.timestamp).toLocaleString;
        // }
    },

    created() {
        const id = this.$route.params.emailId;
        console.log('id:', id);

        emailService.getById(id)
            .then(email => {
                this.email = email
                console.log('this email:', this.email)
            })
            .catch(err => {
                console.log('Error', err);
                this.$router.push('/email');
            });
    },
    components: {

    }
}
