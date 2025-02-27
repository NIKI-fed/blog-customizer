import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
// import { RadioGroup } from 'src/ui/radio-group';
// import { Select } from 'src/ui/select';
// import { Text } from 'src/ui/text';
import {
	// fontFamilyOptions,
	// fontColors,
	// backgroundColors,
	// contentWidthArr,
	// fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type formProps = {
	setChange?: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setChange = () => {} }: formProps) => {
	// Хук для управления открытием/закрытием сайдбара
	const [open, setOpen] = useState(false);

	// Хук состояния сайдбара, инициализируем значения по умолчанию
	const [sidebarState, setSidebarState] = useState(defaultArticleState);

	const sidebarRef = useRef<HTMLElement>(null);

	// Функция для отображения/скрытия сайдбара
	const toggleState = () => {
		setOpen(!open);
	};

	// Функция закрытия сайдбара при клике вне сайдбара
	useEffect(() => {
		const clickOutside = (evt: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(evt.target as Node)
			) {
				setOpen(false);
			}
		};
		// Добавляем обработчик для клика вне сайдбара
		document.addEventListener('mousedown', clickOutside);

		// Снимаем обработчик клика при размонтировании компонента
		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, []);

	// Функция для обновления состояния формы при вводе данных

	// Фунция reset для сброса формы
	const resetForm = () => {
		setSidebarState(defaultArticleState);
	};

	// Функция для подтверждения данных, введённых в форму
	// const submitData = (evt: React.FormEvent) => {
	// 	evt.preventDefault();
	// 	setChange(sidebarState);
	// }

	return (
		<>
			<ArrowButton isOpen={open} onClick={toggleState} />
			<aside className={styles.container}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
