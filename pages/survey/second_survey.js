// 18 ~ 26 9 개씩
// 27 ~ 35
// 36 ~ 44
import {useRouter} from "next/router";
import {useSurveyStore} from "@/store/survey";

export default function Second_survey() {
    const router = useRouter();

    const {
        answers,
        setAnswers,
    } = useSurveyStore();

    const renderLikertQuestion = (number, text, name) => {
        return (
            <div className="pre_likert-question">
                <p>{number}. {text}</p>
                <div className="pre_likert-scale">
                    {[1, 2, 3, 4, 5].map((val) => {
                        const key = name + (18 + (router.query.order - 1) * 9 + (number - 1));
                        return (
                            <label key={val}>
                                <input
                                    type="radio"
                                    name={key}
                                    value={val}
                                    onChange={() => setAnswers(key, val)}
                                />
                                {val}
                            </label>
                        );
                    })}
                </div>
                <div className="pre_likert-labels">
                    <span>전혀 그렇지 않다</span>
                    <span>매우 그렇다</span>
                </div>
            </div>
        );
    };

    const nextStep = () => {
        if (Object.keys(answers).length === 18) router.push("/experiment/third");
        else alert("요구사항에 맞게 전부 입력해주세요.");
    }

    return (
        <div className="pre_survey-wrapper">
            <div className="pre_survey-container">
                <img src="/first/survey.png" className="first_survey_header_img"/>
                <div className="pre_survey-header">사용자 경험에 관한 질문</div>

                <div className="pre_survey-box">
                    {renderLikertQuestion(
                        1,
                        '이 인터페이스는 사용하기 쉬웠다.',
                        'q'
                    )}
                </div>
                <div className="pre_survey-box">
                    {renderLikertQuestion(
                        2,
                        '이 인터페이스에서 이모티콘을 선택하는 과정은 간단했다.',
                        'q'
                    )}
                </div>
                <div className="pre_survey-box">
                    {renderLikertQuestion(
                        3,
                        '이 인터페이스는 직관적으로 구성되어 있었다.',
                        'q'
                    )}
                </div>
                <div className="pre_survey-box">
                    {renderLikertQuestion(
                        4,
                        '이 인터페이스는 메시지를 더 효율적으로 작성하는 데 도움이 되었다.',
                        'q'
                    )}
                </div>
                <div className="pre_survey-box">
                    {renderLikertQuestion(
                        5,
                        '이 인터페이스는 내가 원하는 이모티콘을 쉽게 찾도록 도와주었다.',
                        'q'
                    )}
                </div>
                <div className="pre_survey-box">
                    {renderLikertQuestion(
                        6,
                        '이 인터페이스는 메시지를 작성하는 데 유용했다.',
                        'q'
                    )}
                </div>
                <div className="pre_survey-box">
                    {renderLikertQuestion(
                        7,
                        '이 인터페이스를 사용하는 것이 전반적으로 만족스러웠다.',
                        'q'
                    )}
                </div>
                <div className="pre_survey-box">
                    {renderLikertQuestion(
                        8,
                        '이 인터페이스에 대해 전반적으로 긍정적인 인상을 받았다.',
                        'q'
                    )}
                </div>
                <div className="pre_survey-box">
                    {renderLikertQuestion(
                        9,
                        '이 인터페이스는 내가 기대했던 수준에 충족했다.',
                        'q'
                    )}
                </div>
                <div className="pre_survey-box">
                    <button className={"pre_survey-next-button"} onClick={nextStep}>다음 인터페이스 유형 실험 시작하기</button>
                </div>
            </div>
        </div>
    );
}