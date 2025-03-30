import {create} from 'zustand';

export const useSurveyStore = create(
    (set) => ({
        email: '',
        phone: '',
        age: '',
        gender: '',
        job: '',
        answers: {},
        usageTime: '',
        emojiFreq: '',
        platforms: [],
        platformEtc: '',
        favoriteEmojis: [],
        recommendedEmojis: [],
        setEmail: (email) => set({email}),
        setPhone: (phone) => set({phone}),
        setAge: (age) => set({age}),
        setGender: (gender) => set({gender}),
        setJob: (job) => set({job}),
        setAnswers: (name, value) =>
            set((state) => ({
                answers: {
                    ...state.answers,
                    [name]: value,
                },
            })),
        setUsageTime: (usageTime) => set({usageTime}),
        setEmojiFreq: (emojiFreq) => set({emojiFreq}),
        setPlatforms: (platforms) => set({platforms}),
        setPlatformEtc: (platformEtc) => set({platformEtc}),
        setFavoriteEmojis: (favoriteEmojis) => set({favoriteEmojis}),
        setRecommendedEmojis: (recommendedEmojis) => set({recommendedEmojis})
    }));