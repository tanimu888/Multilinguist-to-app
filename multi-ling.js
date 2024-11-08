const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const languageSelector = document.getElementById('language-selector');
const appTitle = document.getElementById('app-title');

let tasks = [];

// Load language files
const loadLanguage = (lang) => {
    fetch(`locales/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            // Update UI text based on selected language
            appTitle.textContent = data.appTitle;
            taskInput.placeholder = data.taskInputPlaceholder;
            addTaskButton.textContent = data.addTaskButton;
            languageSelector.options[0].textContent = data.languageEnglish;
            languageSelector.options[1].textContent = data.languageSpanish;
            languageSelector.options[2].textContent = data.languageFrench;
        });
};

// Add a task to the list
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push(taskText);
        taskInput.value = '';
        renderTasks();
    }
};

// Render tasks to the screen
const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });
};

// Event listeners
addTaskButton.addEventListener('click', addTask);
languageSelector.addEventListener('change', (e) => loadLanguage(e.target.value));

// Initialize with default language (English)
loadLanguage('en');
