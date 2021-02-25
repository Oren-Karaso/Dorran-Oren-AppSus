import { keepService } from '../keep-service/keep.service.js';
import keepList from '../keep-cmps/keep-list.cmp.js';
import keepFilter from '../keep-cmps/keep-filter.cmp.js';
import keepEdit from '../keep-cmps/keep-edit.cmp.js';
import keepCompose from '../keep-cmps/keep-compose.cmp.js';
import keepPreview from '../keep-cmps/keep-preview.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';



export default {
    template: `
        <section class="keep-app flex">
        <keep-filter/>
        <keep-compose/>
        <keep-list v-if="notes" :notes="notes" />

        </section>
        `,
    data() {
        return {
            notes: null,
            selectedNote: null,

        }
    },
    methods: {
        selectNote(note) {
            this.selectedNote = note;
        },
        removeNote(noteId) {
            keepService.removeKeep(noteId)
                .then(() => {
                    keepService.query()
                        .then(notes => this.notes = notes);
                })
        }

    },
    computed: {

    },
    mounted() {

    },
    created() {
        keepService.query().then(notes => this.notes = notes);
        eventBus.$on('remove', this.removeNote);

    },
    destroyed() {
        eventBus.$off('remove', keepService.removeKeep);

    },
    components: {
        keepCompose,
        keepEdit,
        keepFilter,
        keepList,
        keepPreview
    }


}