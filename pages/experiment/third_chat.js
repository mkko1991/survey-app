import { useEffect, useState, useRef } from "react";
import {useRouter} from "next/router";

export default function ThirdChat() {
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [input, setInput] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [end, setEnd] = useState(null);
    const [activeTab, setActiveTab] = useState(null);
    const categoryRefs = useRef([]);

    useEffect(() => {
        window.addEventListener('focusin', () => {
            document.body.classList.add('keyboard-open');
        });
        window.addEventListener('focusout', () => {
            document.body.classList.remove('keyboard-open');
        });
    }, []);

    useEffect(() => {
        const scrollContainer = document.querySelector('.third_sticker-scroll');

        const handleScroll = () => {
            console.log(isUserScrolling.current);
            if (!isUserScrolling.current) return;

            const containerTop = scrollContainer.getBoundingClientRect().top;

            let closestIndex = -1;
            let closestDistance = Infinity;

            categoryRefs.current.forEach((ref, index) => {
                if (ref) {
                    const top = ref.getBoundingClientRect().top;
                    const distance = Math.abs(top - containerTop);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIndex = index;
                    }
                }
            });

            if (closestIndex !== -1 && activeTab !== closestIndex + 1) {
                setActiveTab(closestIndex + 1);
            }
        };

        scrollContainer?.addEventListener('scroll', handleScroll);
        return () => scrollContainer?.removeEventListener('scroll', handleScroll);
    }, [activeTab]);

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
        if (![16, 17, 18, 19].includes(activeIndex)) {
            alert("축하 / 이벤트 이모티콘을 선택 해야 합니다.");
            return;
        }

        setEnd(true);
    }

    const onClickTab = (index, e) => {
        setActiveTab(index);
        isUserScrolling.current = false;

        const targetRef = categoryRefs.current[index - 1];
        if (targetRef) {
            targetRef.scrollIntoView({ behavior: 'smooth', block: 'start' });

            setTimeout(() => {
                isUserScrolling.current = true;
            }, 500);
        }
    }

    const onClickSmile = (focused) => {
        setIsFocused(focused);
        onClickTab(1);
        isUserScrolling.current = focused;
    }

    const isUserScrolling = useRef(true);

    return (
        <div className="third_chat-container">

            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>

            <img src="/first_chat/status_bar.png" className="third_status_bar"/>
            <img src="/first_chat/status_bar2.png" className="third_status_bar2"/>
            <img src="/first_chat/friend_chat.png" className="third_friend_chat"/>

            {end && <div className="third_chat-box">
                <div className="third_chat-image">
                    <img src={selectedImage}/>
                </div>
                <div className="third_chat-text">
                    {input}
                </div>
            </div>}

            {isFocused && !end && (<div className="third_imoji-container">
                    <div className="thrid_imoji-tab">
                        <div className={activeTab === 1 ? "third_imoji-tab-box active" : "third_imoji-tab-box"} onClick={(e) => onClickTab(1)}>
                            <img src="/tab/hello.png"/>
                        </div>
                        <div className={activeTab === 2 ? "third_imoji-tab-box active" : "third_imoji-tab-box"} onClick={(e) => onClickTab(2)}>
                            <img src="/tab/like.png"/>
                        </div>
                        <div className={activeTab === 3 ? "third_imoji-tab-box active" : "third_imoji-tab-box"} onClick={(e) => onClickTab(3)}>
                            <img src="/tab/cheer.png"/>
                        </div>
                        <div className={activeTab === 4 ? "third_imoji-tab-box active" : "third_imoji-tab-box"} onClick={(e) => onClickTab(4)}>
                            <img src="/tab/donut.png"/>
                        </div>
                        <div className={activeTab === 5 ? "third_imoji-tab-box active" : "third_imoji-tab-box"} onClick={(e) => onClickTab(5)}>
                            <img src="/tab/confetti.png"/>
                        </div>
                        <div className={activeTab === 6 ? "third_imoji-tab-box active" : "third_imoji-tab-box"} onClick={(e) => onClickTab(6)}>
                            <img src="/tab/cat.png"/>
                        </div>
                        <div className={activeTab === 7 ? "third_imoji-tab-box active" : "third_imoji-tab-box"} onClick={(e) => onClickTab(7)}>
                            <img src="/tab/hearts.png"/>
                        </div>
                    </div>
                    <div className="third_sticker-scroll">
                        <div className="third_category" ref={(el) => categoryRefs.current[0] = el}>
                            <div className="third_category_text">인사</div>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/17.png" onClick={(e) => onClickImage(0, e)}
                                 className={activeIndex === 0 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/18.png" onClick={(e) => onClickImage(1, e)}
                                 className={activeIndex === 1 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/19.png" onClick={(e) => onClickImage(2, e)}
                                 className={activeIndex === 2 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/20.png" onClick={(e) => onClickImage(3, e)}
                                 className={activeIndex === 3 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/45.png" onClick={(e) => onClickImage(28, e)}
                                 className={activeIndex === 28 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/46.png" onClick={(e) => onClickImage(29, e)}
                                 className={activeIndex === 29 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/47.png" onClick={(e) => onClickImage(30, e)}
                                 className={activeIndex === 30 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/48.png" onClick={(e) => onClickImage(31, e)}
                                 className={activeIndex === 31 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>

                        <div className="third_category" ref={(el) => categoryRefs.current[1] = el}>
                            <div className="third_category_text">감사 / 사과</div>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/21.png" onClick={(e) => onClickImage(4, e)}
                                 className={activeIndex === 4 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/22.png" onClick={(e) => onClickImage(5, e)}
                                 className={activeIndex === 5 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/23.png" onClick={(e) => onClickImage(6, e)}
                                 className={activeIndex === 6 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/24.png" onClick={(e) => onClickImage(7, e)}
                                 className={activeIndex === 7 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/49.png" onClick={(e) => onClickImage(32, e)}
                                 className={activeIndex === 32 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/50.png" onClick={(e) => onClickImage(33, e)}
                                 className={activeIndex === 33 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/51.png" onClick={(e) => onClickImage(34, e)}
                                 className={activeIndex === 34 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/52.png" onClick={(e) => onClickImage(35, e)}
                                 className={activeIndex === 35 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>

                        <div className="third_category" ref={(el) => categoryRefs.current[2] = el}>
                            <div className="third_category_text">응원 / 격려</div>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/25.png" onClick={(e) => onClickImage(8, e)}
                                 className={activeIndex === 8 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/26.png" onClick={(e) => onClickImage(9, e)}
                                 className={activeIndex === 9 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/27.png" onClick={(e) => onClickImage(10, e)}
                                 className={activeIndex === 10 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/28.png" onClick={(e) => onClickImage(11, e)}
                                 className={activeIndex === 11 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/53.png" onClick={(e) => onClickImage(36, e)}
                                 className={activeIndex === 36 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/54.png" onClick={(e) => onClickImage(37, e)}
                                 className={activeIndex === 37 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/55.png" onClick={(e) => onClickImage(38, e)}
                                 className={activeIndex === 38 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/56.png" onClick={(e) => onClickImage(39, e)}
                                 className={activeIndex === 39 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>

                        <div className="third_category" ref={(el) => categoryRefs.current[3] = el}>
                            <div className="third_category_text">음식</div>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/29.png" onClick={(e) => onClickImage(12, e)}
                                 className={activeIndex === 12 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/30.png" onClick={(e) => onClickImage(13, e)}
                                 className={activeIndex === 13 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/31.png" onClick={(e) => onClickImage(14, e)}
                                 className={activeIndex === 14 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/32.png" onClick={(e) => onClickImage(15, e)}
                                 className={activeIndex === 15 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/57.png" onClick={(e) => onClickImage(40, e)}
                                 className={activeIndex === 40 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/58.png" onClick={(e) => onClickImage(41, e)}
                                 className={activeIndex === 41 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/59.png" onClick={(e) => onClickImage(42, e)}
                                 className={activeIndex === 42 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/60.png" onClick={(e) => onClickImage(43, e)}
                                 className={activeIndex === 43 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>

                        <div className="third_category" ref={(el) => categoryRefs.current[4] = el}>
                            <div className="third_category_text">축하 / 이벤트</div>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/41.png" onClick={(e) => onClickImage(16, e)}
                                 className={activeIndex === 16 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/42.png" onClick={(e) => onClickImage(17, e)}
                                 className={activeIndex === 17 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/43.png" onClick={(e) => onClickImage(18, e)}
                                 className={activeIndex === 18 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/44.png" onClick={(e) => onClickImage(19, e)}
                                 className={activeIndex === 19 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/61.png" onClick={(e) => onClickImage(44, e)}
                                 className={activeIndex === 44 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/62.png" onClick={(e) => onClickImage(45, e)}
                                 className={activeIndex === 45 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/63.png" onClick={(e) => onClickImage(46, e)}
                                 className={activeIndex === 46 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/64.png" onClick={(e) => onClickImage(47, e)}
                                 className={activeIndex === 47 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>

                        <div className="third_category" ref={(el) => categoryRefs.current[5] = el}>
                            <div className="third_category_text">동물 / 자연</div>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/33.png" onClick={(e) => onClickImage(20, e)}
                                 className={activeIndex === 20 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/34.png" onClick={(e) => onClickImage(21, e)}
                                 className={activeIndex === 21 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/35.png" onClick={(e) => onClickImage(22, e)}
                                 className={activeIndex === 22 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/36.png" onClick={(e) => onClickImage(23, e)}
                                 className={activeIndex === 23 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/65.png" onClick={(e) => onClickImage(48, e)}
                                 className={activeIndex === 48 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/66.png" onClick={(e) => onClickImage(49, e)}
                                 className={activeIndex === 49 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/67.png" onClick={(e) => onClickImage(50, e)}
                                 className={activeIndex === 50 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/68.png" onClick={(e) => onClickImage(51, e)}
                                 className={activeIndex === 51 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>

                        <div className="third_category" ref={(el) => categoryRefs.current[6] = el}>
                            <div className="third_category_text">애정</div>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/37.png" onClick={(e) => onClickImage(24, e)}
                                 className={activeIndex === 24 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/38.png" onClick={(e) => onClickImage(25, e)}
                                 className={activeIndex === 25 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/39.png" onClick={(e) => onClickImage(26, e)}
                                 className={activeIndex === 26 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/40.png" onClick={(e) => onClickImage(27, e)}
                                 className={activeIndex === 27 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>
                        <div className="third_grid">
                            <img src="/emoticon/69.png" onClick={(e) => onClickImage(52, e)}
                                 className={activeIndex === 52 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/70.png" onClick={(e) => onClickImage(53, e)}
                                 className={activeIndex === 53 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/71.png" onClick={(e) => onClickImage(54, e)}
                                 className={activeIndex === 54 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                            <img src="/emoticon/72.png" onClick={(e) => onClickImage(55, e)}
                                 className={activeIndex === 55 ? 'third_imoji-img third_active' : 'third_imoji-img'}/>
                        </div>
                    </div>
                </div>
            )}
            {!end && <div className="third_input-box">
                <div className="third_input-line">
                    <div className="third_plus">
                        <img src="/first_chat/plus.png"/>
                    </div>
                    <div className="third_text-box">
                        <div className="third_wrapper">
                            <textarea
                                style={{ fontSize: '16px' }}
                                className="third_input"
                                value={input}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="third_smile">
                        <img src="/first_chat/tooltip.png" className={!isFocused ? "imoji_tooltip" : "imoji_tooltip-hide"}/>
                        <img src="/first_chat/smile.png" onClick={() => onClickSmile(!isFocused)}/>
                    </div>
                    {activeIndex != null ?
                        <div className="third_send" onClick={handleSend}>
                            <img src="/first_chat/send.png"/>
                        </div> :
                        <div className="third_shop">
                            <img src="/first_chat/shop.png"/>
                        </div>
                    }
                </div>
            </div>
            }
            {
                end &&
                <div className="third_next-button">
                    <img src="/first_chat/next_button.png" onClick={nextStep}/>
                </div>
            }
        </div>
    );
}