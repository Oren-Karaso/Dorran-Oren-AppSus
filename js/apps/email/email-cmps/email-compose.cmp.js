
export default {
    template: `
    <section class="email-compose-container">
    <form @submit.prevent="save">
            <input type="text" placeholder="Name" v-model="from">
            <input type="text" placeholder="To" v-model="to">
            <input type="text" placeholder="Cc" v-model="cc">
            <input type="text" placeholder="Bcc" v-model="bcc">
            <input type="text" placeholder="Subject" v-model="subject">
            <textarea cols="30" rows="10" placeholder="Your email here..." v-model="content"></textarea>
            <button @click="save">Send</button>
            <button>Save as draft</button>
        </form> 
    </section>
    `,
    data() {
        return {
            from: null,
            to: null,
            cc: null,
            bcc: null,
            subject: null,
            content: null

        }
    },
    methods: {
        save() {
            return {
                from: this.from,
                to: this.to,
                cc: this.cc,
                bcc: this.bcc,
                subject: this.subject,
                content: this.content

            };
            // console.log('rev:', rev);
            this.$emit('save', rev);
        }
    },
    components: {
    },
    created() {

    },
    destroyed() {
    }
}

