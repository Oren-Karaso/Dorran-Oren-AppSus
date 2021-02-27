import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <section class="email-sidebar">
        <ul class="email-sidebar-list">
           <li> <button class="compose-button" @click="sending">+ Compose</button></li>
           <li @click="reDirect('inbox')" class="inbox"><i class="fas fa-envelope"></i> Inbox</li>
           <li @click="reDirect('starred')" class="starred"><i class="fas fa-star"></i> Starred</li>
           <li @click="reDirect('sent')" class="sent-mail"><i class="fas fa-paper-plane"></i> Sent Mail</li>
           <li @click="reDirect('drafts')" class="drafts"><i class="fas fa-file-alt"></i> Drafts</li>
           <li @click="reDirect('trash')" class="trash"><i class="fas fa-trash-alt"></i> Trash</li>
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
