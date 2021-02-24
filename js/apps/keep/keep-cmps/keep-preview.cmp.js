export default {
    props: ['note'],
    template: `
    <section class="note-preview flex">
        <p class="note-title">{{note}}</p>
        <p v-if="note.info.title" class="note-title">{{note.info.title}}</p>
        <img v-if="note.info.url" class="note-img" src="note.info.url">
        <!-- <p v-if="note.title" class="note-title">{{note}}</p> -->
        <!-- <p class="note-title">{{note}}</p>
        <p class="note-title">{{note}}</p>
        <p class="note-title">{{note}}</p> -->
        <section class="note-btns flex">
            <div @click="deleteNote" class="delete-note"><i class="fas fa-trash-alt"></i></div>
            <div @click="editNote" class="edit-note"><i class="fas fa-edit"></i></div>
           
        </section>
    </section>
    `,

}