import React, {Component} from 'react'
import {db} from '../firebase.js'

const UserContext = React.createContext()

class UserProvider extends Component {
  state = {
    shoppingList: [],
  }

  componentDidMount(){
    db.collection('shoppingList').get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({shoppingList: data})
      })
  }

  componentDidUpdate(){
    db.collection('shoppingList').get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({shoppingList: data})
      })
  }

  // updateList = (val) => {
  //   console.log(val)
  //   this.setState({updatingList: val })
  // }


  getShoppingList = () => this.state.shoppingList;

  render() {
    const { children } = this.props
    const { getShoppingList, updateList } = this

    return (
      <UserContext.Provider
        value={{
          getShoppingList
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }