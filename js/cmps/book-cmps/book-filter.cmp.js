
export default{
    template:`
            <section class="book-filter">
                    <label>Search a Book:</label>
                    <form @submit.prevent="setFilter">
                    <input type="text" placeholder="name" v-model="filterBy.byName">
                    <input type="number" placeholder="min price" v-model.number="filterBy.fromPrice">
                    <input type="number" placeholder="max price" v-model.number="filterBy.toPrice">
                    <button>Search</button>
                    </form>
            </section>
    `,
    data(){
        return{
            filterBy:{
                byName: '',
                fromPrice: 0,
                toPrice: Infinity
            }
        }
    },
    methods:{
        setFilter(){
            this.$emit('filtered', {...this.filterBy})
        }
        
    }
}