import Portal from '../portal';
import ErrorIcon from './icons/errorIcon';
import SuccessIcon from './icons/successIcon';

import { SweetAlertWrapper, Backdrop, Alert, Buttons, Button } from './styled';

const SweetAlert = ({
  message,
  additionalMessage,
  type,
  successButton,
  failedButton,
  withButtons,
  callBack,
}) => (
  <Portal>
    <SweetAlertWrapper>
      <Backdrop onClick={callBack} />
      <Alert>
        {type === 'success' && <SuccessIcon />}
        {type === 'error' && <ErrorIcon />}

        <p>{message}</p>

        {additionalMessage && <p>{additionalMessage}</p>}
        
        {withButtons && (
          <Buttons>
            {failedButton && type === 'error' && (
              <Button type="button" onClick={callBack}>
                {failedButton}
              </Button>
            )}
            
            {successButton && type === 'success' && (
              <Button type="button" onClick={callBack} success>
                {successButton}
              </Button>
            )}
          </Buttons>
        )}
      </Alert>
    </SweetAlertWrapper>
  </Portal>
);

export default SweetAlert;
