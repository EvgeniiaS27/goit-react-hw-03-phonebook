import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.listContact}>
      {contacts.map(({ name, number, id }) => {
        return (
          <li key={id} className={css.itemContact}>
            <p className={css.contact}>
              {name}: {number}
            </p>
            <button
              className={css.button}
              type="button"
              onClick={() => onDeleteContact(id)}
            >
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object.isRequired),
  onDeleteContact: PropTypes.func.isRequired,
};
