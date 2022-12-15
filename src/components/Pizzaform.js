import React,{useState,useEffect} from 'react';
import * as yup from "yup";
import axios from "axios";


const pizzaSecilimler = {
    BolMalzemosMalzemeler:["Biber","Soğan","Turşu","Bezelye","Mısır"],
    UcuzMalzemosMalzemeler:["Biber","Patates","Zeytin","Bezelye","Mısır"],
    EtçilMalzemeler:["Salam","Sucuk","Pastırma","Jambon", "Kuşbaşı"],
    pizzaTur:["BolMalzemos","Etçil", "UcuzMalzemos"],
    pizzaBoyut:["Küçük","Orta","Büyük"]
};

const pizzaSchema = yup.object().shape({
    isim: yup
    .string()
    .required("Pizza İsmi Yazınız")
    .min(2,"İsim en az 2 karakter olmalıdır"),
    boyut:yup
    .mixed()
    .oneOf(pizzaSecilimler.pizzaBoyut,"Lütfen Boyut Şecin"),
    turTercih:yup
    .mixed()
    .oneOf(pizzaSecilimler.pizzaTur,"Lütfen Pizza Tercihi Seçin")
});



const checkFormErrors = (name, value, schema, obj, setObj ) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setObj({
          ...obj,
          [name]: ""
        });
      })
      .catch((err) => {
        setObj({
          ...obj,
          [name]: err.errors[0]
        });
      });
    return obj;
};



export default function Pizzaform () {

    const [pizza, setPizza] = useState({
        isim: "",
        boyut: "",
        malzeme1: false, malzeme2: false, malzeme3: false, malzeme4: false, malzeme5: false,
        ozel: "",
        turTercih:"UcuzMalzemos"
    });


    const [errors, setErrors] = useState({
        isim: "",
        boyut: "",
        turTercih:""
    })
    const [disable, setDisable] = useState(true);
    const [pizzaCheck, setPizzaCheck] = useState(false);



    useEffect ( () => {
        pizzaSchema
        .isValid(pizza)
        .then(valid =>{
          setDisable(!valid)
        })
      },[pizza]);
    let i=0;
    useEffect ( ()=>{
        i=1;
    },[pizzaCheck])


    const handleChange = event =>{
        const {checked, value ,name ,type} = event.target;
        const _value = type === "checkbox" ? checked : value;
        if(name==="isim" || name==="boyut" || name==="turTercih") {
            setErrors(checkFormErrors(name, _value, pizzaSchema, errors, setErrors));
        }
        setPizza({
            ...pizza,
            [name]:_value
        });
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post("https://reqres.in/api/orders",pizza)
        .then(res =>{
            console.log(res.data);
            setPizza(res.data);
        }).then(res=>{
            setPizzaCheck(!(pizzaCheck));
        })
        .catch(err => {
            console.error('Sunucu Hatası', err);
        });
    };




    return (
        <div className='PizzaFormContainer'>
        <h1>Pizza Siparişinizi Hazırlayın</h1>

            <div className='pizza-img'>
                <img src="https://www.freeiconspng.com/thumbs/pizza-png/pizza-png-15.png"/>
            
            </div>

            <div className='pizza-error-show' style={{color:"red"}}>
                <p>{errors.isim}</p>
                <p>{errors.boyut}</p>
                <p>{errors.turTercih}</p>
            </div>

            <form id='pizza-form'>

            <p>
                <label htmlFor="name-input">Pizzanızın İsmi: </label>
                <input
                type="text"
                id="name-input"
                name="isim"
                value={pizza.isim}
                placeholder="Lütfen Pizzanızın İsmini Giriniz"
                onChange={handleChange}
                />
            </p>

            <p>
                <strong>Pizzanızın Türünü Seçiniz</strong>
                {
                    pizzaSecilimler["pizzaTur"].map(tur => (
                        <>
                            <br/>
                            <label>{tur}
                            <input type="radio" name="turTercih" value={tur} 
                            checked={pizza.turTercih===tur} onChange={handleChange} /> 
                            </label>
                        </>
                    ))
                }
            </p>

            {
                (pizza.turTercih!=="")
                &&
                (
                    pizzaSecilimler[`${pizza.turTercih}Malzemeler`].map ((malzeme,index) =>
                        (
                        <>
                        <label htmlFor={`malzeme${index+1}`}>{malzeme}: </label>
                        <input
                            type="checkbox"
                            id={`malzeme${index+1}`}
                            name={`malzeme${index+1}`}
                            checked={pizza[`malzeme${index+1}`]}
                            onChange={handleChange}
                        />
                        </>
                        )
                        )
                )
            }

            <p>
                <label htmlFor="size-dropdown">Pizzanızın Boyutu: </label>
                <select id="size-dropdown" name="boyut" value={pizza.boyut} onChange={handleChange}>
                    <option value={""}>Pizzanızın Boyutunu Seçiniz</option>
                    {
                        pizzaSecilimler["pizzaBoyut"].map (_boyut => (
                            <option value={_boyut}>{_boyut}</option>
                        ))
                    }
                </select>
            </p>

            <p>
                <label htmlFor="special-text">İlave İstek: </label>
                <input
                type="text"
                id="special-text"
                name="ozel"
                value={pizza.ozel}
                placeholder="İsteğiniz Varsa Giriniz"
                onChange={handleChange}
                />
            </p>
            <p>
                <input type="submit" id="order-button" value={disable===false?"Sipariş":"Sipariş"} disabled={disable} />
            </p>

            </form>



        </div>

    );
  };