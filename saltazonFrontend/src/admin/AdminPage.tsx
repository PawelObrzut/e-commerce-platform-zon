import AdminProductList from './products/AdminProductList.jsx';
import { fakeProducts } from '../fakedata/fakedata.js';
import React from 'react';

function AdminPage() {
  const currentStore = 'Salt store number 2';
  return (
        <>
            <header>
                Welcome to the {currentStore}
            </header>
            <AdminProductList products={fakeProducts} storeName={currentStore} />
        </>
  );
}

export default AdminPage;
