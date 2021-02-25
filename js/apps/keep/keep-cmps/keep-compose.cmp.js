import { eventBus } from "../../../services/event-bus.service.js";

export default {

    template: `
      <section class="compose">
          <button @click="clicked">+</button>
        <section v-if="compose" class="compose-container flex column">
            <section class="new-note-show">
                <form>
                    <input type="text" :placeholder="msg" v-model="content" @keydown.enter="defineContent">
                    

                </form>

            </section>


            <div class="compose-btns flex column" >
            <button class="compose-btn" @click="makeType('keepTxt')"><i name="keepTxt" class="fas fa-file-alt"></i></button>   
            <button class="compose-btn" @click="makeType('keepImg')"><i name="keepImg" class="fas fa-image"></i></button>   
            <button class="compose-btn" @click="makeType('keepTodos')"><i name="keepTodos" class="fas fa-tasks"></i></button>   
            <button class="compose-btn" @click="makeType('keepVideo')"><i name="keepVideo" class="fab fa-youtube"></i></button>     
            </div>          
        </section>
          
      </section>
    `,
    data() {
        return {
            keepType: 'keepTxt',
            content: null,
            bgc: null,
            compose: false,
            msg: null

        }
    },
    methods: {
        makeType(type) {
            this.keepType = type;
            eventBus.$emit('keepType', this.keepType);

            if (this.keepType === 'keepTxt') {
                this.msg = 'Enter Text...';
            } else if (this.keepType === 'keepImg') {
                this.msg = 'Enter Image URL...';

            } else if (this.keepType === 'keepVideo') {
                this.msg = 'Enter Video URL...';

            } else if (this.keepType === 'keepTodos') {
                this.msg = 'Enter comma separated list...';
            }

        },
        clicked() {
            this.compose = !this.compose;
        },
        defineContent() {
            eventBus.$emit('content', this.content);
        }

    },
    computed: {

    }



}