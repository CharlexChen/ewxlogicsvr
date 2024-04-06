import { defineStore } from "pinia";

export const useHomeStore = defineStore('home', {
    state: () => ({
        count: 99,
    }),
    getters: {
        countValue: (state) => state.count,
    },
    actions: {
        async fetchData() {
            const result = { ret: 0 };
            return result;
        }
    },
})