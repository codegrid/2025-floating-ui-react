import { useState } from 'react';
import {
  useFloating,
  useDismiss, // 追加
  useInteractions, // 追加
} from '@floating-ui/react';

function App() {

  const [ isOpen, setIsOpen ] = useState( false );
  const { refs, floatingStyles, context } = useFloating( {
    open: isOpen,
    onOpenChange: setIsOpen,
  } );

  const dismiss = useDismiss( context ); // 追加

  const { getReferenceProps, getFloatingProps } = useInteractions( [
    dismiss,
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
