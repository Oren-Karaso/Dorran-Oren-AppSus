export default {
    props: ['email'],
    template: `
    <section class="email-preview">
        <p class ="from">{{ email.content.from }}</p>
        <p class="subject">{{ email.content.subject }} -</p>
        <p class="content">{{ email.content.msgBody }}</p>
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
        },
        
    },
}

