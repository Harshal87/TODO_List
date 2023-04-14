let submit_btn=document.getElementById('Submit')
console.log(submit_btn)
submit_btn.addEventListener('click',add_data)


function add_data(event)
{
    event.preventDefault()
    let to_do_name=document.getElementById('todoname')


    let descrp=document.getElementById('descrp');

    let row=document.createElement('tr')
    let data1=document.createElement('td')
    let data2=document.createElement('td')
    let data3=document.createElement('td')
    let data4=document.createElement('td')
    let checkbox=document.createElement('input')
    let delete_btn=document.createElement('button')
    checkbox.classList.add('form-check-input');
    delete_btn.classList.add('btn', 'btn-danger', 'ms-3');
    delete_btn.textContent="X"

    checkbox.type="checkbox"
    checkbox.id="checkbox"
    delete_btn.id="delete_btn"
    delete_btn.name="Delete"
    data1.append(to_do_name.value)
    data2.append(descrp.value)
    data3.append(checkbox)
    data4.append(delete_btn)
    row.append(data1,data2,checkbox,delete_btn)
    console.log(row)
    checkbox.addEventListener('click',Checkbox_handler)
    delete_btn.addEventListener('click',delOnClick)
   
    

    let table=document.getElementById("table")
    table.append(row)



    axios.post('https://crudcrud.com/api/4d3c4090b4de42218456ed380c8f3333/Todo-Data',
    {
    "Todotaskname": to_do_name.value,
    "Description":descrp.value    
    })

}

function Checkbox_handler(event)
{
let done_task=document.getElementById('done_todolist')
let row=document.createElement('tr')
let row_data=document.createElement('td')
let name=document.createElement('strong')
name.textContent=event.target.parentNode.children[0].textContent
row_data.append(name)
row.append(row_data)
done_task.append(row)

axios.post('https://crudcrud.com/api/4d3c4090b4de42218456ed380c8f3333/Todo-Completed-Data',
{
"Taskname": name.textContent
   
})

delOnClick(event)


}




function delOnClick(event)
{

    axios.get('https://crudcrud.com/api/4d3c4090b4de42218456ed380c8f3333/Todo-Data',
    ).then((obj)=>{
    
    let i
        for(i=0;i<obj.data.length;i++)
        {
            console.log(obj.data[i],'===',event.target.parentNode.children[0].textContent)
            if(obj.data[i].Todotaskname===event.target.parentNode.children[0].textContent)
            {
                console.log('gotch')
            axios.delete(`https://crudcrud.com/api/4d3c4090b4de42218456ed380c8f3333/Todo-Data/${obj.data[i]._id}`)    
            }
    
        }    
    }
    
    )
    
    let a=event.target.parentNode;
    a.remove()
}
