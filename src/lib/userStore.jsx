import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
        if (!uid) {
            console.log("No UID provided, clearing currentUser");
            return set({ currentUser: null, isLoading: false });
        }
        try {
            console.log("Fetching user info for UID:", uid);
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("User data found:", docSnap.data());
                set({ currentUser: docSnap.data(), isLoading: false });
            } else {
                console.log("No such document, clearing currentUser");
                set({ currentUser: null, isLoading: false });
            }
        } catch (err) {
            console.log("Error fetching user info:", err);
            set({ currentUser: null, isLoading: false });
        }
    },
    updateUser: (user) => set({ currentUser: user }),
    updateDescription: (description) => {
        set((state) => ({
            currentUser: { ...state.currentUser, description },
        }));
    }
}));