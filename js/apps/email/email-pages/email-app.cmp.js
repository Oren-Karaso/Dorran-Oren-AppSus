import { emailService } from '../email-service/email.service.js'
import emailFilter from '../email-cmps/email-filter.cmp.js'
import emailSidebar from '../email-cmps/email-sidebar.cmp.js'

export default {
    template: `
        <section class="email-app">
          <email-sidebar class="side-bar" />
          <email-filter /> 
          <router-view />
          <router-link to=""></router-link>

        </section>
    `,
    components: {
        emailFilter,
        emailSidebar
    }
}
