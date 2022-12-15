import { Link } from 'react-router-dom';

const stores =  [
    {
      name:"Revolation",
      favorites:"Türk Kahvesi"
    },
    {
      name:"Paçacı Necip",
      favorites:"Paça Çorbası"
    },
    {
      name:"İskender Kings",
      favorites:"Döner"
    },
    {
      name:"Kadıköy Çaykur",
      favorites:"Portakallı Ördek"
    },
    {
      name:"Victor Levi",
      favorites:"Öküz Gözü"
    },
    {
      name:"La Liberta",
      favorites:"Ateş Suyu"
    }
  ]


export default function PizzaSays () {
    return (
        <div className="Home-Says-Pizza">

            <div id="oneriContainer">
                <h1 id="homeSaysTitle">Pizza Yiyen 1, Yemeyen 1000 Pişman</h1>
                <Link to="/pizza" id='order-pizza'>Pizzada Damping</Link>
            </div>
        
<div id="showStore">

{
        stores.map((store, index) =>(
          <div className={
            "dukkan"
          }>
            <h3>{store.name}</h3>
            <p>{store.favorites}</p>
          </div>
        ))
      }

</div>

        </div>
    );
}