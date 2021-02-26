import emailSearch from '../email-cmps/email-search.cmp.js'
import emailSidebar from '../email-cmps/email-sidebar.cmp.js'

export default {
    template: `
        <section class="email-app cln-grid">
          <email-sidebar class="side-bar" />
          <email-search /> 
          <router-view />
          <router-link to=""></router-link>

        </section>
    `,
    components: {
        emailSearch,
        emailSidebar
    }
}
