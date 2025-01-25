import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';

export const Header = () => {
  return( 
    <BrowserRouter>
        <header>
            <h1 className='header'>掲示板</h1>
            <Link to="/threads/new">スレッド新規作成</Link>
        </header>
    </BrowserRouter>
  )
}

export default Header;