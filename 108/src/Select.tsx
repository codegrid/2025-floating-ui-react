import { useState, useRef, useMemo } from 'react';
import {
	useFloating,
	useClick,
	useDismiss,
	useRole,
	useListNavigation,
	useInteractions,
	offset,
	flip,
	size,
	autoUpdate,
	FloatingPortal,
	FloatingFocusManager,
} from '@floating-ui/react';

type SelectOption = {
	value: string,
	label: string,
	thumb: string
}

type SelectProps = {
	label: string,
	selectedIndex: number | null,
	options: SelectOption[],
	onChange: ( index: number ) => void
};

export const Select = ( { label, selectedIndex, options, onChange }: SelectProps ) => {

	const [ isOpen, setIsOpen ] = useState< boolean >( false );
	const [ activeIndex, setActiveIndex ] = useState< number | null >( null );

	const { refs, floatingStyles, context } = useFloating< HTMLElement >( {
		placement: "bottom-start",
		open: isOpen,
		onOpenChange: setIsOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset( 5 ),
			flip( { padding: 10 } ),
			size( {
				apply( { rects, elements, availableHeight } ) {
					Object.assign( elements.floating.style, {
						maxHeight: `${ availableHeight }px`,
						minWidth: `${ rects.reference.width }px`,
					} );
				},
				padding: 10,
			} ),
		],
	} );

	const listRef = useRef< ( HTMLElement | null )[] >( [] );

	const click = useClick( context, { event: "mousedown" } );
	const dismiss = useDismiss( context );
	const listNav = useListNavigation( context, {
		listRef,
		activeIndex,
		selectedIndex,
		onNavigate: setActiveIndex,
		loop: true,
	} );
	const role = useRole( context, { role: "listbox" } );

	const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions( [
		click, dismiss, listNav, role
	] );

	const handleSelect = ( index: number ) => {
		onChange( index );
		setIsOpen( false );
	};

	const selectedLabel = useMemo( () => {
		if ( selectedIndex === null ) return null;
		return options[ selectedIndex ]?.label ?? null;
	}, [ selectedIndex, options ] );

	return (
		<>
			<button
				type="button"
				ref={ refs.setReference }
				aria-label={ label }
				onClick={ () => refs.domReference.current?.focus() }
				{ ...getReferenceProps() }
			>
				{ selectedLabel ?? "選択してください" }
			</button>

			{ isOpen && (
				<FloatingPortal>
					<FloatingFocusManager context={ context } modal={ false }>
						<div
							ref={ refs.setFloating }
							style={ {
								...floatingStyles,
								overflowY: "auto",
								background: "#eee",
								minWidth: 100,
								borderRadius: 8,
							} }
							{ ...getFloatingProps() }
						>
							{ options.map( ( { value, label, thumb }, i ) => (
								<button
									key={ value }
									ref={ ( node ) => {
										listRef.current[ i ] = node;
									} }
									type="button"
									tabIndex={ i === activeIndex ? 0 : - 1 }
									style={ {
										display: "flex",
										gap: 8,
										width: "100%",
										border: 0,
										textAlign: "left",
										background: i === activeIndex ? "cyan" : "",
									} }
									{ ...getItemProps( {
										onClick() {
											handleSelect( i );
										},
										onKeyDown( event ) {
											if (
												event.key === "Enter" ||
												event.key === " "
											) {
												event.preventDefault();
												handleSelect( i );
											}
										},
									} ) }
								>
									<img src={ thumb } alt="" width="16" />
									{ label }
									{ i === selectedIndex && "✅" }
								</button>
							) ) }
						</div>
					</FloatingFocusManager>
				</FloatingPortal>
			) }
		</>
	);
}
