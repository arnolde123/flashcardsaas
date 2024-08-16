import Image from "next/image"
import getStripe from "@/utils/get-stripe"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent, CardActions } from "@mui/material"
import Head from "next/head"

export default function Home() {
  return (  
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcard Buddy</title>
        <meta name="description" content="Create flashcards from your text with ease" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <style>{`
          body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
            background-color: #f0f4f8;
          }
          .gutterbottom {
            margin-bottom: 16px;
          }
        `}</style>
      </Head>
      <AppBar position="static" sx={{ backgroundColor: '#4A90E2', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, fontFamily: "'Roboto', sans-serif", fontWeight: 300 }}>
            Flashcard Buddy
          </Typography>
          <SignedOut>
            <Button color="inherit" sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300, ml: 2 }} href="/sign-in">Login</Button>
            <Button color="inherit" sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300, ml: 2 }} href="/sign-up">Sign up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{
        textAlign: "center",
        fontFamily: "'Roboto', sans-serif",
        mt: 10,
        mb: 15
      }}>
        <Typography variant="h2" sx={{ fontWeight: 300, mb: 3, color: '#333' }} className="gutterbottom">Welcome to Flashcard Buddy!</Typography>
        <Typography variant="h5" sx={{ fontWeight: 300, mb: 5, color: '#666' }} className="gutterbottom">
          Your friendly companion for creating flashcards from your own text!
        </Typography>
        <Button 
          href="/generate"
          variant="contained" 
          color="primary" 
          sx={{ 
            mt: 3, 
            fontFamily: "'Roboto', sans-serif", 
            fontWeight: 300, 
            fontSize: '1.3rem',
            padding: '12px 35px',
            borderRadius: '30px',
            backgroundColor: '#4A90E2',
            boxShadow: '0 4px 6px rgba(74, 144, 226, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#3A7BC8',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 8px rgba(74, 144, 226, 0.4)',
            }
          }}
        >
          Let's Get Started!
        </Button>
      </Box>

      <Box sx={{ my: 10 }}> 
        <Typography variant="h3" component="h2" sx={{ fontWeight: 300, mb: 4, textAlign: 'center', color: '#333' }} className="gutterbottom">
          Features
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 12px rgba(0,0,0,0.15)' } }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 300, mb: 2, color: '#4A90E2' }} className="gutterbottom">Easy Text Input</Typography>
                <Typography variant="body1" sx={{ fontWeight: 300, color: '#666' }}>
                  Simply copy and paste your text into the app and let Flashcard Buddy do the rest!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 12px rgba(0,0,0,0.15)' } }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 300, mb: 2, color: '#4A90E2' }} className="gutterbottom">Intelligent Flashcard Creation</Typography>
                <Typography variant="body1" sx={{ fontWeight: 300, color: '#666' }}>
                  Our AI cleverly breaks down your text into manageable flashcards,
                  ensuring you learn effectively.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 12px rgba(0,0,0,0.15)' } }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 300, mb: 2, color: '#4A90E2' }} className="gutterbottom">Access Your Flashcards Anywhere</Typography>
                <Typography variant="body1" sx={{ fontWeight: 300, color: '#666' }}>
                  Access your flashcards anytime, anywhere, on any device, 
                  with our user-friendly interface.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 10, textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: 300, mb: 4, color: '#333' }} className="gutterbottom">Pricing</Typography>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 12px rgba(0,0,0,0.15)' } }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 300, mb: 2, color: '#4A90E2' }} className="gutterbottom">Basic</Typography>
                <Typography variant="h5" sx={{ fontWeight: 300, mt: 2, mb: 3, color: '#333' }} className="gutterbottom">$5/month</Typography>
                <Typography variant="body1" sx={{ fontWeight: 300, mb: 3, color: '#666' }} className="gutterbottom">
                  Get started with basic features at no cost. Perfect for casual learners.
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: 'auto', justifyContent: 'center', pb: 3 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ 
                    fontFamily: "'Roboto', sans-serif", 
                    fontWeight: 300, 
                    fontSize: '1.1rem',
                    padding: '10px 25px',
                    borderRadius: '20px',
                    backgroundColor: '#4A90E2',
                    boxShadow: '0 4px 6px rgba(74, 144, 226, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#3A7BC8',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 8px rgba(74, 144, 226, 0.4)',
                    }
                  }}
                >
                  Choose Basic
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 12px rgba(0,0,0,0.15)' } }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 300, mb: 2, color: '#4A90E2' }} className="gutterbottom">Pro Plan</Typography>
                <Typography variant="h5" sx={{ fontWeight: 300, mt: 2, mb: 3, color: '#333' }} className="gutterbottom">$10/month</Typography>
                <Typography variant="body1" sx={{ fontWeight: 300, mb: 3, color: '#666' }} className="gutterbottom">
                  Unlock advanced features and unlimited flashcards for serious studiers.
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: 'auto', justifyContent: 'center', pb: 3 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ 
                    fontFamily: "'Roboto', sans-serif", 
                    fontWeight: 300, 
                    fontSize: '1.1rem',
                    padding: '10px 25px',
                    borderRadius: '20px',
                    backgroundColor: '#4A90E2',
                    boxShadow: '0 4px 6px rgba(74, 144, 226, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#3A7BC8',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 8px rgba(74, 144, 226, 0.4)',
                    }
                  }}
                >
                  Choose Pro
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
