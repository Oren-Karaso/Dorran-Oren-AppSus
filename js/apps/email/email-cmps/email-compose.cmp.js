
export default {
    props: ['emptyEmail'],
    template: `
    <section class="email-compose-container">
        <form @submit="save">
            <input class="send-to" type="text" placeholder="To" v-model="newEmail.content.to">
            <input class="send-subject" type="text" placeholder="Subject" v-model="newEmail.content.subject">
            <input class="send-cc" type="text" placeholder="Cc" v-model="newEmail.content.cc">
            <input class="send-bcc" type="text" placeholder="Bcc" v-model="newEmail.content.bcc">
            <textarea class="send-body" cols="30" rows="10" placeholder="Your email here..." v-model="newEmail.content.msgBody"></textarea>
            <div class="compose-bts">
                <button>Send</button>
                <button @click.prevent="closeModal"><i class="fas fa-times"></i></button>
            </div>
        </form> 
    </section>
    `,
    data() {
        return {
            newEmail: this.emptyEmail,
        }
    },
    methods: {
        save() {
            this.newEmail.folder = 'sent';
            console.log('email to send:', this.newEmail);
            this.$emit('saved', this.newEmail);
        },
        closeModal() {
            this.$emit('closeCompose');
        }
    },
    components: {
    },
    created() {
        // const folder = this.$route.params.folder;
    },
    destroyed() {
    }
}

