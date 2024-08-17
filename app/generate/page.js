'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { db } from '@/firebase'
import { doc, collection, writeBatch, getDoc, setDoc } from 'firebase/firestore'
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

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async () => {
    fetch('/api/generate', {
      method: 'POST',
      body: text,
    })
      .then((res) => res.json())
      .then((data) => setFlashcards(data))
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const saveFlashcards = async () => {
    if (!isSignedIn) {
      alert('Please sign in to save flashcards')
      return
    }
  
    if (!name) {
      alert('Please enter a name for the flashcard set')
      return
    }
  
    setIsLoading(true)  // Add a loading state
  
    try {
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)

      const batch = writeBatch(db)
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
        const collections = userData.flashcards || []
        if (collections.some((f) => f.name.toLowerCase() === name.toLowerCase())) {
            alert('A flashcard set with this name already exists')
            setIsLoading(false)
            return
        } else {
            collections.push({ name })
            batch.set(userDocRef, { flashcards: collections }, { merge: true })
        }
        } else {
        batch.set(userDocRef, { flashcards: [{ name}] })
        }
  
      const colRef = collection(userDocRef, name)
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef)
        batch.set(cardDocRef, flashcard)
      })
  
      await batch.commit()
      
      alert('Flashcards saved successfully!')
      handleClose()
      router.push('/flashcards')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          mt: 4,
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <Paper
          sx={{
            p: 2,
            width: '100%',
          }}
        >
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Generate
          </Button>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Flashcards Preview
          </Typography>
          <Grid container spacing={3}>
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
          <Box sx={{
            mt: 4,
            mb: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpen}
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </Box>
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for the flashcard set
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Set Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}