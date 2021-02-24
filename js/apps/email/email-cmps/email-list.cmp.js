import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template: `
    <ul class="email-list">
        <li v-for="email in emails" :key="email.id" class="email-preview-container" >
            <email-preview :email="email" @click.native="logId(email.id)" @click="select(email)" />
            <div class="btns-container">
                <button @click="remove(email.id)">🗑</button>
                <router-link tag="button" :to="'/email/'+email.id" >Details</router-link>
            </div>
        </li>
    </ul>
    `,
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
    components:{
        emailPreview
    }
}
