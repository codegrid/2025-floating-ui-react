import {
	type Ref,
	type ReactElement,
	type ReactNode,
	type HTMLProps,
	type Dispatch,
	type MouseEvent,
	type FocusEvent,
	type ButtonHTMLAttributes,
	type SetStateAction,
	useState,
	useEffect,
	useRef,
	useContext,
	createContext,
	forwardRef,
	Fragment,
	cloneElement,
} from 'react';

import {
	autoUpdate,
	flip,
	FloatingFocusManager,
	FloatingList,
	FloatingNode,
	FloatingPortal,
	FloatingTree,
	offset,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useFloatingNodeId,
	useFloatingParentNodeId,
	useFloatingTree,
	useHover,
	useInteractions,
	useListItem,
	useListNavigation,
	useMergeRefs,
	useRole,
	useTypeahead
} from '@floating-ui/react';


const MenuContext = createContext<{
	getItemProps: ( userProps?: HTMLProps<HTMLElement> ) => Record<string, unknown>;
	activeIndex: number | null;
	setActiveIndex: Dispatch<SetStateAction<number | null>>;
	setHasFocusInside: Dispatch<SetStateAction<boolean>>;
	isOpen: boolean;
}>( {
	getItemProps: () => ( {} ),
	activeIndex: null,
	setActiveIndex: () => {},
	setHasFocusInside: () => {},
	isOpen: false,
} );

type MenuItemProps = {
	label: string;
	disabled?: boolean;
};

export const MenuItem = forwardRef<
	HTMLButtonElement,
	MenuItemProps & ButtonHTMLAttributes<HTMLButtonElement>
>( ( { label, disabled, ...props }, forwardedRef ) => {

	const menu = useContext( MenuContext );
	const item = useListItem( { label: disabled ? null : label } );
	const tree = useFloatingTree();
	const isActive = item.index === menu.activeIndex;

	return (
		<button
			{ ...props }
			ref={ useMergeRefs( [ item.ref, forwardedRef ] ) }
			type="button"
			role="menuitem"
			style={ { display: 'block', width: '100%' } }
			tabIndex={ isActive ? 0 : - 1 }
			disabled={ disabled }
			{ ...menu.getItemProps( {
				onClick( event: MouseEvent<HTMLButtonElement> ) {

					props.onClick?.( event );
					tree?.events.emit( 'click' );

				},
				onFocus( event: FocusEvent<HTMLButtonElement> ) {

				props.onFocus?.( event );
				menu.setHasFocusInside( true );

				}
			} ) }
		>
			{ label }
		</button>
	);

} );

type MenuTriggerItemProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const MenuTriggerItem = forwardRef<
	HTMLButtonElement,
	ButtonHTMLAttributes<HTMLButtonElement>
>( ( { children, ...props }: MenuTriggerItemProps, forwardedRef ) => {

	const item = useListItem();

	return (
		<button
			{ ...props }
			ref={ useMergeRefs( [ item.ref, forwardedRef ] ) }
			type="button"
			style={ { display: 'block', width: '100%' } }
		>
			{ children } ▶
		</button>
	);

} );

type MenuProps = {
	trigger: ReactElement<ButtonHTMLAttributes<HTMLButtonElement> & {ref?: Ref<HTMLButtonElement>},"button">;
	nested?: boolean;
	children?: ReactNode;
};

export const MenuComponent = forwardRef<
	HTMLButtonElement,
	MenuProps & HTMLProps<HTMLButtonElement>
>( ( { children, trigger, ...props }, forwardedRef ) => {

	const [ isOpen, setIsOpen ] = useState( false );
	const [ hasFocusInside, setHasFocusInside ] = useState( false );
	const [ activeIndex, setActiveIndex ] = useState<number | null>( null );

	const elementsRef = useRef<Array<HTMLButtonElement | null>>( [] );
	const labelsRef = useRef<Array<string | null>>( [] );
	const parent = useContext( MenuContext );

	const tree = useFloatingTree();
	const nodeId = useFloatingNodeId();
	const parentId = useFloatingParentNodeId();
	const item = useListItem();

	const isNested = parentId !== null;

	const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>( {
		nodeId,
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: isNested ? 'right-start' : 'bottom-start',
		middleware: [
			offset( { mainAxis: isNested ? 0 : 4, alignmentAxis: 0 } ),
			flip(),
			shift()
		],
		whileElementsMounted: autoUpdate,
	} );

	const hover = useHover( context, {
		enabled: isNested,
		delay: { open: 200, close: 200 },
		handleClose: safePolygon( { blockPointerEvents: true } ),
	} );

	const click = useClick( context, {
		event: 'mousedown',
		toggle: ! isNested,
		ignoreMouse: isNested
	} );

	const role = useRole( context, { role: 'menu' } );
	const dismiss = useDismiss( context, { bubbles: true } );
	const listNavigation = useListNavigation( context, {
		listRef: elementsRef,
		activeIndex,
		nested: isNested,
		onNavigate: setActiveIndex,
	} );

	const typeahead = useTypeahead( context, {
		listRef: labelsRef,
		onMatch: isOpen ? setActiveIndex : undefined,
		activeIndex,
	} );

	const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions( [
		hover, click, role, dismiss, listNavigation, typeahead
	] );

	useEffect( () => {

		if ( ! tree ) return;

		function handleTreeClick() {

			setIsOpen( false );

		}

		function onSubMenuOpen( event: { nodeId: string, parentId: string } ) {

			if ( event.nodeId !== nodeId && event.parentId === parentId ) {

				setIsOpen( false );

			}

		}

		tree.events.on( 'click', handleTreeClick );
		tree.events.on( 'menuopen', onSubMenuOpen );

		return () => {

			tree.events.off( 'click', handleTreeClick );
			tree.events.off( 'menuopen', onSubMenuOpen );

		};

	}, [ tree, nodeId, parentId ] );

	useEffect( () => {

		if ( isOpen && tree ) {

			tree.events.emit( 'menuopen', { parentId, nodeId } );

		}

	}, [ tree, isOpen, nodeId, parentId ] );

	return (
		<FloatingNode id={ nodeId }>
			{ cloneElement( trigger, {
				ref: useMergeRefs( [ refs.setReference, item.ref, forwardedRef ] ),
				type: 'button',
				tabIndex: ! isNested ? undefined : parent.activeIndex === item.index ? 0 : - 1,
				role: isNested ? 'menuitem' : undefined,
				style: isNested ? { display: 'block', width: '100%' } : undefined,
				...getReferenceProps( parent.getItemProps( {
					...props,
					onFocus( event: FocusEvent<HTMLButtonElement> ) {

					props.onFocus?.( event );
					setHasFocusInside( false );
					parent.setHasFocusInside( true );

					}
				} ) ),
			} ) }
			<MenuContext.Provider
				value={ {
					activeIndex,
					setActiveIndex,
					getItemProps,
					setHasFocusInside,
					isOpen,
				} }
			>
				<FloatingList elementsRef={ elementsRef } labelsRef={ labelsRef }>
					{ isOpen && (
						<FloatingPortal>
							<FloatingFocusManager
								context={ context }
								modal={ false }
								initialFocus={ isNested ? - 1 : 0 }
								returnFocus={ ! isNested }
							>
								<div
									ref={ refs.setFloating }
									style={ floatingStyles }
									{ ...getFloatingProps() }
								>
									{ children }
								</div>
							</FloatingFocusManager>
						</FloatingPortal>
					) }
				</FloatingList>
			</MenuContext.Provider>
		</FloatingNode>
	);

} );

export const Menu = forwardRef<
	HTMLButtonElement,
	MenuProps & HTMLProps<HTMLButtonElement>
>( ( props, ref ) => {

	const parentId = useFloatingParentNodeId();
	const Wrapper = parentId === null ? FloatingTree : Fragment;

		return (
			<Wrapper>
				<MenuComponent { ...props } ref={ ref } />
			</Wrapper>
		);

} );
