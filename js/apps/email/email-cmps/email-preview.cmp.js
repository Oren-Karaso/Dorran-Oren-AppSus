export default {
    props: ['email'],
    template: `
    <p class="email-preview">
        <span class ="from">{{ email.content.from }}</span>
        <span class="subject">{{ email.content.subject }} -</span>
        <span class="content">{{ email.content.msgBody }}</span>
    </p>
    `
}  
    
        
    

