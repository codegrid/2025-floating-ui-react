import { useState } from 'react';
import {
  useFloating,
  flip,
  autoUpdate,
  FloatingPortal,
} from '@floating-ui/react';

function App() {

  const [ isOpen, setIsOpen ] = useState( false );
  const { refs, floatingStyles } = useFloating( {
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [ flip( {
      mainAxis: true,
      crossAxis: true,
      fallbackPlacements: [ 'top-start', 'top-end', 'bottom-start', 'bottom-end' ],
    } ) ],
    whileElementsMounted: autoUpdate,
  } );

  return (
    <>
      Basic React App
      <div style={ { height: 'calc(100vh - 60px)' } }></div>

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
            Popover すこし横長
          </div>
        </FloatingPortal>
      ) }

      <div style={ { height: '100vh' } }></div>
    </>
  );
}

export default App;
