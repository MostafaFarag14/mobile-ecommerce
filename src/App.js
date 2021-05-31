import { useState, useEffect, Fragment } from 'react'
import { Container, Dimmer, Image, Loader, Segment } from 'semantic-ui-react';
import './App.css';
import Header from './components/Header'
import Filter from './components/Filter'
import Main from './components/Main'
import { Route, Switch } from 'react-router-dom';
import Item from './components/Item'
import SortMenu from './components/SortMenu'
import { CartProvider } from './contexts/CartContext'
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import Order from './pages/Order';
import { awakeAPI } from "./api/helpers";
import ProgressBar from './components/ProgressBar';

function App() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const awake = async () => { return await awakeAPI() }
    awake().then(resp => setLoading(false))
  }, [])

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
                  {loading === true ?
                    <Fragment>
                      <ProgressBar />
                      <Segment style={{ height: '50vh' }}>
                        <Dimmer active inverted>
                          <Loader size='big'>
                            Loading
                        </Loader>
                        </Dimmer>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                      </Segment>
                    </Fragment>
                    :
                    <Main query={query} />
                  }
                </div>
              </>
            )
            } />
            <Route path='/product/:id' component={Item} />
            <Route path='/cart' component={Cart} />
            <Route path='/checkout' component={CheckOut} />
            <Route path='/orders/:code' component={Order} />
          </Switch>
        </Container>
      </div>
    </CartProvider>
  );
}

export default App;
