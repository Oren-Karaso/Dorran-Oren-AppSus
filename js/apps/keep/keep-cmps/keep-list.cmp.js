import keepPreview from './keep-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
    <!-- <section class="list-container flex"> -->
        <ul class="keep-list grid-container">
            <li v-for="note in notes" :key="note.id" class="note-simple grid-item flex" >
                <keep-preview :note="note" @click.native="logId(note.id)" />
               
            </li>
        </ul>
    <!-- </section> -->
        
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId);
        },
        select(note) {
            this.$emit('selected', note);
        },
        logId(noteId) {
            console.log('Id is', noteId);
        }
    },
    components: {
        keepPreview
    }
}