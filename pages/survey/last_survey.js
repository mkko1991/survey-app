// 18 ~ 26 9 개씩
// 27 ~ 35
// 36 ~ 44
import {useRouter} from "next/router";
import {useSurveyStore} from "@/store/survey";

export default function Last_survey() {
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

    const nextStep = () => {
        if (Object.keys(answers).length === 37) router.push("/experiment/last");
        else alert("요구사항에 맞게 전부 입력해주세요.");
    }

    return (
        <div className="pre_survey-wrapper">
            <div className="pre_survey-container">
                <div className="pre_survey-header">성향에 관한 질문</div>

                <div className="pre_survey-box">
                    {renderLikertQuestion(
                        1,
                        '나는 종종 내가 희망하고 열망하는 것을 어떻게 이룰 수 있을지 상상한다.',
                        'q4'
                    )}
                    {renderLikertQuestion(
                        2,
                        '나는 실패를 방지하기보다 성공을 성취하는 것에 더욱 방향을 맞춘다.',
                        'q5'
                    )}
                    {renderLikertQuestion(
                        3,
                        '나는 선택해야 하는 상황에서 손실을 방지하는 안전한 방향에 대해 더 많이 생각한다.',
                        'q6'
                    )}
                    {renderLikertQuestion(
                        4,
                        '나는 종종 목표를 달성하지 못하여 실패할 것을 걱정한다.',
                        'q7'
                    )}
                    {renderLikertQuestion(
                        5,
                        '나는 내가 일상생활에서 좋지 않은 일이 생기지 않도록 예방하는 것에 초점을 맞춘다.',
                        'q8'
                    )}
                    {renderLikertQuestion(
                        6,
                        '나는 선택을 해야할 때 긍정적인 결과와 도전 방향에 대해 더 많이 생각한다.',
                        'q9'
                    )}
                    {renderLikertQuestion(
                        7,
                        '나는 종종 어떻게 나의 희망과 열망을 성취할 수 있을지 생각하고 노력한다.',
                        'q10'
                    )}
                    {renderLikertQuestion(
                        8,
                        '나는 종종 나에게 일어났으면 하는 좋은 일에 대해 생각한다.',
                        'q11'
                    )}
                    {renderLikertQuestion(
                        9,
                        '나는 이득을 얻는 것보다는 손실을 예방하는 것을 더욱 중요하게 생각한다.',
                        'q12'
                    )}
                    {renderLikertQuestion(
                        10,
                        '나는 종종 내게 일어날 수 있는 좋지 않은 일들에 대해 상상한다.',
                        'q13'
                    )}
                </div>
                <div className="pre_survey-box">
                    <button className={"pre_survey-next-button"} onClick={nextStep}>설문 마치기</button>
                </div>
            </div>
        </div>
    );
}