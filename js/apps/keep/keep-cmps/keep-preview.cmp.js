import { eventBus } from '../../../services/event-bus.service.js';
import keepImg from './keep-types/keep-img.cmp.js';
import keepVideo from './keep-types/keep-video.cmp.js';
import keepTodos from './keep-types/keep-todos.cmp.js';
import keepTxt from './keep-types/keep-text.cmp.js';

export default {
    props: ['note'],
    template: `
    <section class="note-preview flex" :style="{ backgroundColor: bgc }">
        <section class="note">
            <!-- <p class="note-title">{{note}}</p> -->
            <p v-if="note.info.title" class="note-title">{{note.info.title}}</p>
            <component :note="note" :is="keepType"></component>
            <!-- <img v-if="note.info.url" class="note-img" :src="note.info.url"> -->
            <!-- <p v-if="note.info.txt" class="note-title">{{note.info.txt}}</p>
            <p v-if="note.info.todos" class="note-title">{{note.info.todos}}</p>
            <p v-if="note.info.todos" class="note-title">{{note.info.todos.txt}}</p> -->
            <!-- <p class="note-title">{{note}}</p>
            <p class="note-title">{{note}}</p>
            <p class="note-title">{{note}}</p> -->
            <section class="note-btns flex">
                <div @click="removeNote" class="delete-note"><i class="fas fa-trash-alt"></i></div>
                <div @click="editMode = !editMode" class="edit-note"><i class="fas fa-edit"></i></div>
                <div @click="changeColor" class="edit-color"><i class="fas fa-palette"></i></div>
                <div @click="selectNote" class="pin-btn"><i class="fas fa-thumbtack"></i></div>
            </section>
            <section class="edit-section">
            <input class="edit-color-input" v-if="editColor" type="color" v-model="rgb">
            <input class="edit-title-input" v-if="editMode" type="text" @keydown.enter="editNote" placeholder="Keep Title" v-model="keepTitle">
            
            <input class="edit-txt-input" v-if="editMode" type="text" @keydown.enter="editNote" placeholder="Edit Text" v-model="msgBody">
            </section>

        </section>
        
    </section>
    `,
    data() {
        return {
            keepType: this.note.type,
            editColor: false,
            rgb: this.note.style.backgroundColor,
            editMode: false,
            msgBody: this.note.info.txt,
            keepTitle: this.note.info.title
        }
    },
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
            this.editColor = !this.editColor;
            this.note.style.backgroundColor = this.rgb;
            eventBus.$emit('update', this.note);
        },
        editNote() {

        }
    },
    computed: {
        bgc() {
            return this.note.style.backgroundColor;
        }
    },
    components: {
        eventBus,
        keepImg,
        keepVideo,
        keepTodos,
        keepTxt
    }

}