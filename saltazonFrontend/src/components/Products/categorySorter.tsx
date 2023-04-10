import React from 'react';
import '../../App.css';

function CategorySorter({ categories, sorterFunction }: any) {
  return (
        <>
            <select placeholder={'user'} id={'type_input'}
                    onChange={e => sorterFunction(e.target.value)}
                    className=''>
                {categories.map((c: any) => <option value={c} key={c}>{c}</option>)}
            </select>
        </>
  );
}

export default CategorySorter;
