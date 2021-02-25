export default {

    template: `
      <section class="compose">
          <input type="text" placeholder="Add Keep">
      </section>
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