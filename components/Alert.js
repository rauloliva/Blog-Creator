import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Alert = () => (
  <div className="alert">
    <FontAwesomeIcon icon={faExclamationTriangle} />
    <p>
      Please provide a valid email address and password. If you do not have an
      account, create it in the <strong>Sign up</strong> button
    </p>
  </div>
);

export default Alert;
