'use client'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

import { Collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])

  useEffect(() => {
    async function getFlashcards() {
        if (!user) return

        const userDocRef = doc(db, 'users', user.id)
        const userDocSnap = await getDoc(userDocRef)

        if (!userDocSnap.exists()) {
            const collections = userDocSnap.data().flashcards || []
            setFlashcards(collections)
        } else {
            await setDoc(userDocRef, { flashcards: [] })
        }

    }

    getFlashcards()
  }, [user])
}


