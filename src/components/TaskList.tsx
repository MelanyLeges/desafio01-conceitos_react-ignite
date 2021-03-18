import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return; //se vazio, retorna

    const newTask = {           //novo objeto para armazenar a nova task
      id: Math.random(),        //id random      
      title: newTaskTitle,
      isComplete: false        //deve iniciar false
    }

    setTasks(oldState => [...oldState, newTask]);   //spread operator, armazenas os valores antigos
    setNewTaskTitle('');                            //reset do input
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const taskMap = tasks.map(task => task.id == id ? {
      ...task, isComplete: !task.isComplete
    } : task)
    //realiza um Map das tasks, e se o id da task é igual ao informado
    //altera o isComplete para o status diferente do anterior, de false para true
    //caso não for igual, apenas retorna a task no mesmo status

    setTasks(taskMap);

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const taskFilter = tasks.filter(tasks => tasks.id !== id);    //filtra as tasks e mostrar todas, menos a do ID informado
    setTasks(taskFilter);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}
