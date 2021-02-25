
export default {
    props: ['emptyEmail'],
    template: `
    <section class="email-compose-container">
    <form @submit="save">
            <input type="text" placeholder="Name" v-model="newEmail.content.from">
            <input type="text" placeholder="To" v-model="newEmail.content.to">
            <input type="text" placeholder="Cc" v-model="newEmail.content.cc">
            <input type="text" placeholder="Bcc" v-model="newEmail.content.bcc">
            <input type="text" placeholder="Subject" v-model="newEmail.content.subject">
            <textarea cols="30" rows="10" placeholder="Your email here..." v-model="newEmail.content.msgBody"></textarea>
            <button>Send</button>
            <!-- <button>Save as draft</button> -->
            <!-- :folder="emptyEmail.folder -->
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

