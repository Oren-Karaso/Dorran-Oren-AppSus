export default {
    template: `
    <section class="email-filter">
        <label class="search-by"> Search an email: </label>    
        <input type="text" @input="setFilter" placeholder="Search...." v-model="filterBy.byTitle">
    </section>
    `,
    data() {
        return {
            filterBy: {
                byTitle: '',
            }
        }
    },
    methods:{
        setFilter(){
            this.$emit('filtered',this.filterBy)
        }
    }
}
