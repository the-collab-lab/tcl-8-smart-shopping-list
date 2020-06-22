// import React, { Component } from 'react';
// import { db } from '../firebase.js';

// const UserContext = React.createContext();

// class UserProvider extends Component {
//   state = {
//     shoppingList: [],
//   };

//   componentDidMount() {
//     db.collection('shoppingList')
//       .get()
//       .then(querySnapshot => {
//         const data = querySnapshot.docs.map(doc => doc.data());
//         this.setState({ shoppingList: data });
//       });
//   }

//   getShoppingList = () => this.state.shoppingList;

//   render() {
//     const { children } = this.props;
//     const { getShoppingList } = this;

//     return (
//       <UserContext.Provider
//         value={{
//           getShoppingList,
//         }}
//       >
//         {children}
//       </UserContext.Provider>
//     );
//   }
// }

// export default UserContext;

// export { UserProvider };
