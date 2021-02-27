export default {
    props: ['email'],
    template: `
    <section class="email-preview">
        <!-- <p class ="from">{{email.content.from }} <span>{{showEmailAddress}}</span></p> -->
        <p class="subject">Subject: <span >{{email.content.subject}}</span></p>
        <p class="content">Content: <span >{{email.content.msgBody}}</span></p>
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

