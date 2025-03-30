import { useEffect, useState } from "react";
import {useRouter} from "next/router";

export default function FirstChat() {
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [input, setInput] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [end, setEnd] = useState(null);

    useEffect(() => {
        window.addEventListener('focusin', () => {
            document.body.classList.add('keyboard-open');
        });
        window.addEventListener('focusout', () => {
            document.body.classList.remove('keyboard-open');
        });
    }, []);

    const highlight = (text) => {
        const escaped = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        return escaped.replace(/(생일\s?축하)/g, '<span class="first_highlight">$1</span>');
    };

    const handleChange = (e) => {
        const value = e.target.value;

        const pattern = /생일\s?축하/;

        if (pattern.test(value)) {
            setIsFocused(true);
        } else {
            setIsFocused(false);
        }

        setInput(value);
    }

    const onClickImage = (index, e) => {
        setActiveIndex(index);
        const value = e.target.src;
        setSelectedImage(value);
    }

    const items = [
        "/emoticon/1.png",
        "/emoticon/2.png",
        "/emoticon/3.png",
        "/emoticon/4.png",
        "/emoticon/5.png",
        "/emoticon/6.png",
        "/emoticon/7.png",
        "/emoticon/8.png"
    ];

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const nextStep = () => {
        router.push({
            pathname: "/survey/first_survey",
            query: { order: 1 }
        })
    }

    return (
        <div className="first_chat-container">

            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>

            <img src="/first_chat/status_bar.png" className="first_status_bar"/>
            <img src="/first_chat/status_bar2.png" className="first_status_bar2"/>

            {end && <div className="first_chat-box">
                <div className="first_chat-image">
                    <img src={selectedImage}/>
                </div>
                <div className="first_chat-text">
                    {input}
                </div>
            </div>}

            {isFocused && !end && (<div className="first_imoji-container">
                <div className="first_select-box">
                    <div className="first_chip selected">생일</div>
                    <div className="first_chip">축하</div>
                    <div className="first_chip">축하케이크</div>
                    <div className="first_chip">폭죽</div>
                    <div className="first_chip">선물</div>
                </div>
                    <div className="first_imoji-box">
                    {chunkArray(items, 4).map((group, lineIndex) => (
                        <div key={`line-${lineIndex}`} className="first_imoji-line">
                            {group.map((item, indexInGroup) => {
                                const actualIndex = lineIndex * 4 + indexInGroup;
                                return (
                                    <div key={actualIndex} className="first_imoji">
                                        <img
                                            onClick={(e) => onClickImage(actualIndex, e)}
                                            className={activeIndex === actualIndex ? 'first_imoji-img first_active' : 'first_imoji-img'}
                                            src={item}
                                            alt=""
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            )}
            {!end && <div className="first_input-box">
                <div className="first_input-line">
                    <div className="first_plus">
                        <img src="/first_chat/plus.png"/>
                    </div>
                    <div className="first_text-box">
                        <div className="first_wrapper">
                            <div
                                className="first_highlighter"
                                dangerouslySetInnerHTML={{ __html: highlight(input) + '\u200b' }} // ZWSP: 커서 깨짐 방지
                            />
                            <textarea
                                className="first_input"
                                value={input}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="first_smile">
                        <img src="/first_chat/smile.png"/>
                    </div>
                    {activeIndex != null ?
                        <div className="first_send" onClick={() => setEnd(true)}>
                            <img src="/first_chat/send.png"/>
                        </div> :
                        <div className="first_shop">
                            <img src="/first_chat/shop.png"/>
                        </div>
                    }
                </div>
            </div>
            }
            {
                end &&
                <div className ="next-button">
                    <img src="/first_chat/next_button.png" onClick={nextStep}/>
                </div>
            }
        </div>
    );
}