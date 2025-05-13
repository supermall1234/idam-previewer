'use client';

import { useState } from 'react';
import styles from './page.module.scss';

export default function Home() {
    const [fontStyle, setFontStyle] = useState<'gothic' | 'handwriting'>('gothic');
    const [text, setText] = useState('');
    const maxLength = 10;

    const fontDescription =
        fontStyle === 'gothic'
            ? '가독성이 뛰어나고 심플한 스타일의 고딕 서체에요.\n공적인 느낌이나, 깔끔한 느낌을 내고 싶을 때 좋아요.'
            : '귀엽고 아기자기한 스타일의 손글씨 서체에요.\n친근한 느낌이나, 따뜻한 느낌을 내고 싶을 때 좋아요.';

    return (
        <main className={styles.container}>
            <div className={styles.flexWrapper}><input
                type="text"
                className={`${styles.inputField} ${fontStyle === 'gothic' ? styles.gothic : styles.handwriting}`}
                placeholder="문구를 입력해 보세요!"
                value={text}
                onChange={(e) => {
                    if (e.target.value.length <= maxLength) {
                        setText(e.target.value);
                    }
                }}
            />


            </div>

            <section className={styles.consoleSection}>
                <div className={styles.charCount}>
                    {text.length} / {maxLength}
                </div>

                <div className={styles.fontName}>
                    {fontStyle === 'gothic' ? '고딕 스타일' : '손글씨 스타일'}
                </div>

                <div className={styles.fontDescription}>{fontDescription}</div>

                <div className={styles.toggleGroup}>
                    <button
                        className={`${styles.toggleButton} ${fontStyle === 'gothic' ? styles.active : ''}`}
                        onClick={() => setFontStyle('gothic')}
                    >
                        고딕 스타일
                    </button>
                    <button
                        className={`${styles.toggleButton} ${fontStyle === 'handwriting' ? styles.active : ''}`}
                        onClick={() => setFontStyle('handwriting')}
                    >
                        손글씨 스타일
                    </button>
                </div>
            </section>
        </main>
    );
}
