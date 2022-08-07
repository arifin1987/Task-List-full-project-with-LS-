let form = document.querySelector('#task_form');
let inputTask = document.querySelector('#new_task');
let filter = document.querySelector('#task_filter');
let listItem = document.querySelector('ul');
let clearTask = document.querySelector('#clear_task_btn');

form.addEventListener('submit', addTask)
listItem.addEventListener('click', removeTask)
clearTask.addEventListener('click', taskClear)
filter.addEventListener('keyup', filterTask)
document.addEventListener('DOMContentLoaded', getTasks)

function addTask(e){
    if(inputTask.value=== ''){
        alert('insert your text')
    }else{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(inputTask.value + " "))
        listItem.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML='x';
        li.appendChild(link);
        listItem.appendChild(li);
        storeLs(inputTask.value)
        
        inputTask.value= '';
        
    }
    e.preventDefault();
}


function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm('are you sure?'));
        let ele = e.target.parentElement;
        removeFromLs(ele);
        ele.remove();
    }

}

function taskClear(){
    listItem.innerHTML= ''
    localStorage.clear();
}

function filterTask(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task =>{
        let tasks = task.firstChild.textContent;
        if(tasks.toLowerCase().indexOf(text)!=-1){
            task.style.display= 'block';
        }else{
            task.style.display= 'none';
        }
    })
}

function storeLs(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
        
    }else{
        tasks= JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
        
    }else{
        tasks= JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.forEach(task=>{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "))
        listItem.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML='x';
        li.appendChild(link);
        listItem.appendChild(li);

    })

}


function removeFromLs(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks =[];
    }else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task, index)=>{
        if(li.textContent.trim()===task){
            tasks.splice(index, 1);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks))

    });
    

}