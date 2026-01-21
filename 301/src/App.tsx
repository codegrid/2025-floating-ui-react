import { Menu, MenuItem, MenuTriggerItem } from './Menu';

export default function App() {

	return (
		<>
			<Menu trigger={
				<button type="button">設定 ⚙️</button>
			}>
				<MenuItem label="項目1" onClick={ () => console.log( '項目1' ) } />
				<MenuItem label="項目2" disabled />
				<MenuItem label="項目3" />
				<Menu trigger={
					<MenuTriggerItem>入れ子1</MenuTriggerItem>
				}>
					<MenuItem label="項目1-1" />
					<MenuItem label="項目1-2" />
					<Menu trigger={
						<MenuTriggerItem>入れ子1-3</MenuTriggerItem>
					}>
						<MenuItem label="項目1-3-1" />
						<MenuItem label="項目1-3-2" />
						<MenuItem label="項目1-3-3" />
						<MenuItem label="項目1-3-4" />
					</Menu>
					<MenuItem label="項目1-4	" />
				</Menu>
				<Menu trigger={
					<MenuTriggerItem>入れ子2</MenuTriggerItem>
				}>
					<MenuItem label="項目2-1" />
					<MenuItem label="項目2-2" />
				</Menu>
			</Menu>
		</>
	);

};
