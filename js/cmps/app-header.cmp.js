export default {
    template: `
   <header class="app-header">
       <div class="logo pointer">
       <router-link active-class="active-link" to="/" exact class="nav-link"><h1>AppSus</h1></router-link> 
       </div>
       <nav>
           <router-link active-class="active-link" to="/" exact class="nav-link">Home</router-link> 
           <router-link to="/book" class="nav-link">Books</router-link> 
           <router-link to="/email/inbox" class="nav-link">eMail</router-link>
           <router-link to="/keep" class="nav-link">Keep</router-link>

       </nav>
    </header>
    `,

}