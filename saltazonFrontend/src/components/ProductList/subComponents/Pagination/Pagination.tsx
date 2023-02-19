import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import './Pagination.css';
import useStore from '../../../Hooks/store';

const Pagination = () => {
  const store = useStore();

  return (
    <section className="pagination">
      {store.previousPage
        ? <button className="pagination--square next--prev" onClick={store.handlePreviousPage}>
          <span className="pagination--square__char"><MdArrowBackIosNew /></span>
        </button>
        : <button className="pagination--square next--prev disabled" disabled>
          <span className="pagination--square__char"><MdArrowBackIosNew /></span>
        </button>
      }

      <div className="pagination--square page">
        <span className="pagination--square__char">{store.currentPage ? store.currentPage : '--'}</span>
      </div>

      <div>
        of
      </div>

      <div className="pagination--square page">
        <span className="pagination--square__char">{store.numberOfProducts && store.limit ? Math.ceil(store.numberOfProducts / store.limit) : '--'}</span>
      </div>

      {store.nextPage
        ? <button className="pagination--square next--prev" onClick={store.handleNextPage}>
          <span className="pagination--square__char"><MdArrowForwardIos /></span>
        </button>
        : <button className="pagination--square next--prev disabled" disabled>
        <span className="pagination--square__char"><MdArrowForwardIos /></span>
      </button>
      }

    </section>
  )
}

export default Pagination