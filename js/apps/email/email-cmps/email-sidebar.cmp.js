import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <section class="email-sidebar">
        <ul class="email-sidebar-list">
           <li> <button class="compose-button" @click="sending">+ Compose</button></li>
           <li @click="reDirect('inbox')" class="inbox">📨 Inbox</li>
           <li @click="reDirect('starred')" class="starred">⭐ Starred</li>
           <li @click="reDirect('sent')" class="sent-mail">📤 Sent Mail</li>
           <li @click="reDirect('drafts')" class="drafts">📝 Drafts</li>
           <li @click="reDirect('trash')" class="trash">🗑 Trash</li>
        </ul>
    </section>
`,
    methods: {
        reDirect(folder) {
            console.log('folder passed:', folder);
            this.$router.push(`/email/${folder}`);
            eventBus.$emit('changeFolder', folder);
            // ${this.$route.params.newPath}
        },
        sending() {
            eventBus.$emit('sending');
        }
    },
}
