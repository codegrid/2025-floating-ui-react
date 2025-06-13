import { useState } from 'react';
import {
  useFloating,
  useRole, // 追加
  useInteractions, // 追加
} from '@floating-ui/react';

function App() {

  const [ isOpen, setIsOpen ] = useState( false );
  const { refs, floatingStyles, context } = useFloating( {
    open: isOpen,
    onOpenChange: setIsOpen,
  } );

  const role = useRole( context, { role: 'dialog' } ); // 追加

  const { getReferenceProps, getFloatingProps } = useInteractions( [
    role,
  ] );

  return (
    <>
      Basic React App<br />
      <button
        type="button"
        ref={ refs.setReference }
        onClick={ () => setIsOpen( ! isOpen ) }
        { ...getReferenceProps() } // 追加
      >
        Click Me!
      </button>

      { isOpen && (
        <div
          ref={ refs.setFloating }
          style={ { ...floatingStyles, zIndex: 100, background: '#ccc' } }
          { ...getFloatingProps() } // 追加
        >
          Popover
        </div>
      ) }
    </>
  );
}

export default App;
