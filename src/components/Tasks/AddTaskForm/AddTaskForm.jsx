import axios from 'axios';
import React, { useState } from 'react'

import addSvg from '../../../assets/img/add.svg';


const AddTaskForm = ({ list, onAddTask }) => {

   const [visibleForm, setVisibleForm] = useState(false)
   const [inputValue, setinputValue] = useState('')
   const [isLoading, setIsLoading] = useState('')

   const toggleVisibleForm = () => {
      setVisibleForm(!visibleForm)
      setinputValue('')
   }

   const addTask = () => {
      const obj = {
         listId: list.id,
         text: inputValue,
         completed: false
      }
      setIsLoading(true)
      axios.post('http://localhost:3001/tasks', obj)
         .then(({ data }) => {
            onAddTask(list.id, data)
            toggleVisibleForm()
         })
         .catch(() => {
            alert('Задача не добавлена')
         })
         .finally(() => {
            setIsLoading(false)
         })

   }
   return (
      <div className="tasks__form">
         {!visibleForm
            ? <div onClick={toggleVisibleForm} className="tasks__form-new">
               <img src={addSvg} alt="add-btn" />
               <span>Новая задача</span>
            </div>
            : <div className="tasks__form-block">
               <input type="text"
                  placeholder='Текст задачи'
                  className='field'
                  onChange={e => setinputValue(e.target.value)} />
               <button disabled={isLoading}
                  className='button'
                  onClick={addTask}
               >{isLoading ? 'Добавление' : 'Добавить задачу'}</button>
               <button onClick={toggleVisibleForm} className='button button--grey'>Отменить</button>
            </div>}
      </div>
   )
}

export default AddTaskForm
