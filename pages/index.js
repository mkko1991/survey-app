import {useRouter} from "next/router";
import {useSurveyStore} from "@/store/survey";
import {useState} from "react";

export async function getServerSideProps() {
    return {
        props: {
            message: "SSR 페이지 정상 동작 중!",
        },
    };
}

export default function SurveyForm({message}) {
    const { name, age, setName, setAge } = useSurveyStore();
    const router = useRouter();
    const [check, setCheck] = useState(false);

    const handleSubmit = (e) => {
        router.push('/survey/pre_survey');
    };

    return (
        <main className="p-4 body">
            <div style={{"display": "none"}}>{message}</div>
            <h2>이모티콘 추천 인터페이스 연구</h2>

            <p>안녕하세요! 😊<br/>
                이 설문은 석사학위 논문 연구의 일환으로,
                <span style={{ "font-weight": "bold" }}>이모티콘 추천 인터페이스가 사용자 경험(편리성, 유용성, 만족도)에 어떤 영향을 미치는지를</span> 분석하고자 합니다.</p>
            <br/>

            <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8', fontSize: '16px' }}>
                <p>💬 <strong>실험 진행은</strong></p>

                <p>1. 사전 설문 응답</p>
                <p>2. 인터페이스 체험 + 메시지 작성 과제</p>
                <p>3. 사용자 경험 평가 설문</p>

                <p>
                    순서로 진행 되며, <strong>총 소요 시간은 약 20분</strong>입니다.
                </p>

                <br />

                <p>📅 <strong>설문 마감:</strong> 4월 11일(목) 밤 11:59까지</p>

                <p>여러분의 응답은 실험에 직접 반영됩니다.</p>
                <p><strong>신중한 참여</strong> 부탁드려요! 🙏</p>

                <br />

                <p>연구에 참여해 주셔서 다시 한번 감사드립니다. 🙇</p>
                <p>궁금한 점이 있다면 언제든지 편하게 문의 주세요!</p>

                <br />

                <p>💌 <strong>문의:</strong> <a href="mailto:imji1204@gmail.com">imji1204@gmail.com</a></p>
            </div>
            <div className="line"/>
            <div>
                <h2>개인정보 보호 및 데이터 활용</h2>
                <p>- 본 연구에서 수집된 데이터는 익명 처리되며, 연구 목적 외에는 사용되지 않습니다.</p>
                <p>- 설문 응답 내용은 익명으로 처리되며, 연구 목적으로만 활용됩니다.</p>
                <p>- 연구 종료 후 모든 데이터는 보안이 유지된 환경에서 관리되며, 일정 기간 후 폐기됩니다.</p>
                <p>- 연구 결과는 논문 및 학술 발표에서 개인 식별이 불가능한 형태로만 사용됩니다.</p>

                <label key={check}>
                    <input
                        type="checkbox"
                        value={check}
                        checked={check}
                        onChange={(e) => {
                            setCheck(e.target.checked);
                        }}
                    />
                    위 내용을 충분히 이해하였으며, 연구 참여에 동의합니다.
                </label>
            </div>

            <button type="submit" onClick={handleSubmit} disabled={!check}>설문 시작</button>
        </main>
    );
}