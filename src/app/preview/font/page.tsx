'use client';

import { useRef, useState } from 'react';
import styles from './page.module.scss';
import emojis from './svgIcons';

const emojiDict: { [key: number]: string } = {
    1: '🐶',
    2: '🐱',
    3: '😊',
    4: '👦',
    5: '👶',
    6: '💓',
    7: '😏',
    8: '🙂',
    9: '🎀',
    10: '✴',
    11: '✨',
    12: '⚝',
    13: '💖',
    14: '❤',
    15: '🎵',
    16: '🍎',
    17: '🍏',
    18: '🔋',
    19: '💗',
    20: '🪫',
    21: '☁',
    22: '☀',
    23: '🌻',
    24: '🍒',
    25: '🌹',
    26: '😋',
    27: '🐻',
    28: '☘',
    29: '🐰',
    30: '🌞',
    31: '🌙',
    32: '🌒',
    33: '🌿',
    34: '🥦',
    35: '🍃',
    36: '🍁',
    37: '👻',
    38: '🍞',
    39: '🍕',
    40: '🍔',
    41: '🥣',
    42: '🥄',
    43: '🍴',
    44: '🔴',
    45: '🐟',
    46: '🍦',
    47: '🍧',
    48: '🍨',
    49: '🥝',
    50: '🥘',
    51: '🍛',
    52: '🥡',
    53: '✂',
    54: '💃',
    55: '🥳',
    56: '👯',
    57: '🎊',
    58: '🧙',
    59: '🎂',
    60: '🎉',
    61: '🏠',
    62: '🏘',
    63: '🏎',
    64: '🚓',
    65: '💬',
    66: '🗨',
    67: '🗯',
    68: '👁',
    69: '🗩',
    70: '🗫',
}

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

    return (
        <main className={styles.container}>

            <div className={styles.flexWrapper}>
                <textarea
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
                    한글 ({fontStyle})
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
                            <span>한글(</span>{i}<span>)</span>
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