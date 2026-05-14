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

// Global exports to window for non-module script.js to access
window.fsData = {
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
    }
};
