import {useRouter} from "next/router";
import {useSurveyStore} from "@/store/survey";

export default function PreSurvey() {
    const router = useRouter();

    const {
        email,
        age,
        gender,
        job,
        answers,
        usageTime,
        emojiFreq,
        platforms,
        platformEtc,
        favoriteEmojis,
        setGender,
        setAge,
        setJob,
        setAnswers,
        setUsageTime,
        setEmojiFreq,
        setPlatforms,
        setPlatformEtc,
        setFavoriteEmojis,
        setRecommendedEmojis
    } = useSurveyStore();

    const isOtherChecked = platforms.includes('기타');

    const apps = [
        '카카오톡(KakaoTalk)',
        '라인(Line Messenger)',
        '페이스북 메신저(Facebook Messenger)',
        '인스타그램 DM(Instagram DM)',
        '왓츠앱(WhatsApp)'
    ]

    const emojis = [
        "/emoticon/first.png",
        "/emoticon/second.png",
        "/emoticon/third.png",
        "/emoticon/fourth.png",
        "/emoticon/fifth.png",
        "/emoticon/sixth.png",
        "/emoticon/seventh.png",
        "/emoticon/eighth.png",
        "/emoticon/ninth.png",
        "/emoticon/tenth.png",
    ];

    const onChangePlatform = (e) => {
        const {value} = e.target;
        let copiedPlatforms = platforms;

        if (!copiedPlatforms.includes(value)) copiedPlatforms.push(value);
        else {
            copiedPlatforms = copiedPlatforms.filter(p => p !== value);
        }

        setPlatforms(copiedPlatforms);
    }

    async function getFileList(dirPath) {
        const res = await fetch(`/api/files?dir=${dirPath}`);
        return await res.json();
    }

    function shuffle(array) {
        const result = [...array]; // 원본 유지하고 복사
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
            [result[i], result[j]] = [result[j], result[i]]; // swap
        }
        return result;
    }

    const onChangeEmoji = async (e) => {
        const {value} = e.target;
        let copiedEmojis = favoriteEmojis;

        if (!copiedEmojis.includes(value) && copiedEmojis.length <= 2) copiedEmojis.push(value);
        else {
            copiedEmojis = copiedEmojis.filter(p => p !== value);
        }

        let recommendedEmojis = [];

        for (const emoji of copiedEmojis) {
            if (emoji.includes("first")) {
                const fileList = await (getFileList("/emoticon/first"));
                recommendedEmojis.push(...fileList);
            }

            if (emoji.includes("second")) {
                const fileList = await (getFileList("/emoticon/second"));
                recommendedEmojis.push(...fileList);
            }

            if (emoji.includes("third")) {
                const fileList = await (getFileList("/emoticon/third"));
                recommendedEmojis.push(...fileList);
            }

            if (emoji.includes("fourth")) {
                const fileList = await (getFileList("/emoticon/fourth"));
                recommendedEmojis.push(...fileList);
            }
        }

        const shuffledEmojis = shuffle(recommendedEmojis);
        setFavoriteEmojis(copiedEmojis);
        setRecommendedEmojis(shuffledEmojis);
    }

    const ableNextStep = () => {
        // TODO 조건문 추가.
        /* answers
        platforms,
            platformEtc,
            favoriteEmojis,*/
        if (email && age && gender && job && usageTime && emojiFreq && (favoriteEmojis.length >= 2)) router.push("/experiment/first");
        else alert("요구사항에 맞게 전부 입력해주세요.");
    }

    const renderLikertQuestion = (number, text, name) => {
        return (
            <div className="pre_likert-question">
                <p>{number}. {text}</p>
                <div className="pre_likert-scale">
                    {[1, 2, 3, 4, 5].map((val) => (
                        <label key={val}>
                            <input
                                type="radio"
                                name={name}
                                value={val}
                                onChange={() => setAnswers(name, val)}
                            />
                            {val}
                        </label>
                    ))}
                </div>
                <div className="pre_likert-labels">
                    <span>전혀 그렇지 않다</span>
                    <span>매우 그렇다</span>
                </div>
            </div>
        );
    };
    const isPlatformLimitReached = platforms.length >= 2;


    return (
        <div className="pre_survey-wrapper">
            <div className="pre_survey-container">
                <div className="pre_survey-header">인구통계학적 특성에 관한 질문</div>

                <div className="pre_survey-box">
                    <div className="pre_survey-question">
                        <p>1. 귀하의 성별을 선택해 주세요</p>
                        <div className="pre_survey-options">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                여자
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                남자
                            </label>
                        </div>
                    </div>

                    <div className="pre_survey-question">
                        <p>2. 귀하의 연령대를 선택해 주세요. (만 나이 기준)</p>
                        <div className="pre_survey-options">
                            {['10대', '20대', '30대', '40대', '50대 이상'].map((age) => (
                                <label key={age}>
                                    <input
                                        type="radio"
                                        name="age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                    {age}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pre_survey-question">
                        <p>3. 귀하의 직업을 선택해 주세요.</p>
                        <div className="pre_survey-options">
                            {['사무직', '생산/기술직', '전문직', '서비스/영업직', '자영업', '무직', '학생', '전업주부', '기타'].map((job) => (
                                <label key={job}>
                                    <input
                                        type="radio"
                                        name="job"
                                        value={job}
                                        onChange={(e) => setJob(e.target.value)}/>
                                    {job}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pre_survey-header">성향에 관한 질문</div>

                <div className="pre_survey-box">
                    {renderLikertQuestion(
                        4,
                        '나는 종종 내가 희망하고 열망하는 것을 어떻게 이룰 수 있을지 상상한다.',
                        'q4'
                    )}
                    {renderLikertQuestion(
                        5,
                        '나는 실패를 방지하기보다 성공을 성취하는 것에 더욱 방향을 맞춘다.',
                        'q5'
                    )}
                    {renderLikertQuestion(
                        6,
                        '나는 선택해야 하는 상황에서 손실을 방지하는 안전한 방향에 대해 더 많이 생각한다.',
                        'q6'
                    )}
                    {renderLikertQuestion(
                        7,
                        '나는 종종 목표를 달성하지 못하여 실패할 것을 걱정한다.',
                        'q7'
                    )}
                    {renderLikertQuestion(
                        8,
                        '나는 내가 일상생활에서 좋지 않은 일이 생기지 않도록 예방하는 것에 초점을 맞춘다.',
                        'q8'
                    )}
                    {renderLikertQuestion(
                        9,
                        '나는 선택을 해야할 때 긍정적인 결과와 도전 방향에 대해 더 많이 생각한다.',
                        'q9'
                    )}
                    {renderLikertQuestion(
                        10,
                        '나는 종종 어떻게 나의 희망과 열망을 성취할 수 있을지 생각하고 노력한다.',
                        'q10'
                    )}
                    {renderLikertQuestion(
                        11,
                        '나는 종종 나에게 일어났으면 하는 좋은 일에 대해 생각한다.',
                        'q11'
                    )}
                    {renderLikertQuestion(
                        12,
                        '나는 이득을 얻는 것보다는 손실을 예방하는 것을 더욱 중요하게 생각한다.',
                        'q12'
                    )}
                    {renderLikertQuestion(
                        13,
                        '나는 종종 내게 일어날 수 있는 좋지 않은 일들에 대해 상상한다.',
                        'q13'
                    )}
                </div>

                <div className="pre_survey-header">이모티콘 이용 빈도에 관한 질문</div>

                <div className="pre_survey-box">
                    <div className="pre_survey-question">
                        <p>14. 평소 모바일 메신저를 하루에 얼마나 자주 사용하시나요?</p>
                        <div className="pre_survey-options">
                            {[
                                '1시간 미만',
                                '1시간 ~ 2시간',
                                '2시간 ~ 3시간',
                                '3시간 ~ 4시간',
                                '4시간 ~ 5시간',
                                '5시간 이상',
                            ].map((opt) => (
                                <label key={opt}>
                                    <input
                                        type="radio"
                                        name="q14"
                                        value={opt}
                                        onChange={(e) => setUsageTime(e.target.value)}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pre_survey-question">
                        <p>15. 평소 모바일 메신저에서 이모티콘을 얼마나 자주 사용하시나요?</p>
                        <div className="pre_survey-options">
                            {[
                                '거의 사용하지 않는다',
                                '가끔 사용한다 (10건 중 1~2건)',
                                '보통 사용한다 (10건 중 3~5건)',
                                '자주 사용한다 (10건 중 6~8건)',
                                '매우 자주 사용한다 (거의 모든 메시지에 포함)',
                            ].map((opt) => (
                                <label key={opt}>
                                    <input
                                        type="radio"
                                        name="q15"
                                        value={opt}
                                        onChange={(e) => setEmojiFreq(e.target.value)}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pre_survey-question">
                        <p>16. 평소 가장 자주 사용하는 메신저 앱을 선택해 주세요. <span className="pre_required">(최대 2개)</span></p>
                        <div className="pre_survey-options">
                            {apps.map((opt) => {
                                const isChecked = platforms.includes(opt);
                                return (
                                    <label key={opt}>
                                        <input
                                            type="checkbox"
                                            name="q16"
                                            value={opt}
                                            checked={isChecked}
                                            onChange={onChangePlatform}
                                            disabled={isPlatformLimitReached && !isChecked}
                                        />
                                        {opt}
                                    </label>
                                );
                            })}
                            <label>
                                <input
                                    type="checkbox"
                                    name="q16"
                                    value="기타"
                                    checked={isOtherChecked}
                                    onChange={onChangePlatform}
                                    disabled={isPlatformLimitReached && !isOtherChecked}
                                />
                                기타
                            </label>
                            {isOtherChecked && (
                                <input
                                    type="text"
                                    className="pre_other-input"
                                    placeholder="앱 이름을 입력해 주세요"
                                    onChange={(e) => setPlatformEtc(e.target.value)}
                                />
                            )}
                        </div>
                    </div>

                    <div className="pre_survey-question">
                        <p>17. 선호하는 이모티콘 선택 <span className="pre_required">(필수★ 2개 이상 선택해 주세요)</span></p>
                        <div className="pre_emoji-grid">
                            {emojis.map((emoji) => {
                                const isEmojiChecked = favoriteEmojis.includes(emoji);
                                return (
                                    <label key={emoji} className="pre_emoji-option">
                                        <input
                                            type="checkbox"
                                            name="q17"
                                            value={emoji}
                                            checked={isEmojiChecked}
                                            onChange={onChangeEmoji}
                                        />
                                        <img src={emoji}/>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="pre_survey-box">
                    <button className={"pre_survey-next-button"} onClick={ableNextStep}>다음 인터페이스 유형 실험 시작하기</button>
                </div>
            </div>
        </div>
    );
}
