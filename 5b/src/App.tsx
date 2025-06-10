import { useState } from 'react';
import {
  useFloating,
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
      <div style={ { position: 'relative', zIndex: 1, padding: 16, border: '1px solid orange' } }>
        <button
          type="button"
          ref={ refs.setReference }
          onClick={ () => setIsOpen( ! isOpen ) }
        >
          Click Me!
        </button>

        { isOpen && (
          <div
            ref={ refs.setFloating }
            style={ { ...floatingStyles, zIndex: 100, background: '#ccc' } }
          >
            Popover
          </div>
        ) }
      </div>

      <div style={ { position: 'relative', zIndex: 1, background: 'rgba( 255, 255, 0, 0.5 )' } }>
        relative div
      </div>
    </>
  );
}

export default App;
