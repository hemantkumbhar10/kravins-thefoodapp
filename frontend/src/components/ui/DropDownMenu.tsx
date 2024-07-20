import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoEllipsisHorizontal } from "react-icons/io5";


interface Dropdown {
  options: [{ value: string, label: string }],
  button?: React.ReactNode,
}



const DropDownMenu = ({ options, button }: Dropdown) => {

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);


  const dropDownHandler = () => {
    setIsDropDownOpen(!isDropDownOpen);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropDownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <>


      <div className='relative' ref={dropdownRef}>
        <IoEllipsisHorizontal onClick={dropDownHandler} className='cursor-pointer' />
        {isDropDownOpen &&

          <ul className='absolute top-5 right-0 bg-white p-2 px-3 pr-5 rounded-md'>
            {options.map((option, index) => {
              return (
                <li key={option.label + index} className='w-full'><Link to={`/${option.value}`} className='text-black text-sm'>{option.label}</Link></li>
              )
            })}
            {button && button}
          </ul>
        }
      </div>
    </>
  )
};


export default DropDownMenu;
