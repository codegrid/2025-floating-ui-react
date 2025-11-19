import { useState, useMemo, useRef } from 'react';
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

function App() {
	const options = [
		{ value: 'りんご', alt: [ 'リンゴ', '林檎', '🍎' ] },
		{ value: '青りんご', alt: [ 'あおリンゴ', 'あおりんご', '青リンゴ', '🍏' ] },
		{ value: 'みかん', alt: [ 'ミカン', '蜜柑', 'オレンジ', '🍊' ] },
		{ value: 'ばなな', alt: [ 'バナナ', '🍌' ] },
		{ value: 'ぶどう', alt: [ 'ブドウ', '葡萄', '🍇' ] },
	] as const;

	const [ filter, setFilter ] = useState< string >( '' );
	const [ isOpen, setIsOpen ] = useState< boolean >( false );
	const [ activeIndex, setActiveIndex ] = useState< number | null >( null );
	const [ selectedValue, setSelectedValue ] = useState< string | null >( null );

	const filteredOptions = useMemo( () => {
		if ( filter.trim() === '' ) return options;

		return options.filter( ( option ) => {
			if ( option.value.includes( filter ) ) return true;
			if ( option.alt.some( ( alt ) => alt.includes( filter ) ) ) return true;
		} );
	}, [ filter, options ] );

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
		// selectedIndex, // フィルター入力中に、フォーカスをoptionボタン（選択中項目）に奪われてしまうため、利用しない
		onNavigate: setActiveIndex,
		loop: true,
	} );
	const role = useRole( context, { role: "listbox" } );

	const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions( [
		click, dismiss, listNav, role
	] );

	const handleSelect = ( value: string ) => {
		setSelectedValue( value );
		setTimeout( () => setIsOpen( false ), 0 );
	};

	return (
		<>
			Basic React App<br />
			選択値: { selectedValue }<br />
			<button
				type="button"
				ref={ refs.setReference }
				aria-label="果物を選択"
				onClick={ () => refs.domReference.current?.focus() }
				{ ...getReferenceProps() }
			>
				{ selectedValue ?? "選択してください" }
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
							<input
								ref={ ( node ) => {
									listRef.current[ 0 ] = node;
								} }
								type="text"
								value={ filter }
								onChange={ ( event ) => setFilter( event.target.value ) }
								onKeyDown={ ( event ) => {
									if ( event.key !== "Enter" ) return;
									// 確定前の日本語入力中は無視する
									if ( event.nativeEvent.isComposing ) return;
									// 候補が一つに絞られていたら、自動選択する
									if ( filteredOptions.length === 1 ) {
										handleSelect( filteredOptions[ 0 ].value );
										return;
									}
									// 候補が複数あっても、完全一致が1つなら、それを自動選択する
									const exactMatch = filteredOptions.filter( ( option ) => option.value === filter || option.alt.some( ( alt ) => alt === filter ) );
									if ( exactMatch.length === 1 ) {
										handleSelect( exactMatch[ 0 ].value );
									}
								} }
								style={ {
									width: "100%",
									boxSizing: "border-box"
								} }
							/>
							{ filteredOptions.map( ( { value }, i ) => (
								<button
									key={ value }
									ref={ ( node ) => {
										listRef.current[ i + 1 ] = node;
									} }
									type="button"
									tabIndex={ i + 1 === activeIndex ? 0 : - 1 }
									style={ {
										display: "flex",
										gap: 8,
										width: "100%",
										border: 0,
										textAlign: "left",
										background: i + 1 === activeIndex ? "cyan" : "",
									} }
									{ ...getItemProps( {
										onClick() {
											handleSelect( value );
										},
										onKeyDown( event ) {
											if (
												event.key === "Enter" ||
												event.key === " "
											) {
												event.preventDefault();
												handleSelect( value );
											}
										},
									} ) }
								>
									{ value }
									{ value === selectedValue && "✅" }
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
