export default {

    template: `
      <input type="search">        
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId);

        },
        select(note) {
            this.$emit('selected', note);
        },
        logId(noteId) {
            console.log('Id is', noteId);
        }
    },



}