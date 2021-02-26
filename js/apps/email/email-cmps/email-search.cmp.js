import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <section class="email-filter">
        <label class="search-by"> Search in Emails: </label>    
        <input type="text" @input="setFilter" placeholder="Search...." v-model="searchBy">
    </section>
    `,
    data() {
        return {
            searchBy: null
        }
    },
    methods:{
        setFilter(){
            eventBus.$emit('searchKeyPassed',this.searchBy);
        }
    }
}
