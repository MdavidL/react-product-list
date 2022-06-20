const Products = [
    {category: "Apple iPhone", price: "580€", stocked: true, name: "iPhone 11 6.1 128 Go Noir"},
    {category: "Apple iPhone", price: "639€", stocked: true, name: "iPhone 12 mini 5.4 64 Go RED"},
    {category: "Apple iPhone", price: "979€", stocked: false, name: "iPhone 13 6.1 128 Go Noir miniuit"},
    {category: "Apple MacBook Pro", price: "1679€", stocked: true, name: "MacBook Pro 13' Touch Bar 256 Go SSD 16 Go RAM Puce M1"},
    {category: "Apple MacBook Pro", price: "1829€", stocked: false, name: "MacBook Pro 13' 512 Go SSD 8 Go RAM Puce M2"},
    {category: "Apple MacBook Pro", price: "1599€", stocked: true, name: "MacBook Pro 13' 256 Go SSD 8 Go RAM Puce M2"}
  ];
  
function ProductRow ({product}) {
    const name = product.stocked  ? product.name : 
    <span className="text-white opacity-50">{product.name + ' (en attente d\'approvisionnement)'}</span>
    return <tr className="text-white fw-light">
        <td >{name}</td>
        <td>{product.price}</td>
    </tr>
}

function ProductCategoryRow ({category}) {
    return <tr className="text-white">
        <th colSpan="2">{category}</th>
    </tr>
}

function ProductTable ({products, inStockOnly, filterText}) {
    const rows =[]
    let lastCategory = null

    products.forEach(product => {
        if ((inStockOnly && !product.stocked) || 
        product.name.indexOf(filterText) === -1 
        ) {
            return
        }
        if (product.category !== lastCategory) {
            lastCategory = product.category
            rows.push(<ProductCategoryRow key={lastCategory} category={product.category}/>)
        }
        rows.push(<ProductRow key={product.name} product={product}/>)
    })

    return <table className="table">
        <thead>
            <tr className="text-white">
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
}

class SearchBar extends React.Component {

    constructor (props) {
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }


    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockChange(e) {
        this.props.onStockChange(e.target.checked)
    }

    render () {
        const {filterText, inStockOnly} = this.props
        return <div className="mb-3">
            <form className="form-group mt-3">
                <input type="text" value={filterText} className="form-control" placeholder="Rechercher" onChange={this.handleFilterTextChange}/>
            </form>
            <form className="form-check mt-3">
                <input type="checkbox" checked={inStockOnly} className="form-check-input" id="stock" onChange={this.handleInStockChange}/>
                <label htmlFor="stock" className="form-check-label">Produit en stock</label>
            </form>
        </div>
    }
}

class FilterableProductTable extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange (filterText) {
        this.setState({filterText})
    }

    handleInStockChange (inStockOnly) {
        this.setState({inStockOnly})
    }
    
    render () {
        const {products} = this.props
        return <React.Fragment>
            <SearchBar 
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handleFilterTextChange}
                onStockChange={this.handleInStockChange}
            />
            <ProductTable 
                products={products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
            />
        </React.Fragment> 
    }
}

ReactDOM.render(<FilterableProductTable products={Products}/>, 
document.getElementById('app')
)