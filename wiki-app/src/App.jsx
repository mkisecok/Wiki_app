import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './Components'
import { NotFound, Editor, Page, Welcome } from './Pages'


function App() {
  const [isLogin, setIsLogin]=useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Header props={{isLogin , setIsLogin}}/>

        <div className='layout'>
          <Routes>
              <Route path='/' element={<Welcome/>}></Route>
              <Route path='/entry/create' element={<Editor props={isLogin}/>}></Route>
              <Route path='/entry/:id' element={<Page props={isLogin}/>}></Route>
              <Route path='/entry/:id/edit' element={<Editor props={isLogin}/>}></Route>
              <Route path='*' element={<NotFound/>}></Route>
         </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
