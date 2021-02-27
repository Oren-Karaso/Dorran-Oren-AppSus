export default {
    props: ['email'],
    template: `
    <section class="email-preview">
        <p class ="from">From: {{email.content.from }} <span>{{showEmailAddress}}</span></p>
        <p class="subject">Subject: <span >{{email.content.subject}}</span></p>
    </section>
    `,
    data() {
        return {
           
        }
    },
    methods: {
       
    },
    computed: {
        showEmailAddress() {
            return '<' + (this.email.content.from).toLowerCase() + '@gmail.com>';
        }
    },
}

