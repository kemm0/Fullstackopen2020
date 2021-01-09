const reducer = (state = '', action) => {
  switch(action.type) {
    case 'VOTE':
      return 'voted'
    case 'CREATE':
      return 'created'
  }
  return state
}