import React, { useState } from 'react'
import Badge from '../Badge/Badge'
import List from '../List/List'
import './AddList.scss'

const AddList = ({ colors }) => {
   const [visiblePopup, setVisiblePopup] = useState(false)

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
            <input className='field' type="text" placeholder='Название списка' />
            <div className="add-list__popup-colors">
               <ul>

                  {
                     colors.map(color =>
                        <Badge key={color.id} color={color.name} />
                     )
                  }
               </ul>
            </div>
            <button className='button'>Добавить</button>
         </div>}
      </div>

   )
}

export default AddList
