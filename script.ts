import { faker } from '@faker-js/faker';

const btn = (document.querySelector("#btn") as HTMLButtonElement) 
const input = (document.querySelector("#input") as HTMLInputElement) //Console.Readline()
const app = (document.querySelector("#app") as HTMLDivElement) // CW


const API_KEy="YOUR_KEY"
const API_URL="https://api.openai.com/v1/chat/completions"

interface Users{
    role:string
    content:string
}

const messages:Users[]= [{role:'system', content:`
    You an Experienced Developer with different programming Language, 
    Your work is to answer questions other developer have in a simple, unique and humorous way
    make it look like it was different developers answering the questions always separate the 
    Answers with the word developer, for each question provide ten different answers
`}]
btn.addEventListener('click', async()=>{
    // console.log(input.value)
 
        messages.push({role:"user", content:input.value})
        console.log(messages)
    // make an Api Call
    const response = await fetch(API_URL, {
        method:"POST",
        headers:{
           'Authorization':`Bearer ${API_KEy}`,
           'Content-Type':'application/json'     
        },
        body:JSON.stringify({
            model:'gpt-3.5-turbo',
            messages,
            temperature: 0.9 //0-2
        })
    })

    const content = await response.json()
     let responseArray=(content.choices[0].message.content.split('Developer')) as string[];
     messages.push({role:'assistant', content:content.choices[0].message.content})
     responseArray.shift()
    ShowOutput(responseArray)
})

function ShowOutput(answers:string[]){
    let html =''

    answers.forEach(answer=>{
        html += `
        <div id="item">
        <div id="profile">
            <img src=${faker.image.avatar()}>
            <div>
                <p>${faker.internet.userName()}</p>
                <p>Software Developer</p>
                <p>${faker.company.name()}</p>
            </div>
        </div>
        <p>${answer}.</p>
    </div> `
    })

    app.innerHTML=html
}