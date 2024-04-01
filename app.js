class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 1, name: 'Футболка', category: 'Мужская', price: 2000, size: 'S, M', brand: 'Nike' },
        { id: 2, name: 'Джинсы', category: 'Мужская', price: 30000, size: 'L, XL', brand: 'DSquared2' },
        { id: 3, name: 'Платье', category: 'Женская', price: 2500, size: 'XS, S, M', brand: 'Zara' },
        { id: 4, name: 'Юбка', category: 'Женская', price: 2500, size: 'XS, S', brand: 'H&M' },
        { id: 5, name: 'Кроссовки', category: 'Мужская', price: 15000, size: '44, 45, 46', brand: 'Adidas' },
        { id: 6, name: 'Куртка', category: 'Мужская', price: 50000, size: 'M, L', brand: 'Moncler' },
        { id: 7, name: 'Сумка', category: 'Женская', price: 14000, size: '5 литров', brand: 'Guess' },
        { id: 8, name: 'Кроссовки', category: 'Женская', price: 20000, size: '38, 39, 40', brand: 'New Balance' },
        { id: 9, name: 'Шорты', category: 'Мужская', price: 3500, size: 'M, L', brand: 'Reebok' , image: 'images/t-shirt.jpg' },
        { id: 10, name: 'Кепка', category: 'Мужская', price: 2500, size: 'one size', brand: 'New Era' },
        { id: 11, name: 'Кеды', category: 'Женская', price: 40000, size: '39, 40', brand: 'Rick Owens' },
        { id: 12, name: 'Очки', category: 'Женская', price: 20000, size: 'no size', brand: 'Maison Margiela' }
      ],
      cart: [],
      searchQuery: '',
      selectedCategory: ''
    };
  }

  addToCart = (product) => {
    const updatedCart = [...this.state.cart, product];
    this.setState({ cart: updatedCart });
  }

  removeFromCart = (productId) => {
    const updatedCart = this.state.cart.filter(product => product.id !== productId);
    this.setState({ cart: updatedCart });
  }

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  }

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category });
  }

  handleCheckout = () => {
    this.setState({ cart: [] });
    alert('Оформление заказа успешно завершно!');
}

  render() {
    const { products, cart, searchQuery, selectedCategory } = this.state;

    let filteredProducts = [...products];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return (
      <div>
        <div className="header">
          <h1>Fashion Store</h1>
          <div className="search">
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="container">
          <div className="categories">
            <div className="category-label"></div>
            <div className="category-buttons">
              <button className={selectedCategory === '' ? 'active' : ''} onClick={() => this.handleCategoryChange('')}>Все категории</button>
              <button className={selectedCategory === 'Мужская' ? 'active' : ''} onClick={() => this.handleCategoryChange('Мужская')}>Мужская</button>
              <button className={selectedCategory === 'Женская' ? 'active' : ''} onClick={() => this.handleCategoryChange('Женская')}>Женская</button>
            </div>
          </div>

          <div className="products">
            {filteredProducts.map(product => (
              <div key={product.id} className="product">
                <h2>{product.name}</h2>
                <p>Категория: {product.category}</p>
                <p>Цена: {product.price} руб</p>
                <p>Размер: {product.size}</p>
                <p>Бренд: {product.brand}</p>
                <button onClick={() => this.addToCart(product)}>Добавить</button>
              </div>
            ))}
          </div>
          <div className="cart">
            <h2>Корзина</h2>
            <ul>
              {cart.map(product => (
                <li key={product.id}>
                  <span>{product.name}</span>
                  <span>{product.price} ₽ </span>
                  <button onClick={() => this.removeFromCart(product.id)}>Убрать из корзины</button>
                </li>
              ))}
            </ul>
            <div>Итого: {cart.reduce((total, product) => total + product.price, 0)} руб</div>
          </div>
          <div className="checkout">
          <button className="checkout-button" onClick={this.handleCheckout}>Оплатить и оформить доставку</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
