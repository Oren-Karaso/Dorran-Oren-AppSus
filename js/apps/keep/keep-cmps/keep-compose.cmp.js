export default {

    template: `
      <section class="compose">
        <section class="compose-container flex column">
            <input type="text" placeholder="Add Keep" >
            <div class="compose-btns flex column" >
            <button class="compose-btn"><i class="fas fa-image"></i></button>   
            <button class="compose-btn"><i class="fas fa-tasks"></i></button>   
            <button class="compose-btn"><i class="fas fa-file-alt"></i></button>   
            <button class="compose-btn"><i class="fab fa-youtube"></i></button>     
            </div>          
        </section>
          
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