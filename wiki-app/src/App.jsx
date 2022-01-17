import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './Components'
import { NotFound, Editor, Page, Welcome } from './Pages'
import LoginContext from './LoginContext'


function App() {
  const [isLogin, setIsLogin]=useState(false);
  const values={isLogin, setIsLogin};
  return (
    <div className="App">
      <BrowserRouter>
      <LoginContext.Provider value={values}>
        <Header />

        <div className='layout'>
          <Routes>
              <Route path='/' element={<Welcome/>}></Route>
              <Route path='/entry/create' element={<Editor />}></Route>
              <Route path='/entry/:id' element={<Page />}></Route>
              <Route path='/entry/:id/edit' element={<Editor />}></Route>
              <Route path='*' element={<NotFound/>}></Route>
         </Routes>
         
        </div>
        </LoginContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
