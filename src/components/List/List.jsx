import React from 'react';
import classNames from 'classnames'

import removeBtn from '../../assets/img/remove.svg'

import './List.scss';
import Badge from '../Badge/Badge';
const List = ({ items, isRemovable, onClick, onRemove }) => {

  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список? ')) {
      onRemove(item)
    }
  }

  return (
    <div>
      <ul onClick={onClick} className="list">
        {items.map((item, index) => (
          <li key={index}
            className={classNames(item.className, { 'active ': item.active })}>
            <i>
              {item.icon
                ? item.icon
                : (<Badge color={item.color} />)}
            </i>
            < span > {item.name} </span>
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
