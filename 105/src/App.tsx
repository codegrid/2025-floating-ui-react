import { useState, useMemo, useRef } from 'react';
import {
	useFloating,
	useClick,
	useDismiss,
	useListNavigation,
	useInteractions,
	offset,
	flip,
	size,
	autoUpdate,
	FloatingPortal,
	FloatingFocusManager,
} from '@floating-ui/react';

function App() {
	const options = [
		{ value: 'US', label: 'アメリカ合衆国', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/us.svg' },
		{ value: 'CN', label: '中華人民共和国', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/cn.svg' },
		{ value: 'DE', label: 'ドイツ', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/de.svg' },
		{ value: 'IN', label: 'インド', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/in.svg' },
		{ value: 'JP', label: '日本', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/jp.svg' },
		{ value: 'GB', label: 'イギリス', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/gb.svg' },
		{ value: 'FR', label: 'フランス', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/fr.svg' },
		{ value: 'IT', label: 'イタリア', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/it.svg' },
		{ value: 'CA', label: 'カナダ', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/ca.svg' },
		{ value: 'BR', label: 'ブラジル', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/br.svg' },
		{ value: 'RU', label: 'ロシア', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/ru.svg' },
		{ value: 'KR', label: '大韓民国', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/kr.svg' },
		{ value: 'AU', label: 'オーストラリア', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/au.svg' },
		{ value: 'MX', label: 'メキシコ', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/mx.svg' },
		{ value: 'SG', label: 'シンガポール', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/sg.svg' },
		{ value: 'ZA', label: '南アフリカ', thumb: 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/za.svg' },
	];

	const [ isOpen, setIsOpen ] = useState< boolean >( false );
	const [ activeIndex, setActiveIndex ] = useState< number | null >( null );
	const [ selectedIndex, setSelectedIndex ] = useState< number | null >( null );

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

	const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions( [
		click, dismiss, listNav
	] );

	const handleSelect = ( index: number ) => {
		setSelectedIndex( index );
		setIsOpen( false );
	};

	const selectedLabel = useMemo( () => {
		if ( selectedIndex === null ) return null;
		return options[ selectedIndex ]?.label ?? null;
	}, [ selectedIndex, options ] );

	return (
		<>
			Basic React App<br />
			選択値: { selectedIndex }<br />
			<button
				type="button"
				ref={ refs.setReference }
				aria-label="国を選択"
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
			<div>後続のコンテンツ</div>
		</>
	);
}

export default App;
