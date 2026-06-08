import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [stylesState, setStylesState] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': stylesState.fontFamilyOption,
					'--font-size': stylesState.fontSizeOption,
					'--font-color': stylesState.fontColor,
					'--container-width': stylesState.contentWidth,
					'--bg-color': stylesState.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={setStylesState} onCancel={setStylesState} />
			<Article />
		</main>
	);
};
