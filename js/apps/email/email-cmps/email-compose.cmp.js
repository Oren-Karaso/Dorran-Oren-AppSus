
export default {
    template: `
    <section class="email-compose-container">
    <form @submit.prevent="save">
    <input type="text" placeholder="Name" v-model="name">
            <input type="number" placeholder="Grade" v-model.number="grade">
            <textarea cols="30" rows="10" placeholder="Your review here..." v-model="txt"></textarea>
            <button>Save</button>
        </form> 
    </section>
    `,
    data() {
        return {
            from: null,
            to: null,
            cc: null,
            bcc: null,
            subject: null

        }
    },
    methods: {
        save() { 
            const rev = {
                name: this.name,
                txt: this.txt,
                grade: this.grade
            };
            // console.log('rev:', rev);
            this.$emit('newReview', rev);
        }
    },
    components: {
    },
    created() {
        
    },
    destroyed() {
    }
}

