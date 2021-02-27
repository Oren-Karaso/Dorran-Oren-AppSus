import { keepService } from '../keep-service/keep.service.js';
import keepList from '../keep-cmps/keep-list.cmp.js';
import keepFilter from '../keep-cmps/keep-filter.cmp.js';
import keepCompose from '../keep-cmps/keep-compose.cmp.js';
import keepPreview from '../keep-cmps/keep-preview.cmp.js';
import { eventBus } from '../../../services/event-bus.service.js';



export default {
    template: `
        <section class="keep-app flex">
        <keep-filter @search="searchNote"/>
        <keep-compose @todos="createTodos"/>
        <keep-list v-if="notes" :notes="notes" :searchFor="searchRes" :pinned="pinnedNotes" />

        </section>
        `,
    data() {
        return {
            notes: null,
            selectedNote: null,
            newNoteType: null,
            newNoteContent: null,
            searchRes: null,
            pinnedNotes: []

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
            setTimeout(() => {
                keepService.query()
                    .then(notes => this.notes = notes);
            }, 0);
        },

        noteType(keepType) {
            this.newNoteType = keepType;
        },

        updateNote(note) {
            const updatedNote = this.notes.find(item => item.id === note.id);
            keepService.updateKeep(updatedNote);
            setTimeout(() => {
                keepService.query()
                    .then(notes => this.notes = notes);
            }, 0);
        },

        createTodos(updatedTodos) {
            console.log(updatedTodos);
            keepService.createKeep(this.newNoteType, updatedTodos);
        },

        searchNote(searchTerm) {
            // keepService.query().then(notes => this.notes = notes);
            // if (!searchTerm || searchTerm === '') return;
            console.log('searchTerm', searchTerm);
            console.log('notes', this.notes);
            const searchKeeps = keepService.searchKeep(searchTerm, this.notes);
            this.searchRes = searchKeeps;
            console.log('searchKeeps', searchKeeps);
            // keepService.query().then(notes => this.notes = notes);
        },
        pinKeep(note) {
            const pinned = this.notes.find(item => item === note);
            console.log('pinned', pinned)
            this.pinnedNotes.push(pinned);
        }


    },
    created() {
        keepService.query().then(notes => this.notes = notes);
        eventBus.$on('remove', this.removeNote);
        eventBus.$on('keepType', this.noteType);
        eventBus.$on('content', this.addNote);
        eventBus.$on('update', this.updateNote);
        eventBus.$on('pin', this.pinKeep);



    },
    destroyed() {
        eventBus.$off('remove', this.removeNote);
        eventBus.$off('keepType', this.addNote);
        eventBus.$off('content', this.content);
        eventBus.$off('update', this.updateNote);
        eventBus.$off('todos', this.createTodos);
        eventBus.$off('pin', this.pinKeep);




    },
    components: {
        keepCompose,
        keepFilter,
        keepList,
        keepPreview
    }


}