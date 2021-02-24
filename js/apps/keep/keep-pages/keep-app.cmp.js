import { keepService } from '../keep-service/keep.service.js';
import keepList from '../keep-cmps/keep-list.cmp.js';
import keepFilter from '../keep-cmps/keep-filter.cmp.js';
import keepEdit from '../keep-cmps/keep-edit.cmp.js';
import keepCompose from '../keep-cmps/keep-compose.cmp.js';
import keepPreview from '../keep-cmps/keep-preview.cmp.js';



export default {
    template: `
        <section class="keep-app flex">

        <keep-list :notes="notes" />

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

    },
    computed: {

    },
    mounted() {

    },
    created() {
        keepService.query().then(notes => this.notes = notes);

    },
    components: {
        keepCompose,
        keepEdit,
        keepFilter,
        keepList,
        keepPreview
    }


}