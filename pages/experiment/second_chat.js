import {useEffect, useState} from "react";
import {useSurveyStore} from "@/store/survey";
import {useRouter} from "next/router";
import "@/styles/second_chat.css"

export default function SecondChat() {
    const {recommendedEmojis} = useSurveyStore();
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

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const nextStep = () => {
        router.push({
            pathname: "/survey/second_survey",
            query: {order: 2}
        })
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
                        <div className="category">나를 위한 추천 이모티콘</div>
                        {chunkArray(recommendedEmojis, 4).map((group, lineIndex) => (
                            <div key={`line-${lineIndex}`} className="grid">
                                {group.map((item, indexInGroup) => {
                                    const actualIndex = lineIndex * 4 + indexInGroup;
                                    return (
                                        <div key={actualIndex}>
                                            <img
                                                onClick={(e) => onClickImage(actualIndex, e)}
                                                className={activeIndex === actualIndex ? 'imoji-img active' : 'imoji-img'}
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
                        <div className="send" onClick={() => setEnd(true)}>
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
                <div className="next-button">
                    <img src="/first_chat/next_button.png" onClick={nextStep}/>
                </div>
            }
        </div>
    );
}