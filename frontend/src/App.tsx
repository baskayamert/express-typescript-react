import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import BranchScreen from './screens/BranchScreen';
import BranchByIdScreen from './screens/BranchByIdScreen';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' Component={HomeScreen} />
            <Route path='/register' Component={RegisterScreen} />
            <Route path='/login' Component={LoginScreen} />
            <Route path='/branches' Component={BranchScreen} />
            <Route path='/branches/:branch_id' Component={BranchByIdScreen} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;
