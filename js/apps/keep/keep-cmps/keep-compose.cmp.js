import { eventBus } from "../../../services/event-bus.service.js";

export default {

    template: `
      <section class="compose">
          <button @click="clicked">+</button>
        <section v-if="compose" class="compose-container flex column">
            <section class="new-note-show">
                <form>
                    <input @makeType :class="keepType" type="text" placeholder="Title" v-model="addType" >
                    

                </form>

            </section>


            <div class="compose-btns flex column" >
            <button class="compose-btn" @click="makeType('keepTxt')"><i name="noteTxt" class="fas fa-file-alt"></i></button>   
            <button class="compose-btn" @click="makeType('keepImg')"><i name="noteImg" class="fas fa-image"></i></button>   
            <button class="compose-btn" @click="makeType('keepTodos')"><i name="notTodos" class="fas fa-tasks"></i></button>   
            <button class="compose-btn" @click="makeType('keepVideo')"><i name="noteVideo" class="fab fa-youtube"></i></button>     
            </div>          
        </section>
          
      </section>
    `,
    data() {
        return {
            keepType: 'keepTxt',
            addType: null,
            bgc: null,
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