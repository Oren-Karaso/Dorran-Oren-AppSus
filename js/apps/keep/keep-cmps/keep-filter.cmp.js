export default {

    template: `
      <section class="search-bar">
      <input type="search" placeholder="Find Keep" @keydown.enter="search" v-model="searchTerm">        
      </section>    `,
    data() {
        return {
            searchTerm: null
        }

    },
    methods: {
        search() {
            this.$emit('search', this.searchTerm.toLowerCase());
        }
    }
}