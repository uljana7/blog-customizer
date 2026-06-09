import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, FormEvent, useEffect } from 'react';
import { Text } from 'src/ui/text';
import { clsx } from 'clsx';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';

type FormProps = {
	onSubmit: (state: typeof defaultArticleState) => void;
	onCancel: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onSubmit, onCancel }: FormProps) => {
	const [isFormState, setIsFormState] = useState(false); //состояние открытия/закрытия панели

	const formRef = useRef<HTMLElement>(null);

	const openClose = () => {
		setIsFormState(!isFormState);
	};

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const updateField = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: value,
			}));
		};
	};

	const submit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(formState);
		setIsFormState(false);
	};

	const reset = (e: FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onCancel(defaultArticleState);
	};

	useEffect(() => {
		if (!isFormState) return;
		const clickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsFormState(false);
			}
		};
		document.addEventListener('mousedown', clickOutside);
		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, [isFormState]);

	return (
		<>
			<ArrowButton isOpen={isFormState} onClick={openClose} />
			<aside
				className={clsx(styles.container, isFormState && styles.container_open)}
				ref={formRef}>
				<form className={styles.form} onSubmit={submit} onReset={reset}>
					<Text as='h2'>Задайте параметры</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						title='Шрифт'
						onChange={updateField('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontWidth'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={updateField('fontSizeOption')}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='Цвет шрифта'
						onChange={updateField('fontColor')}
					/>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='Цвет фона'
						onChange={updateField('backgroundColor')}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='Ширина контента'
						onChange={updateField('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
