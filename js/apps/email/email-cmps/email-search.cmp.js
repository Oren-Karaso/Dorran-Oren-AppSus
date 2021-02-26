import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <section class="email-search">
        <label class="search-by">🔍</label>    
        <input type="text" @input="setSearch" placeholder="Search...." v-model="searchBy">
    </section>
    `,
    data() {
        return {
            searchBy: null
        }
    },
    methods:{
        setSearch(){
            eventBus.$emit('searchKeyPassed',this.searchBy);
        }
    }
}
