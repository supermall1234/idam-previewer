'use client';

import { useRef, useState } from 'react';
import styles from './page.module.scss';
import emojis, { emojiDict, emojiToNum } from '../svgIcons';


export default function Home() {

    const [text, setText] = useState<string>('');
    const [fontStyle, setFontStyle] = useState<number>(1);
    const ref = useRef<HTMLTextAreaElement>(null)
    const maxLength = 50;

    const handleEmojiClick = (i: number) => {
        const ta = ref.current
        if (!ta) return

        const start = ta.selectionStart
        const end = ta.selectionEnd
        const before = text.slice(0, start)
        const after = text.slice(end)

        const emoji = emojiDict[i + 1]

        const newText = before + emoji + after
        setText(newText)

        requestAnimationFrame(() => {
            const pos = start + emoji.length;
            ta.setSelectionRange(pos, pos);
            ta.focus();
        });
    }

    const handleEmptyButtonClick = () => {
        setText("")
    }

    const handleCopyButtonClick = async () => {
        if (text.length <= 0) {
            alert('문구를 입력해주세요')
            return
        }
        const res: string[] = []
        for (const char of text) {
            if (char in emojiToNum) {
                res.push(`(${emojiToNum[char]}번)`)
            } else {
                res.push(char)
            }
        }
        try {
            await navigator.clipboard.writeText(res.join('').replace(/(?:\r\n|\r|\n)/g, '\\n'))
            alert('복사 성공! 각인문구 란에 붙여넣어주세요')
        } catch (err) {
            console.log(err)
            alert('복사에 실패했어요.')
        }
    }

    return (
        <main className={styles.container}>

            <div className={styles.flexWrapper}>
                <textarea
                    spellCheck={false}
                    id='preview'
                    ref={ref}
                    className={`${styles.inputField} ${styles['font' + fontStyle]}`}
                    placeholder="각인문구를 입력해 보세요!"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <section className={styles.consoleSection}>

                <div className={styles.charCount}>
                    {text.length} / {maxLength}
                </div>

                <div className={styles.fontName}>
                    {fontStyle}번 폰트
                </div>

                <div className={styles.buttons}>
                    <button className={styles.empty} onClick={handleEmptyButtonClick}>지우기</button>
                    <button className={styles.copy} onClick={handleCopyButtonClick}>복사하기</button>
                </div>

                <div className={styles.emojiPannel}>
                    {emojis.map((_, idx) => <EmojiButton idx={idx} onClick={() => handleEmojiClick(idx)} key={idx} />)}
                    {/* {Array.from({length : 70}, (_, i) => i).map((i) => {
                        const c = `icon-${i+1}`
                        return <i className={styles[c]} key={i}></i>
                    })} */}
                </div>

                {/* <div className={styles.fontDescription}>{fontDescription}</div> */}

                <div className={styles.toggleGroup}>
                    {[1, 2, 3, 4, 5, 6].map((i) =>
                        <button
                            className={`${styles.toggleButton} ${i == fontStyle ? styles.active : ""}`}
                            onClick={() => setFontStyle(i)}
                            key={i}>
                            {i}<span>번 폰트</span>
                        </button>)}
                </div>
            </section>
        </main>
    );
}

function EmojiButton({
    onClick,
    idx,
}: {
    onClick: () => void
    idx: number
}) {
    const CurrentEmoji = emojis[idx]
    return (
        <a onClick={onClick}><CurrentEmoji /></a>
    )
}