import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { doc, collection } from "firebase/firestore";
import { db } from "../firebase-config.js";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [userDataRef, setUserDataRef] = useState('dummy')
    const [userData, loadingDoc, error] = useDocumentDataOnce(doc(collection(db, 'users'), userDataRef))


    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            if(user) setUserDataRef(user.uid)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        userData,
        userDataRef
    }

    return ( <AuthContext.Provider value={value}>
        {!loading && !loadingDoc && children}
        </AuthContext.Provider>
    )
}