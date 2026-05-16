import { db } from './firebase-init.js';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { storage } from './firebase-init.js';
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Global exports to window for non-module script.js to access
window.fsData = {
    // STORAGE
    uploadFile: async (file, path) => {
        const fileRef = ref(storage, path);

        // Wrap in a 15-second timeout to prevent infinite hang if Storage isn't initialized or blocked
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Storage Timeout: تاكد من تفعيل Storage في Firebase")), 15000)
        );

        await Promise.race([
            uploadBytes(fileRef, file),
            timeoutPromise
        ]);

        return await getDownloadURL(fileRef);
    },

    // SUBSCRIPTIONS (Content purchased with generated codes)
    addSubscriptionCode: async (sub) => {
        return await addDoc(collection(db, "subscription_codes"), sub);
    },
    getAllSubscriptionCodes: async () => {
        const snap = await getDocs(collection(db, "subscription_codes"));
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    getSubscriptionsByCode: async (code) => {
        const q = query(collection(db, "subscription_codes"), where("code", "==", code));
        const snap = await getDocs(q);
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // CONTENT (Books/Courses)
    addContent: async (item) => {
        return await addDoc(collection(db, "content"), item);
    },
    getAllContent: async () => {
        const snap = await getDocs(collection(db, "content"));
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // EXAMS
    addExam: async (exam) => {
        return await addDoc(collection(db, "exams"), exam);
    },
    getAllExams: async () => {
        const snap = await getDocs(collection(db, "exams"));
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // SUBMISSIONS
    addSubmission: async (sub) => {
        return await addDoc(collection(db, "submissions"), sub);
    },
    getAllSubmissions: async () => {
        const snap = await getDocs(collection(db, "submissions"));
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    updateSubmission: async (id, data) => {
        return await updateDoc(doc(db, "submissions", id), data);
    },

    // RESULTS
    addResult: async (res) => {
        return await addDoc(collection(db, "results"), res);
    },
    getUserResults: async (userCode) => {
        const q = query(collection(db, "results"), where("code", "==", userCode));
        const snap = await getDocs(q);
        return snap.docs.map(doc => doc.data());
    },

    // USERS
    addUser: async (user) => {
        const userDoc = doc(db, "users", user.code);
        return await setDoc(userDoc, user);
    },
    getAllUsers: async () => {
        const snap = await getDocs(collection(db, "users"));
        return snap.docs.map(doc => doc.data());
    },

    // ATTENDANCE
    addAttendance: async (att) => {
        return await addDoc(collection(db, "attendance"), att);
    },
    getAttendance: async () => {
        const snap = await getDocs(collection(db, "attendance"));
        return snap.docs.map(doc => doc.data());
    }
};
