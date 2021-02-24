export default {
    template: `
   <header class="app-header">
       <div class="logo">
           <h1>AppSus</h1>
       </div>
       <nav>
           <router-link active-class="active-link" to="/" exact class="nav-link">Home</router-link> 
           <router-link to="/book" class="nav-link">Books</router-link> 
           <router-link to="/email/:folder" class="nav-link">eMail</router-link>
           <router-link to="/keep" class="nav-link">Keep</router-link>

       </nav>
    </header>
    `,

}