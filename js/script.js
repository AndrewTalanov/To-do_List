"use strict";
window.onload = () => {

    let books = document.querySelectorAll('[data-books] div'); // Массив табов (книг)
    const parentTasks = document.querySelector('[data-tasks]'); // Блок со всеми задачами
    let plusTasks = document.querySelectorAll('.bi-plus-square'); // кнопка "добавить"(плюс) в блоке книг
    let activeBook = 0; // Содержит в себе номер активной книги
    //база данных с задачами в книгах
    const booksDB = [
        [
            'Task 1.0',
            'Task 1.1',
            'Task 1.2'
        ],
         [
            'Task 2.0',
            'Task 2.1',
            'Task 2.2'
        ],
         [
            'Task 3.0',
            'Task 3.1',
            'Task 3.2'
        ]
    ];
        
    // Удаляет класс активности у всего массива элементов и добавляет класс активности объекту действия
    function changeActive(arr, event){ 
        arr.forEach((item) => {
            if (item.matches('.active')){
                item.classList.remove('active');  
            }
            event.classList.add('active');
        });
    }

    // Рисует список задач 
    function drawTaskList(i = 0){
        activeBook = i; // записываем в переменную номера активной книги, номер этой книги
        parentTasks.innerHTML = ''; // очистили список задач
        addTask();
        deleteTask();
        redactionTask();
    }

    //Удаление задач 
    function deleteTask(){
        document.querySelectorAll('[data-delete]').forEach((item, j) => { //перебираем крестики 
            item.addEventListener('click', () => { // навешиваем событие на каждый крестик
                item.parentElement.remove(); //удаляем элемент со страницы 
                booksDB[activeBook].splice(j, 1); //удаляем из бд (j - номер элемента, 1 - колво элементов
            });
        });
    }
    
    changeActive(books, books[0]); // Делаем активным первую книгу при старте страницы 
    drawTaskList(); // делаем активным список задач от первой книги

    //добавление книг на сраницу
    const addBook = document.querySelector('#addBook');
    const parentBooks = document.querySelector('#parentBooks');
    
    addBook.addEventListener('click', (event) => {
         parentBooks.innerHTML +=`
             <div class="col border py-3"> Book ${booksDB.length + 1} <i class="bi bi-plus-square float-right "></i></div>
         `
         booksDB.push([]);
         books = document.querySelectorAll('[data-books] div'); // Массив табов (книг)
         choiseBook();
         plusTasks = document.querySelectorAll('.bi-plus-square'); // кнопка "добавить"(плюс) в блоке книг
         addinputInTask();




        //  for(let i = 0; i < books.length; i++ ){
        //      console.log(books[i]);
        //  };
    });

    //Выбирая книгу, меняется контент в списке задач
    function choiseBook() {
        books.forEach((item) => {
            item.addEventListener('click', (event) => {
                event = event.target;
                if (event.matches('div')){
                    changeActive(books, event); //добавили класс активности нажатому элементу
                    books.forEach((item, i) => {
                        if(item.matches('.active')) {
                            drawTaskList(i);  
                        }            
                    });
                }
            }); 
        }); 
    }
    choiseBook();
    //Выделение задачи при наведении на неё
    parentTasks.addEventListener('mouseover', (event) => {
        if (event.target.matches('div') && event.type == 'mouseover'){
            event.target.classList.add('steering');
        }
        if (event.target.matches('i')  && event.type == 'mouseover' || event.target.matches('p') || event.target.matches('input')) {
            event.target.parentElement.classList.add('steering');
        }
    });

    //Снятие выделения при отведении мыши от задачи
    parentTasks.addEventListener('mouseout', (event) => {
        if (event.target.matches('div') && event.type == 'mouseout' ){
            event.target.classList.remove('steering');
        }
        if (event.target.matches('i')  && event.type == 'mouseover' || event.target.matches('p') || event.target.matches('input')) {
            event.target.parentElement.classList.add('steering');
        }
    });

    //добавление инпута/task в нужную книгу
    function addinputInTask(){
        plusTasks.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                if (i == activeBook) { //если номер нажатого плюса равен номеру активной книги, то в книгу add input
                    addForm();
                    deleteTask();
                    // redactionTask();
                    document.querySelectorAll('[data-formTask]').forEach((item) => { //перебираем инпуты
                        item.addEventListener('keydown', (event) => { 
                            if (event.code === 'Enter') { 
                                const valueInput = document.querySelector('[data-valueInput]').value; //сохраняем значение инпута
                                document.querySelector('[data-blockTask]').remove(); //удаляем форму со страницы 
                                if (valueInput != '') {
                                    booksDB[activeBook].push(valueInput); //сохраняем значени инпута в бд  
                                    addTask();  
                                }
                                
                                deleteTask();  
                                redactionTask();
                            }
                        });
                    });
                }
            });
            
        });
    }
    addinputInTask();
    

    //добавление инпута 
    function addForm(textTask = '') {
        parentTasks.innerHTML += `
            <div class="pl-4 p-2 pt-4 border-bottom" data-blockTask>
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <form action="" data-formTask onsubmit="return false;"> 
                    <input type="text" name="text" data-valueInput value="${textTask}">
                </form>
                <i class="bi bi-x-circle float-right ml-2" data-delete></i>
                <i class="bi bi-pencil float-right"></i>
            </div>
        `;
        document.querySelector('[data-valueInput]').focus();
    }

    //добавление задач на страницу
    function addTask() {
        parentTasks.innerHTML = '';
        booksDB[activeBook].forEach((item) => { 
            parentTasks.innerHTML += `
                <div class="pl-4 p-2 pt-4 border-bottom">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <p class="nameTask">${item}</p>
                    <i class="bi bi-x-circle float-right ml-2" data-delete></i>
                    <i class="bi bi-pencil float-right"></i>
                </div>
            `;
        });
    }
    
    //редактирование уже существующих задач
   function redactionTask() {
       document.querySelectorAll('.nameTask').forEach((item, i) => {
            item.addEventListener('dblclick', (event) => {
                const textTask = event.target.textContent; //обращаемся к тексту элемента
                event.target.parentElement.remove(); // удаляем задачу
                addForm(textTask);
                booksDB[activeBook].splice(i, 1); 
                enter();
            });
       });

       document.querySelectorAll('.bi-pencil').forEach((item, i) => {
            item.addEventListener('click', (event) => {
                const textTask = event.target.previousElementSibling.previousElementSibling.textContent; //обращаемся к тексту элемента ФИГОВЫЙ СПОСОБ
                // console.log(event.target.parentElement.children); // ПОПЫТКА НАЙТИ РЕШЕНИЕ
                event.target.parentElement.remove(); // удаляем задачу
                addForm(textTask);
                booksDB[activeBook].splice(i, 1); 
                enter();
            });
       });

       function enter() {
            document.querySelectorAll('[data-formTask]').forEach((item) => {
                item.addEventListener('keydown', (event) => {
                    if (event.code === 'Enter') {
                        const valueInput = document.querySelector('[data-valueInput]').value; //сохраняем значение инпута
                        document.querySelector('[data-blockTask]').remove(); //удаляем форму со страницы 
                        if (valueInput != '') {
                            booksDB[activeBook].push(valueInput); //сохраняем значени инпута в бд  
                            addTask();  
                        }
                        deleteTask();  
                        redactionTask(); 
                    }   
                });
            });
       }      
   } 

   //сохранение чекбокса

   const checkBD = [
       [
        false,
        false,
        false
       ]
   ]

   saveCheckbox()
   function saveCheckbox() {
        const checkbox = document.querySelectorAll('.form-check-input');

        checkbox.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                checkBD[0].splice(i, 1);
                checkBD[0].push(item.checked); 
                
                


                console.log(checkBD[0]);
                console.log(i);
            });   
        });
   }
};