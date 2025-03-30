import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import "@/styles/third_chat.css"

export default function ThirdChat() {
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

    const handleChange = (e) => {
        const value = e.target.value;

        setInput(value);
    }

    const onClickImage = (index, e) => {
        setActiveIndex(index);
        const value = e.target.src;
        setSelectedImage(value);
    }

    const nextStep = () => {
        router.push({
            pathname: "/survey/third_survey",
            query: { order: 3 }
        })
    }

    const handleSend = () => {
        if (![24, 25, 26, 27].includes(activeIndex)) {
            alert("축하 / 이벤트 이모티콘을 선택 해야 합니다.");
            return;
        }

        setEnd(true);
    }

    return (
        <div className="chat-container">

            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>

            <img src="/first_chat/status_bar.png" className="status_bar"/>
            <img src="/first_chat/status_bar2.png" className="status_bar2"/>

            {end && <div className="chat-box">
                <div className="chat-image">
                    <img src={selectedImage}/>
                </div>
                <div className="chat-text">
                    {input}
                </div>
            </div>}

            {isFocused && !end && (<div className="imoji-container">
                    <div className="sticker-scroll">
                        <div className="category">인사</div>
                        <div className="grid">
                            <img src="/emoticon/17.png" onClick={(e) => onClickImage(0, e)} className={activeIndex === 0 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/18.png" onClick={(e) => onClickImage(1, e)} className={activeIndex === 1 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/19.png" onClick={(e) => onClickImage(2, e)} className={activeIndex === 2 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/20.png" onClick={(e) => onClickImage(3, e)} className={activeIndex === 3 ? 'imoji-img active' : 'imoji-img'} />
                        </div>

                        <div className="category">감사 / 사과</div>
                        <div className="grid">
                            <img src="/emoticon/21.png" onClick={(e) => onClickImage(4, e)} className={activeIndex === 4 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/22.png" onClick={(e) => onClickImage(5, e)} className={activeIndex === 5 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/23.png" onClick={(e) => onClickImage(6, e)} className={activeIndex === 6 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/24.png" onClick={(e) => onClickImage(7, e)} className={activeIndex === 7 ? 'imoji-img active' : 'imoji-img'} />
                        </div>

                        <div className="category">응원 / 격려</div>
                        <div className="grid">
                            <img src="/emoticon/25.png" onClick={(e) => onClickImage(8, e)} className={activeIndex === 8 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/26.png" onClick={(e) => onClickImage(9, e)} className={activeIndex === 9 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/27.png" onClick={(e) => onClickImage(10, e)} className={activeIndex === 10 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/28.png" onClick={(e) => onClickImage(11, e)} className={activeIndex === 11 ? 'imoji-img active' : 'imoji-img'} />
                        </div>

                        <div className="category">음식</div>
                        <div className="grid">
                            <img src="/emoticon/29.png" onClick={(e) => onClickImage(12, e)} className={activeIndex === 12 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/30.png" onClick={(e) => onClickImage(13, e)} className={activeIndex === 13 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/31.png" onClick={(e) => onClickImage(14, e)} className={activeIndex === 14 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/32.png" onClick={(e) => onClickImage(15, e)} className={activeIndex === 15 ? 'imoji-img active' : 'imoji-img'} />
                        </div>

                        <div className="category">동물 / 자연</div>
                        <div className="grid">
                            <img src="/emoticon/33.png" onClick={(e) => onClickImage(16, e)} className={activeIndex === 16 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/34.png" onClick={(e) => onClickImage(17, e)} className={activeIndex === 17 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/35.png" onClick={(e) => onClickImage(18, e)} className={activeIndex === 18 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/36.png" onClick={(e) => onClickImage(19, e)} className={activeIndex === 19 ? 'imoji-img active' : 'imoji-img'} />
                        </div>

                        <div className="category">애정</div>
                        <div className="grid">
                            <img src="/emoticon/37.png" onClick={(e) => onClickImage(20, e)} className={activeIndex === 20 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/38.png" onClick={(e) => onClickImage(21, e)} className={activeIndex === 21 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/39.png" onClick={(e) => onClickImage(22, e)} className={activeIndex === 22 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/40.png" onClick={(e) => onClickImage(23, e)} className={activeIndex === 23 ? 'imoji-img active' : 'imoji-img'} />
                        </div>

                        <div className="category">축하 / 이벤트</div>
                        <div className="grid">
                            <img src="/emoticon/41.png" onClick={(e) => onClickImage(24, e)} className={activeIndex === 24 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/42.png" onClick={(e) => onClickImage(25, e)} className={activeIndex === 25 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/43.png" onClick={(e) => onClickImage(26, e)} className={activeIndex === 26 ? 'imoji-img active' : 'imoji-img'} />
                            <img src="/emoticon/44.png" onClick={(e) => onClickImage(27, e)} className={activeIndex === 27 ? 'imoji-img active' : 'imoji-img'} />
                        </div>
                    </div>
            </div>
            )}
            {!end && <div className="input-box">
                <div className="input-line">
                    <div className="plus">
                        <img src="/first_chat/plus.png"/>
                    </div>
                    <div className="text-box">
                        <div className="wrapper">
                            <textarea
                                className="input"
                                value={input}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="smile">
                        <img src="/first_chat/smile.png" onClick={() => setIsFocused(!isFocused)}/>
                    </div>
                    {activeIndex != null ?
                        <div className="send" onClick={handleSend}>
                            <img src="/first_chat/send.png"/>
                        </div> :
                        <div className="shop">
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