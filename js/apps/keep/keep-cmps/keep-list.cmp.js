import keepPreview from './keep-preview.cmp.js';

export default {
    props: ['notes'],
    template: `
    <!-- <section class="list-container flex"> -->
        <section class="keep-list grid-container">
            <div v-for="note in notes" :key="note.id" class="grid-item" >
                <keep-preview :note="note" @click.native="logId(note.id)" />
               
</div>
</section>
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