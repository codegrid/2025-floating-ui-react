import { Popover } from './Popover';

function App() {

  return (
    <>
      Basic React App
      <div style={ { height: 'calc(100vh - 60px)' } }></div>

      <Popover
        trigger={
          <button type="button">Click me!</button>
        }
      >
        ポップオーバー内容
      </Popover>

      <div style={ { display: 'flex', justifyContent: 'end' } }>
        <Popover
          trigger={
            <button type="button">Click me, too!</button>
          }
        >
          右端のポップオーバー内容
        </Popover>
      </div>

      <div style={ { height: '100vh' } }></div>
    </>
  );
}

export default App;
