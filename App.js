document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task))

        updateTasksList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";

        updateTasksList();
        updateStats();
        saveTasks();
    }

};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;

    updateTasksList();
    updateStats();
    saveTasks();


}



const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
}

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
}

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100
    const progressbar = document.getElementById("progress");

    progressbar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;

    if (tasks.length && completedTasks === totalTasks) {
        blaskConfetti();
    }



};

const updateTasksList = () => {
    const taskList = document.getElementById("task-List");
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
               <div class="task ${task.completed ? "completed" : ''}">
                  <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                  <p>${task.text}</p>
                </div>
                <div class="icons">
                   <button id="edit-btn"><i class="fa-regular fa-pen-to-square" onClick= "editTask(${index})"></i></button>
                   <button id="delete-btn style= "color:red;"><i class="fa-solid fa-trash-can" onClick= "deleteTask(${index})"></i></button>
                </div>   
         </div>  
         ` ;

        listItem.addEventListener("change", () => toggleTaskComplete(index));

        taskList.append(listItem);

    });


};

document.getElementById('NewTask').addEventListener('click', function (e) {
    e.preventDefault();

    addTask();
})

const blaskConfetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}