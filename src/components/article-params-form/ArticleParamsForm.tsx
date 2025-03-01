import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

export type formProps = {
	setChange: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setChange }: formProps) => {
	// Хук для управления открытием/закрытием сайдбара
	const [open, setOpen] = useState(false);

	// Хук для хранения текущего состояния сайдбара, инициализируем значения по умолчанию
	const [sidebarState, setSidebarState] = useState(defaultArticleState);

	// Создаём ссылку на элемент DOM сайта
	const sidebarRef = useRef<HTMLElement>(null);

	// Функция для отображения/скрытия сайдбара
	const toggleOpen = () => {
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

	// Функция change для обновления состояния формы при вводе данных
	const handleChange = (key: string) => {
		return (value: OptionType) => {
			setSidebarState((prevState) => ({
				...prevState, // копируем все ключи и значения из предыдущего состояния
				[key]: value, // обновляем все свойтва состояния
			}));
		};
	};

	// Фунция reset для сброса формы
	const handleReset = () => {
		setSidebarState(defaultArticleState);
		setChange(defaultArticleState);
	};

	// Функция submit для применения данных, введённых в форму
	const handleSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();
		setChange(sidebarState);
	};

	return (
		<>
			<ArrowButton isOpen={open} onClick={toggleOpen} />
			<aside
				className={`${styles.container} ${open ? styles.container_open : ''}`}
				ref={sidebarRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					{/* Заголовок сайдбара */}
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					{/* Выбор шрифта */}
					<Select
						title='Шрифт'
						options={fontFamilyOptions} // Список выбора шрифта
						selected={sidebarState.fontFamilyOption} // Выбранный шрифт
						onChange={handleChange('fontFamilyOption')} // Функция обработки выбора шрифта
					/>

					{/* Выбор размера шрифта с помощью радиокнопок*/}
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions} // Варианты размеров шрифта на радиокнопках
						selected={sidebarState.fontSizeOption} // Выбранный размер шрифта
						onChange={handleChange('fontSizeOption')} // Функция обработки размера шрифта
					/>

					{/* Выбор цвета шрифта */}
					<Select
						title='Цвет шрифта'
						options={fontColors} // Варианты цвета шрифта
						selected={sidebarState.fontColor} // Выбранный цвет шрифта
						onChange={handleChange('fontColor')} // Функция обработки цвета шрифта
					/>

					{/* Выбор цвета фона */}
					<Select
						title='Цвет фона'
						options={backgroundColors} // Варианты цвета фона
						selected={sidebarState.backgroundColor} // Выбранный цвет фона
						onChange={handleChange('backgroundColor')} // Функция обработки цвета фона
					/>

					{/* Выбор ширины контента */}
					<Select
						title='Ширина контента'
						options={contentWidthArr} // Варианты ширины контента
						selected={sidebarState.contentWidth} // Выбранная ширина контента
						onChange={handleChange('contentWidth')} // Функция обработки ширины контента
					/>

					{/* Кнопки очистки и подтверждения форм */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
