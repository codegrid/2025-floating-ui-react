import { useState, useMemo } from 'react';

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
	const [ selectedIndex, setSelectedIndex ] = useState< number | null >( null );

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
				aria-label="国を選択"
				onClick={ () => setIsOpen( ! isOpen ) }
			>
				{ selectedLabel ?? "選択してください" }
			</button>

			{ isOpen && (
					<div
						style={ {
							overflowY: "auto",
							background: "#eee",
							minWidth: 100,
							borderRadius: 8,
						} }
					>
						{ options.map( ( { value, label, thumb }, i ) => (
							<button
								key={ value }
								type="button"
								style={ {
									display: "flex",
									gap: 8,
									width: "100%",
									border: 0,
									textAlign: "left",
								} }
								onClick={ () => {
									handleSelect( i );
								} }
								onKeyDown={ ( event ) =>{
									// クリックに加え、ボタンフォーカス中に
									// Enterキー または Spaceキー押下でも選択できるように
									if (
										event.key === "Enter" ||
										event.key === " "
									) {
										event.preventDefault();
										handleSelect( i );
									}
								} }
							>
								<img src={ thumb } alt="" width="16" />
								{ label }
								{/* 選択されるとチェックマークを表示できるようにしておく */}
								{ i === selectedIndex && "✅" }
							</button>
						) ) }
					</div>
			) }
			<div>後続のコンテンツ</div>
		</>
	);
}

export default App;
