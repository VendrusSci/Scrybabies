import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Utils/Navbar.js'
import { About } from './About.js';
import './CSS/App.css';
import './CSS/Navbar.css';
import { PreviewOffspring } from './PreviewOffspring/PreviewOffspring.js';
import { SearchUrlGenerator} from './SearchUrlGenerator/SearchUrlGenerator.js'


function App() {
  return (
    <div className="App">
      <div><Toaster /></div>

      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={
            <PreviewOffspring />}>
          </Route>
          <Route path="/preview" element={
            <PreviewOffspring />}>
          </Route>
          <Route path="/search" element={
            <SearchUrlGenerator />}>
          </Route>
          <Route path="/about" element={
            <About />}>
          </Route>
        </Routes>
      </BrowserRouter>
      <br />
      <br />
      <div className='App-footer'>
        <p>All dragon breeds, genes and colours  property of <a className='App-link' href="https://www.flightrising.com">Flight Rising</a> © Stormlight Workshop LLC<br /></p>
      </div>
    </div>
  );
}

export default App;