export default {
    props: ['note'],
    template: `
    <section>
        <li v-if="note.info.todos" @click="todoDone" v-for="todo in note.info.todos" :todo="todo" class="note-title">{{todo.txt}}</li> 
    
    
    </section>
`,
    data() {
        return {
            selectedNote: this.note

        }
    },
    methods: {
        todoDone() {
            console.log('new conlog = selected note is:', this.selectedNote);
            console.log(this.selectedNote.info.todos[this.todo]);
            this.selectedNote.info.todos[this.todo].doneAt = Date.now();
        }

    }

}