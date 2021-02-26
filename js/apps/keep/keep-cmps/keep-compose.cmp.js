import { eventBus } from "../../../services/event-bus.service.js";

export default {

    template: `
      <section class="compose">
        <section class="compose-container flex column">
            <input type="text" :placeholder="msg" v-model="content" @keydown.enter="defineContent">
                    
            <div class="compose-btns flex column" >
            <div class="compose-btn" @click="makeType('keepTxt')"><i name="keepTxt" class="fas fa-file-alt"></i></div>   
            <div class="compose-btn" @click="makeType('keepImg')"><i name="keepImg" class="fas fa-image"></i></div>   
            <div class="compose-btn" @click="makeType('keepTodos')"><i name="keepTodos" class="fas fa-tasks"></i></div>   
            <div class="compose-btn" @click="makeType('keepVideo')"><i name="keepVideo" class="fab fa-youtube"></i></div>     
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
            msg: 'Choose Keep Type: '

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
                this.msg = 'Enter Comma Separated List...';
            }

        },
        defineContent() {
            if (this.keepType === 'keepTodos') {
                this.makeTodo();

            } else {
                eventBus.$emit('content', this.content);
            }
            this.content = '';
        },
        makeTodo() {
            const todos = this.content.split(',');
            var updatedTodos = todos.map(todo => {
                return todo = { txt: todo, doneAt: null };
            });
            this.$emit('todos', updatedTodos);
        }

    },
    computed: {

    }



}