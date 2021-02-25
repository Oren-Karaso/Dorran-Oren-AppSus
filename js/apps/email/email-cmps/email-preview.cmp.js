export default {
    props: ['email'],
    template: `
    <section class="email-preview">
        <p class ="from">From: {{email.content.from }} {{showEmailAddress}}</p>
        <p class="subject" :class="{'read': email.status.isRead, 'unread': !email.status.isRead}">Subject: {{email.content.subject}}</p>
    </section>
    `,
    computed: {
       showEmailAddress() {
           return  (this.email.content.from).toLowerCase() + '@gmail.com';
       }
    },
}

