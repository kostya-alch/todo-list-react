import React, { useEffect, useState } from 'react'
import Badge from '../Badge/Badge'
import List from '../List/List'
import closeBtn from '../../assets/img/close.svg'

import './AddList.scss'
import axios from 'axios'

const AddList = ({ colors, onAddList }) => {
   const [visiblePopup, setVisiblePopup] = useState(false)
   const [selectedColor, setSelectedColor] = useState(3)
   const [inputValue, setInputValue] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      if (Array.isArray(colors)) {
         setSelectedColor(colors[0].id)
      }
   }, [colors])

   const onClose = () => {
      setVisiblePopup(false)
      setInputValue('')
      setSelectedColor(colors[0].id)
   }
   const addList = () => {
      if (!inputValue) {
         alert('Введите название списка');
         return;
      }
      setIsLoading(true)
      axios.post('http://localhost:3001/lists', {
         name: inputValue, colorId: selectedColor
      })
         .then(({ data }) => {
            const color = colors.filter(c => c.id === selectedColor)[0]
            const listObj = { ...data, color, tasks: [] }
            onAddList(listObj)
            onClose()
         })
         .catch(() => {
            alert('Список не добавлен')
         })
         .finally(() => {
            setIsLoading(false)
         })

   }
   return (
      <div className='add-list'>
         <List onClick={() => setVisiblePopup(true)}
            items={
               [
                  {
                     className: 'list__add-button',
                     icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='list__icon-plus'>
                        <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>,
                     name: 'Добавить список'
                  }
               ]
            } />
         {visiblePopup && <div className="add-list__popup">
            <img onClick={onClose}
               src={closeBtn}
               alt="close"
               className='add-list__popup-close-btn' />

            <input value={inputValue}
               onChange={e => setInputValue(e.target.value)}
               className='field' type="text"
               placeholder='Название списка' />
            <div className="add-list__popup-colors">
               <ul>

                  {
                     colors.map(color =>
                        <Badge onClick={() => setSelectedColor(color.id)}
                           key={color.id}
                           color={color.name}
                           className={selectedColor === color.id && 'active'}
                        />
                     )
                  }
               </ul>
            </div>
            <button disabled={!inputValue}
               onClick={addList}
               className='button'>
               {isLoading ? 'Добавление...' : 'Добавить'}</button>
         </div>}
      </div>

   )
}

export default AddList
