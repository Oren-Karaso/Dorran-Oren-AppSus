import { eventBus } from '../../../services/event-bus.service.js';

export default {
    props: ['note'],
    template: `
    <section class="note-preview flex" :style="{ backgroundColor: bgc }">
        <section class="note">
            <!-- <p class="note-title">{{note}}</p> -->
            <p v-if="note.info.title" class="note-title">{{note.info.title}}</p>
            <img v-if="note.info.url" class="note-img" :src="note.info.url">
            <p v-if="note.info.txt" class="note-title">{{note.info.txt}}</p>
            <p v-if="note.info.todos" class="note-title">{{note.info.todos}}</p>
            <p v-if="note.info.todos" class="note-title">{{note.info.todos.txt}}</p>
            <!-- <p class="note-title">{{note}}</p>
            <p class="note-title">{{note}}</p>
            <p class="note-title">{{note}}</p> -->
            <section class="note-btns flex">
                <div @click="removeNote" class="delete-note"><i class="fas fa-trash-alt"></i></div>
                <div @click="selectNote" class="edit-note"><i class="fas fa-edit"></i></div>
                <div @click="selectNote" class="edit-color"><i class="fas fa-palette"></i></div>
                <div @click="selectNote" class="pin"><i class="fas fa-thumbtack"></i></div>
            </section>
        </section>
        
    </section>
    `,
    methods: {
        removeNote(note) {
            eventBus.$emit('remove', this.note);
            console.log('delete me');
        },
        selectNote(note) {
            eventBus.$emit('selected', this.note);
            console.log('edit me');
        },
        changeColor() {

        }
    },
    computed: {
        bgc() {
            return this.note.style.backgroundColor;
        }
    },
    components: {
        eventBus
    }

}