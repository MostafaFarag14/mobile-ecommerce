import { useState, useEffect } from 'react'
import { Container } from 'semantic-ui-react';
import './App.css';
import Header from './components/Header'
import Filter from './components/Filter'
import Main from './components/Main'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Item from './components/Item'
import SortMenu from './components/SortMenu'
import { CartProvider } from './contexts/CartContext'
import CheckOut from './pages/CheckOut';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function App() {
  // let query = useQuery()
  const [query, setQuery] = useState('')

  useEffect(() => {
    console.log(query.toString())
  }, [query])
  return (
    <CartProvider>
      <div className='App'>
        <Header setQuery={setQuery} />
        <Container style={{ display: 'flex' }}>
          <Switch>
            <Route exact path={['/', '/products']} render={() => (
              <>
                <Filter query={query} setQuery={setQuery} />
                <div style={{ margin: 10, flex: 1, textAlign: 'right' }}>
                  <SortMenu query={query} setQuery={setQuery} />
                  <Main query={query} />
                </div>
              </>
            )
            } />
            <Route path='/product/:id' component={Item} />
            <Route path='/cart' component={CheckOut} />
          </Switch>
        </Container>
      </div>
    </CartProvider>
  );
}

export default App;
