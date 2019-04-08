const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', event =>
{
    event.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''
   
    fetch(`/weather?address=${searchInput.value}`).then( response => 
    {
        response.json().then( data =>
        {
            if(data.error)
            {
                message1.textContent = 'ERROR: ' + data.error
                message2.textContent = ''
                return
            }
    
            message1.textContent = data.location
            message2.textContent = data.temperature            
        })
    })
    
})





