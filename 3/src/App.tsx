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
      <button
        type="button"
        ref={ refs.setReference }
        onClick={ () => setIsOpen( ! isOpen ) } /* ← 追加 */
      >
        Click Me!
      </button>

      { isOpen && ( /* ← 追加 */
        <div
          ref={ refs.setFloating }
          style={ { ...floatingStyles, zIndex: 100, background: '#ccc' } }
        >
          Popover
        </div>
      ) }
    </>
  );
}

export default App;
