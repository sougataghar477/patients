
import './App.css';

import { Container, Flex,Box } from '@mantine/core';
import Doctors from './components/Doctors';
import Doctor1 from './components/Doctor1';
import Doctor2 from './components/Doctor2';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
 
  return (<Router>
 <Container h={'100vh'}>

<Routes>
          <Route path="/" element={<Doctors />} />
          <Route path="/doctor1" element={<Doctor1 />} />
          <Route path="/doctor2" element={<Doctor2 />} />

           
        </Routes>
 
 </Container>
 </Router>
  );
}

export default App;
