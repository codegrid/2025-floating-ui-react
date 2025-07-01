import {
  useState,
  cloneElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
  type MouseEvent,
} from 'react';
import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
  flip,
  autoUpdate,
  FloatingPortal,
} from '@floating-ui/react';

type PopoverProps = {
  trigger: ReactElement<ComponentProps<'button'>>;
  children: ReactNode;
}

export const Popover = ( { trigger, children }: PopoverProps ) => {

  const [ isOpen, setIsOpen ] = useState( false );
  const { refs, floatingStyles, context } = useFloating( {
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [ flip( {
      mainAxis: true,
      crossAxis: true,
      fallbackPlacements: [ 'top-start', 'top-end', 'bottom-start', 'bottom-end' ],
    } ) ],
    whileElementsMounted: autoUpdate,
  } );
  const dismiss = useDismiss( context );
  const role = useRole( context );

  const { getReferenceProps, getFloatingProps } = useInteractions( [
    role, dismiss,
  ] );

  // トリガーボタンに必要なpropsを適用
  const triggerWithProps = cloneElement( trigger, {
    ref: refs.setReference,
    onClick: ( event: MouseEvent<HTMLButtonElement> ) => {
      setIsOpen( ! isOpen );
      // 元のonClickがあれば実行
      trigger.props.onClick?.( event );
    },
    ...getReferenceProps(),
  });

  return (
    <>
      { triggerWithProps }
      { isOpen && (
        <FloatingPortal>
          <div
            ref={ refs.setFloating }
            style={ { ...floatingStyles, zIndex: 10, background: '#ccc' } }
            { ...getFloatingProps() }
          >
            { children }
          </div>
        </FloatingPortal>
      ) }
    </>
  );
}
