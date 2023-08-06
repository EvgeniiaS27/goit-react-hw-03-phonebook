import PropTypes from 'prop-types';
import css from './FilterContacts.module.css';

export const FilterContacts = ({ value, onChange }) => {
  return (
    <div className={css.container}>
      <label htmlFor="idFilter" className={css.label}>
        Finde contacts by name
      </label>
      <input
        className={css.input}
        type="text"
        name="filter"
        id="idFilter"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

FilterContacts.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
