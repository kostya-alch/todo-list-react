import React from 'react';
import classNames from 'classnames'
import axios from 'axios';

import removeBtn from '../../assets/img/remove.svg'

import './List.scss';
import Badge from '../Badge/Badge';


const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список? ')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id)
      })
    }
  }

  return (
    <div>
      <ul onClick={onClick} className="list">
        {items.map((item, index) => (
          <li key={index}
            className={classNames(item.className, { active: activeItem && activeItem.id === item.id })}
            onClick={onClickItem ? () => onClickItem(item) : null}>
            <i>
              {item.icon
                ? item.icon
                : (<Badge color={item.color.name} />)}
            </i>
            < span > {item.name}
              {item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`} </span>
            {isRemovable && <img className='list__remove-icon'
              src={removeBtn}
              alt="remove-btn"
              onClick={() => removeList(item)} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
