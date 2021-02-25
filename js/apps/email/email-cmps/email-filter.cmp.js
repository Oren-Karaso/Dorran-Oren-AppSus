import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <section class="email-filter">
        <label class="search-by"> Search by content: </label>    
        <input type="text" @input="setFilter" placeholder="Search...." v-model="filterBy.byContent">
    </section>
    `,
    data() {
        return {
            filterBy: {
                byTitle: '',
                byFrom: '',
                byTo: '',
                byContent: ''
            }
        }
    },
    methods:{
        setFilter(){
            eventBus.$emit('filtered',this.filterBy.byContent);
        }
    }
}
