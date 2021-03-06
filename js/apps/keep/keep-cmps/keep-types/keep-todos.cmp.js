import { eventBus } from '../../../../services/event-bus.service.js';


export default {
    props: ['note'],
    template: `
    <section>
        <ul>
        <li @click.stop="todoDone(todo)" v-for="todo in note.info.todolist" :class="{'done': todo.doneAt, 'undone': !todo.doneAt}" class="note-todo" > {{todo.txt}} </li> 
        </ul>
    
    </section>
`,
    data() {
        return {
            selectedNote: this.note,
            // noteDone: null

        }
    },
    methods: {
        todoDone(todo) {
            console.log('new conlog = selected note is:', this.selectedNote);
            console.log('this todo', todo);
            let currTodo = this.selectedNote.info.todolist.find(item => item === todo);
            currTodo.doneAt = Date.now();
            console.log('currTodo', currTodo);
            eventBus.$emit('update', this.note);
        }

    }

}