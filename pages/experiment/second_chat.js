import {useEffect, useState} from "react";
import {useSurveyStore} from "@/store/survey";
import {useRouter} from "next/router";

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
        <div className="second_chat-container">

            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>

            <img src="/first_chat/status_bar.png" className="second_status_bar"/>
            <img src="/first_chat/status_bar2.png" className="second_status_bar2"/>

            {end && <div className="second_chat-box">
                <div className="second_chat-image">
                    <img src={selectedImage}/>
                </div>
                <div className="second_chat-text">
                    {input}
                </div>
            </div>}

            {isFocused && !end && (<div className="second_imoji-container">
                    <div className="second_sticker-scroll">
                        <div className="second_category">나를 위한 추천 이모티콘</div>
                        {chunkArray(recommendedEmojis, 4).map((group, lineIndex) => (
                            <div key={`line-${lineIndex}`} className="second_grid">
                                {group.map((item, indexInGroup) => {
                                    const actualIndex = lineIndex * 4 + indexInGroup;
                                    return (
                                            <img
                                                key={actualIndex}
                                                onClick={(e) => onClickImage(actualIndex, e)}
                                                className={activeIndex === actualIndex ? 'second_imoji-img second_active' : 'second_imoji-img'}
                                                src={item}
                                                alt=""
                                            />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {!end && <div className="second_input-box">
                <div className="second_input-line">
                    <div className="second_plus">
                        <img src="/first_chat/plus.png"/>
                    </div>
                    <div className="second_text-box">
                        <div className="second_wrapper">
                            <textarea
                                className="second_input"
                                value={input}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="second_smile">
                        <img src="/first_chat/smile.png" onClick={() => setIsFocused(!isFocused)}/>
                    </div>
                    {activeIndex != null ?
                        <div className="second_send" onClick={() => setEnd(true)}>
                            <img src="/first_chat/send.png"/>
                        </div> :
                        <div className="second_shop">
                            <img src="/first_chat/shop.png"/>
                        </div>
                    }
                </div>
            </div>
            }
            {
                end &&
                <div className="second_next-button">
                    <img src="/first_chat/next_button.png" onClick={nextStep}/>
                </div>
            }
        </div>
    );
}