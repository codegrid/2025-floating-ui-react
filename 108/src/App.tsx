import { useState, useMemo } from 'react';
import { Select } from './Select';

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

	const [ selectedIndex, setSelectedIndex ] = useState< number | null >( null );

	const selectedValue = useMemo( () => {
		if ( selectedIndex === null ) return null;
		return options[ selectedIndex ]?.value ?? null;
	}, [ selectedIndex, options ] );

	return (
		<>
			Basic React App<br />
			選択値(index): { selectedIndex }<br />
			選択値(value): { selectedValue ?? 'なし' }<br />
			<Select
				label="国を選択"
				selectedIndex={ selectedIndex }
				options={ options }
				onChange={ setSelectedIndex }
			/>
			<div>後続のコンテンツ</div>
		</>
	);
}

export default App;
