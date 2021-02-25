export default {
    props: ['note'],
    template: `
   <p v-if="note.info.txt" class="note-title">{{note.info.txt}}</p>

`,

}