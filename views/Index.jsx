const React = require('react')

    class Index extends React.Component {
       render(){
        return ( <div>
            <h1>Fruits index page</h1>
            <nav>
            <a href="/fruits/new">Create a New Fruit</a>
            </nav>
            <ul>
                {
                   this.props.fruits.map((fruit, i) => {
                    return (
                        <li>
                        The <a href={`/fruits/${ fruit.id }`}> { fruit.name } </a> is { fruit.color } and{' '} 
                        { fruit.readyToEat ? ` it is ready to eat` : `it is not ready to eat` }
                        </li>
                        )
                    })
                }
            </ul>
        </div> 
        )
    }
}
    module.exports = Index


    //no longer needed after mongoose

    //   render() {
    //       //destructering same as fruit = this.props.fruit
    //       const { fruits } = this.props;
    //       return (
    //               <div>
    //                   <h1>Fruits Index Page</h1>
    //                   <nav>
    //                     <a href="/fruits/new">Create a New Fruit</a>
    //                     </nav>
    //                   <ul>
    //                       {fruits.map((fruit, i) => {
    //                           return (
    //                               <li>
    //                                   The{' '}
    //                                   <a href={`/fruits/${i}`}>
    //                                       {fruit.name}
    //                                   </a>{' '}
    //                                   is {fruit.color} <br></br>
    //                                   {fruit.readyToEat
    //                                       ? `It is ready to eat`
    //                                       : `It is not ready to eat`}
    //                                   <br />
    //                               </li>
    //                           );
    //                       })}
    //                   </ul>
    //               </div>
    //       );
    //   }