const React = require('react')

    class Index extends React.Component {
       render(){
        return ( 
        <div>
            <link rel="stylesheet" href="/css/app.css"/>    
            <h1>Fruits index page</h1>
            <nav>
            <a href="/fruits/new">Create a New Fruit</a>
            </nav>
            <ul>
                {
                   this.props.fruits.map((fruit, i) => {
                    return (
                        <li key={i}>
                            The <a href = {`/fruits/${ fruit._id }`}>{ fruit.name } </a> is {fruit.color }.
                               { fruit.readyToEat ? ` It is ready to eat. ` : ` It is not ready to eat. ` }
                               <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                                   <input type="submit" value="DELETE"/>
                               </form>
                               <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
                               <br/><br/>
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