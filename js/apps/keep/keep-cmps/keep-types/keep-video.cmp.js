export default {
    props: ['note'],
    template: `
    <!-- <img v-if="note.info.url" class="note-img" :src="note.info.url"> -->
    <!-- <iframe v-if="note.info.url" src="note.info.url"></iframe> -->
<iframe v-if="note.info.url" :src="url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
`,
    data() {
        return {
            url: this.note.info.url
        }
    }

}