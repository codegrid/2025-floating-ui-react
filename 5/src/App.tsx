import { useState } from 'react';
import {
  useFloating,
  FloatingPortal,
} from '@floating-ui/react';

function App() {

  const [ isOpen, setIsOpen ] = useState( false );
  const { refs, floatingStyles } = useFloating( {
    open: isOpen,
    onOpenChange: setIsOpen,
  } );

  return (
    <>
      Basic React App<br />
      <div style={ { overflow: 'hidden', position: 'relative', padding: 16, border: '1px solid orange' } }>
        <button
          type="button"
          ref={ refs.setReference }
          onClick={ () => setIsOpen( ! isOpen ) }
        >
          Click Me!
        </button>

        { isOpen && (
          <FloatingPortal>
            <div
              ref={ refs.setFloating }
              style={ { ...floatingStyles, zIndex: 100, background: '#ccc' } }
            >
              Popover
            </div>
          </FloatingPortal>
        ) }
      </div>
    </>
  );
}

export default App;
