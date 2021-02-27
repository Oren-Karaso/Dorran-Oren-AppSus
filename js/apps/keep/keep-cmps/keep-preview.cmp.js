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
                <div @click="pinNote" class="pin-btn"><i class="fas fa-thumbtack"></i></div>
            </section>
            <section class="edit-section">
            <input class="edit-color-input" v-if="editColor" type="color" v-model="rgb">
            <input class="edit-title-input" v-if="editMode" type="text" @keydown.enter="editNote" placeholder="Keep Title" v-model="keepTitle">

            <input class="edit-txt-input" v-if="editMode && note.info.txt" type="text" @keydown.enter="editNote" placeholder="Keep Text" v-model="msgBody">
            <input class="edit-url-input" v-if="editMode && note.info.url" type="text" @keydown.enter="editNote" placeholder="Keep URL" v-model="keepURL">
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
            keepTitle: this.note.info.title,
            keepURL: this.note.info.url
        }
    },
    methods: {
        removeNote() {
            eventBus.$emit('remove', this.note);
            console.log('delete me');
        },
        selectNote() {
            eventBus.$emit('selected', this.note);
            console.log('edit me');
        },
        changeColor() {
            this.editColor = !this.editColor;
            this.note.style.backgroundColor = this.rgb;
            eventBus.$emit('update', this.note);
        },
        editNote() {
            console.log('keep title: ', this.note.info.title, 'input:', this.keepTitle)
            console.log('keep url: ', this.note.info.url, 'input:', this.keepURL)
            console.log('keep txt: ', this.note.info.txt, 'input:', this.keepTxt)
            if (this.keepType === 'keepTxt') {
                this.note.info.txt = this.msgBody;
            } else if (this.keepType === 'keepImg' || this.keepType === 'keepVideo') {
                if (!this.note.info.url) {
                    this.note.info.url = this.keepURL;
                } else {
                    this.note.info.url = this.keepURL;
                }
                console.log('edited note', this.note);
            };

            if (!this.note.info.title) {
                this.note.info.title = this.keepTitle;
            } else {
                this.note.info.title = this.keepTitle;
            }
            eventBus.$emit('update', this.note);
        },
        pinNote() {
            this.note.isPinned = true;
            eventBus.$emit('pin', this.note);

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