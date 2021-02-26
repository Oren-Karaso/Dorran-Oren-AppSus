export default {
    props: ['note'],
    template: `
    
    <img v-if="note.info.url" class="note-img" :src="note.info.url">

`,
}