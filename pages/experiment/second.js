import {useRouter} from "next/router";

export default function Second() {
    const router = useRouter();

    const handleSubmit = (e) => {
        router.push('/experiment/second_chat');
    };

    return (
        <main className="second_main">
            <img className="second_background" src="/global/background.png"/>
            <img className="second_status" src="/global/status.png"/>
            <img className="second_center" src="/second/center.png"/>
            <img onClick={handleSubmit} className="second_button" src="/global/button.png"/>
        </main>
    );
}