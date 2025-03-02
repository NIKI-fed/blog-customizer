import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	// Хук для хранения текущего состояния страницы, инициализируем значения по умолчанию
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		// Отрисовываем основной блок страницы
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			{/* Дочерние компонеты */}
			<ArticleParamsForm setChange={setArticleState} />
			{/*Передаём метод setArticleState через пропс setChange */}
			<Article />
		</main>
	);
};
