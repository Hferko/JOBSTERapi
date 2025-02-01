import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>keresési űrlap</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRow
            type='text'
            labelText='keresés'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='statusz'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['összes', ...statusOptions]}
          />

          {/* search by type*/}
          <FormRowSelect
            labelText='típus'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['összes', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            labelText='rendezés'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            szűrők törlése
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
