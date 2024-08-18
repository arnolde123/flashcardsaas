'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import {
  Box,
  Paper,
  TextField,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'

import { useSearchParams } from 'next/navigation'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})

  
  const searchParams = useSearchParams()
  const search = searchParams.get('name')

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return

      const colRef = collection(doc(collection(db, 'users'), user.id), search)
      const docs = await getDocs(colRef)
      const flashcards = []

      docs.forEach((doc) => {
        flashcards.push({  
          id: doc.id,
          ...doc.data()
        })
      })

      setFlashcards(flashcards)
    }

    getFlashcard()
  }, [user, search])

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  if (!isLoaded || !isSignedIn) return <></>

  return (
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{ mt: 4 }}>
         {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ height: '200px' }}>
                    <CardActionArea 
                      onClick={() => handleCardClick(index)}
                      sx={{ height: '100%' }}
                    >
                      <CardContent sx={{ height: '100%', p: 2 }}>
                        <Box 
                          sx={{
                            perspective: '1000px',
                            height: '100%',
                            transition: 'transform 0.6s',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          }}
                        >
                          {/* Front of the card */}
                          <Box
                            sx={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              backfaceVisibility: 'hidden',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 2,
                              boxSizing: 'border-box',
                              overflow: 'auto',
                            }}
                          >
                            <Typography 
                              variant="body1" 
                              component="div"
                              sx={{
                                fontSize: '1rem',
                                lineHeight: 1.2,
                                textAlign: 'center',
                                wordBreak: 'break-word',
                              }}
                            >
                              {flashcard.front}
                            </Typography>
                          </Box>
                          {/* Back of the card */}
                          <Box
                            sx={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              backfaceVisibility: 'hidden',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 2,
                              boxSizing: 'border-box',
                              transform: 'rotateY(180deg)',
                              overflow: 'auto',
                            }}
                          >
                            <Typography 
                              variant="body1" 
                              component="div"
                              sx={{
                                fontSize: '1rem',
                                lineHeight: 1.2,
                                textAlign: 'center',
                                wordBreak: 'break-word',
                              }}
                            >
                              {flashcard.back}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid> 
              ))}
            </Grid>
    </Container>
  )
}
