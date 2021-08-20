import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import schema from './schema'
import * as yup from "yup"
import axios from 'axios';


const Shop = () => {
    // our values 
const [Data,setData] = useState({
    size:"",
    sauce:"",
    topping1:false,
    topping2:false,
    topping3:false,
    topping4:false,
    "name-input":'',
    instructions:''
   
});
const [errors,setErrors] = useState({
    size:"",
    sauce:"",
    topping1:false,
    topping2:false,
    topping3:false,
    topping4:false,
    "name-input":'',
    instructions:''
   
});

const [post, setPost] = useState([]) 
const [postError, setPostError] = useState()

const [disabled,setDisabled] = useState(true);


                // yup  //

useEffect(() => {
    schema.isValid(Data).then(valid => {
        console.log(valid);                    // comment out later
        setDisabled(!valid) 
    })

},[Data])

const validation = (name, value) => {

    yup.reach(schema,name).validate(value).then(valid => {
        setErrors({...errors,[name]: ""})
    }).catch(err => {
        setErrors({...errors,[name]:err.errors[0]
        })
    })
};

const inputChange = (event) => {
    event.persist()
    const { value,name,checked,type} = event.target;
    const newValue = type === "checkbox" ? checked : value;
    validation(name, newValue);
    setData({...Data,[name]:newValue});
    // console.log("value" ,name , newValue);
}

        // axios //

const submit = (event) => {
    event.preventDefault()

        axios.post('https://reqres.in/api/orders',Data)
            .then(response => {
                setPost(response.data);   /// use on the next conforemantion page 
                console.log(response.data);
                setData({ size:"",sauce:"",topping1:"",topping2:"",topping3:"",topping4:"","name-input":"",instructions:''})
            }).catch(error => {
                setPostError("the order was unsuccessful. please try again later we are working to solve the issue")
            })
   

        }

    return (

    <div >
       <h1>Buy Your Favorite Pizza</h1>
        <h2>You pick the topping and we make it for you</h2>


        <form id="pizza-form" onSubmit={submit} >
            {/* selection of size */}
            <label htmlFor="size-dropdown"> Choose the size </label>
            

            <select id="size-dropdown" name ="size" value ={Data.size} onChange={inputChange} data-cy="size">
            {errors.size.length > 0 ? <p className={"error"}>{errors.size}</p> : null} 
                <option>--Please choose an option--</option>
                <option value="Large"> Large</option>
                <option value="Medium"> Medium </option>
                <option value="Small"> Small </option>

                
            </select>
            
                {/* sauce            checked */}
            <label className ="choose-sauce"htmlFor="sauce"> Choose the sauce  </label>

           
             Original Red
                <input onChange={inputChange} type="radio" name ="sauce" value ="red" checked={Data.sauce === "red" } data-cy="sauce"   /> 
             <br/>

            Garlic Ranch
                <input onChange={inputChange} type="radio" name ="sauce" value ='Ranch' checked={Data.sauce === "Ranch"}  />
            
            <br/>
           BBQ Sauce
                <input onChange={inputChange} type="radio" name ="sauce" value ="BBQ" checked={Data.sauce === "BBQ"}  />
         
                <br/>
            Spinach Alfredo
                <input onChange={inputChange} type="radio" name ="sauce" value ="Alfredo" checked={Data.sauce === "Alfredo"}  />
                
                
        
                {/* topping checkbox           checked*/}

            <label htmlFor="topping"> Add yout topping </label>

            Pepperoni
            <input onChange={inputChange}
            data-cy="topping1"
          type="checkbox"
          name="topping1"
          checked={Data.topping1}
        value={Data.topping1}
        />
         <br/>
            Canadion Bacon
            <input onChange={inputChange}
            data-cy="topping2"
          type="checkbox"
          name="topping2"
          checked={Data.topping2}
        value={Data.topping2}
        />
         <br/>
            Grilled Chicken
            <input onChange={inputChange}
            data-cy="topping3"
          type="checkbox"
          name="topping3"
          checked={Data.topping3}
        value={Data.topping3}
        />
         <br/>
            Onions
            <input onChange={inputChange}
             data-cy="topping4"
          type="checkbox"
          name="topping4"
          checked={Data.topping4}
        value={Data.topping4}
        />



{/* tell us in text */}
            <label htmlFor="name-input"> Tell us your name </label>
                                        {/* error massage */}
            {errors['name-input'].length > 0 ? <p className={"error"}>{errors['name-input']}</p> : null} 

            <input onChange={inputChange} type ="text" name="name-input"  id="name-input" placeholder="john "  value={Data["name-input"]} data-cy="name-input"/>
            
            <label htmlFor="special-text"> Special Instructions </label>
            
            <textarea data-cy="instructions" onChange={inputChange} type ="text" name="instructions"  id="special-text" placeholder="I want my pizza to have a ... "  value={Data.instructions}/>
            


            {/* button   set up disable */}
            <label htmlFor="order-button"> Ready to Order: </label>
            


            <pre className={'error'}>{JSON.stringify(postError, null, 2)}</pre>

                <button type="submit" onSubmit={submit} disabled={disabled} id="order-button" className="btn" name="order-button" data-cy="submit" > 
               
                <Link disabled={disabled} className="btn" to="/pizza/conferm"></Link>
                
                Submit Order
                </button>
        </form>

      </div>

    )
    }

export default Shop