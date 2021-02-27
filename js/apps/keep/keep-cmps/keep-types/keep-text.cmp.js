export default {
    props: ['note'],
    template: `
   <p v-if="note.info.txt" class="note-txt">{{note.info.txt}}</p>

`,

}