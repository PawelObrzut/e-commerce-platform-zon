// import StoreOverview from './StoreOverview';
// import allStores from '../fakedata/fakeStores';
import React from 'react';
import AddStoreForm from './AddStoreForm';

function SuperAdminPage() {
  const currentUser = 'Best Admin of all';
  return (
        <>
            <header>
                Welcome Almighty SuperAdmin {currentUser}
            </header>
            <AddStoreForm/>
            {
                // allStores.map((s: any) => <StoreOverview storeInfo={s}/>)
            }

        </>
  );
}

export default SuperAdminPage;
