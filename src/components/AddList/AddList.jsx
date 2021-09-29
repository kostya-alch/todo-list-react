import React, { useState } from 'react'
import Badge from '../Badge/Badge'
import List from '../List/List'
import closeBtn from '../../assets/img/close.svg'

import './AddList.scss'

const AddList = ({ colors, onAddList }) => {
   const [visiblePopup, setVisiblePopup] = useState(false)
   const [selectedColor, setSelectedColor] = useState(colors[0].id)
   const [inputValue, setInputValue] = useState('')

   const onClose = () => {
      setVisiblePopup(false)
      setInputValue('')
      setSelectedColor(colors[0].id)
   }
   const addList = () => {
      const color = colors.filter(c => c.id === selectedColor)[0].name
      onAddList({
         id: Math.random(), name: inputValue, color,
      })
      onClose()

   }
   return (
      <div className='add-list'>
         <List onClick={() => setVisiblePopup(!visiblePopup)}
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
               className='button'>Добавить</button>
         </div>}
      </div>

   )
}

export default AddList
