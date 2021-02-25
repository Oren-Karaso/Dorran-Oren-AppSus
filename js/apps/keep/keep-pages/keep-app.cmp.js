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
            newNoteType: null,
            newNoteContent: null,

        }
    },
    methods: {
        selectNote(note) {
            this.selectedNote = note;
        },
        removeNote(note) {
            keepService.removeKeep(note)
                .then(() => {
                    keepService.query()
                        .then(notes => this.notes = notes);
                })
        },
        addNote(content) {
            keepService.createKeep(this.newNoteType, content);
            keepService.query()
                .then(notes => this.notes = notes);


        },
        noteType(keepType) {
            this.newNoteType = keepType;
        }

    },
    computed: {

    },
    mounted() {

    },
    created() {
        keepService.query().then(notes => this.notes = notes);
        eventBus.$on('remove', this.removeNote);
        eventBus.$on('keepType', this.noteType);
        eventBus.$on('content', this.addNote);


    },
    destroyed() {
        eventBus.$off('remove', this.removeNote);
        eventBus.$off('keepType', this.addNote);
        eventBus.$off('content', this.content);



    },
    components: {
        keepCompose,
        keepEdit,
        keepFilter,
        keepList,
        keepPreview
    }


}