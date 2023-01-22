import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { EntryList, NovaEntrada } from '../components/ui'


const HomePage: NextPage = () => {

  console.log(process.env.NEXT_PUBLIC_CLIENT_KEY)
  console.log(process.env.SECRET_KEY)
  console.log(process.env.MONGO_URL)

  return (
    <Layout title='Home - OpenJira'>
      <Grid container spacing={2}>
        <Grid item xs = { 12 } sm = { 4 }>
          <Card sx = {{ height: 'calc(100vh - 100px)'}} >
            <CardHeader title = 'Pendents' />
            
              {/* afegir entrades */}
              <NovaEntrada />
              <EntryList status = 'pendent' /> 
            
          </Card>
        </Grid>
        <Grid item xs = { 12 } sm = { 4 }>
          <Card sx = {{ height: 'calc(100vh - 100px)'}} >
            <CardHeader title = 'Progressant' />
            
              <EntryList status='en-progres' /> 
            
          </Card>
        </Grid>
        <Grid item xs = { 12 } sm = { 4 }>
          <Card sx = {{ height: 'calc(100vh - 100px)'}}  >
            <CardHeader title = 'Finalitzades' />
            
              <EntryList status='finalitzat' /> 
            
          </Card>
        </Grid>

      </Grid>
       
    </Layout>
  )
}

export default HomePage