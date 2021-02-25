export default {
    props: ['note'],
    template: `
    <section>
        <p v-if="note.info.todos" v-for="todo in note.info.todos" class="note-title">{{todo.txt}}</p> 
    </section>


`,

}