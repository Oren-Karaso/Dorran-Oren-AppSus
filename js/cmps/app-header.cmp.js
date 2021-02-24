export default {
    template: `
   <header class="app-header">
       <div class="logo">
           <h1>Books</h1>
       </div>
       <nav>
           <router-link active-class="active-link" to="/" exact class="nav-link">Home</router-link> 
           <router-link to="/book" class="nav-link">Books Catalog</router-link> 
           <router-link to="/about" class="nav-link">About</router-link>

       </nav>
    </header>
    `,

}