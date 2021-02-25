import { eventBus } from "../../../services/event-bus.service.js";

export default {

    template: `
      <section class="compose">
          <button @click="clicked">+</button>
        <section v-if="compose" class="compose-container flex column">


            <input class="title" type="text" placeholder="Add Keep" >
            <div class="compose-btns flex column" >
            <button class="compose-btn" @click="makeType('noteTxt')"><i name="noteTxt" class="fas fa-file-alt"></i></button>   
            <button class="compose-btn" @click="makeType('noteImg')"><i name="noteImg" class="fas fa-image"></i></button>   
            <button class="compose-btn" @click="makeType('noteTodos')"><i name="notTodos" class="fas fa-tasks"></i></button>   
            <button class="compose-btn" @click="makeType('noteVideo')"><i name="noteVideo" class="fab fa-youtube"></i></button>     
            </div>          
        </section>
          
      </section>
    `,
    data() {
        return {
            keepType: 'noteTxt',
            compose: false

        }
    },
    methods: {
        makeType(type) {
            this.keepType = type;
            eventBus.$emit('keepType', this.keepType);
        },
        clicked() {
            this.compose = !this.compose;
        }

    },



}