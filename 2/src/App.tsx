import {
  useFloating,
} from '@floating-ui/react';

function App() {

  const { refs, floatingStyles } = useFloating();

  return (
    <>
      Basic React App<br />
      <button
        type="button"
        ref={ refs.setReference }
      >
        Click Me!
      </button>

      <div
        ref={ refs.setFloating }
        style={ { ...floatingStyles, zIndex: 100, background: '#ccc' } }
      >
        Popover
      </div>
    </>
  );
}

export default App;
