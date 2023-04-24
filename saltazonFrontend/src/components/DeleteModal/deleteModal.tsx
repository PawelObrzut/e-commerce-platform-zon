import React from 'react'

interface DeleteModalInterface {
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>
  product: number,
  handleDelete: (id: number) => void,
}

const DeleteModal = ({setConfirmDelete, product, handleDelete}: DeleteModalInterface) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900 bg-opacity-5">
      <div className="bg-white p-5 rounded-md shadow-lg">
        <p>Are you sure you want to delete this product?</p>
        <p>ID: {product}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setConfirmDelete(false)}
            className="px-4 py-2 bg-slate-200 text-gray-600 hover:bg-slate-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDelete(product);
              setConfirmDelete(false);
            }}
            
            className="px-4 py-2 bg-red-500 text-white ml-4 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;
