import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/bulma'

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filteredList: []
        }
        this.searchItem = this.searchItem.bind(this)
    }

    componentDidMount(){
        this.setState({
            filteredList: this.props.items
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            filteredList: nextProps.items
        })
    }

    searchItem(e){
        e.preventDefault()
        let currentList = []
        let newList = []

        if(e.target.value !== ""){
            currentList = this.props.items
            newList = currentList.filter((item) => {
                const lc = item.toLowerCase()
                const filter = e.target.value.toLowerCase()
                return lc.includes(filter)
            })
        }else{ // if search bar is empty show all the items.
            newList = this.props.items
        }

        this.setState({
            filteredList: newList
        })
    }

    render(){
        const { deleteItem } = this.props
        const { filteredList } =this.state
        return(
            <section className="section">
                <div>
                    <input 
                    type="text"
                    className="input"
                    placeholder="search"
                    onChange={this.searchItem}
                    />
                </div>
                <ul>
                    {filteredList.map((item) => (
                        <li key={item}>
                            {item} &nbsp;
                            <span 
                            className="delete"
                            onClick={() => deleteItem(item)}>
                                X
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list : [
                "Finish the front end for Spazzo",
                "Start with 'Would you rather'"
            ]
        }
        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    addItem (e) {
        e.preventDefault() //prevent button from submitting the form like a retard.

        let list = this.state.list

        const newItem = document.getElementById('addInput')

        if(newItem.value !== ""){
            list.push(newItem.value)
            this.setState({
                list
            })
            //reset the form to normal..
            newItem.classList.remove("is-danger")
            newItem.value = ""
        }else{
            newItem.classList.add("is-danger")
        }
    }

    removeItem(item){
        // Put our list into an array
        const list = this.state.list.slice()
        // Check to see if item passed in matches item in array
        list.some((el,i) => {
            if(el === item){
                list.splice(i, 1)  // If item matches, remove it from array
                return true
            }
        })
        this.setState({
            list
        })
    }

    render(){
        const { list } = this.state
        return(
            <div className="content">
                <div className="container">
                    <List 
                    items={list}
                    deleteItem={this.removeItem}/>
                    <hr/>
                    <section className="section">
                        <form className="form" id="addItemForm">
                            <input 
                            type="text"
                            className="input"
                            id="addInput"
                            placeholder="Say something I'm giving up on you :("
                            />
                            <button className="button is-info" onClick={this.addItem}>
                                Add Item
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)