import React,{useState,useEffect} from 'react';
// import { Link } from 'react-router-dom';
import schema from './schema'
import * as yup from "yup"
import axios from 'axios';


const Shop = () => {
    // our values 
const [order,setOrder] = useState({
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
    schema.isValid(order).then(valid => {
        console.log(valid);                    // comment out later
        setDisabled(!valid) 
    })

},[order])

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
    setOrder({...order,[name]:newValue});
    // console.log("value" ,name , newValue);
}

        // axios //

const submit = (event) => {
    event.preventDefault()

        axios.post('https://reqres.in/api/orders',order)
            .then(response => {
                setPost(response.data);   /// use on the next conforemantion page 
                setOrder({ size:"",sauce:"",topping1:"",topping2:"",topping3:"",topping4:"","name-input":"",instructions:''})
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
            

            <select id="size-dropdown" name ="size" value ={order.size} onChange={inputChange}>
            {errors.size.length > 0 ? <p className={"error"}>{errors.size}</p> : null} 
                <option>--Please choose an option--</option>
                <option value="Large"> Large</option>
                <option value="Medium"> Medium </option>
                <option value="Small"> Small </option>

                
            </select>
            
                {/* sauce            checked */}
            <label className ="choose-sauce"htmlFor="sauce"> Choose the sauce  </label>

           
             Original Red
                <input onChange={inputChange} type="radio" name ="sauce" value ="red" checked={order.sauce === "red"}   /> 
             <br/>

            Garlic Ranch
                <input onChange={inputChange} type="radio" name ="sauce" value ='Ranch' checked={order.sauce === "Ranch"}  />
            
            <br/>
           BBQ Sauce
                <input onChange={inputChange} type="radio" name ="sauce" value ="BBQ" checked={order.sauce === "BBQ"}  />
         
                <br/>
            Spinach Alfredo
                <input onChange={inputChange} type="radio" name ="sauce" value ="Alfredo" checked={order.sauce === "Alfredo"}  />
                
                
        
                {/* topping checkbox           checked*/}

            <label htmlFor="topping"> Add yout topping </label>

            Pepperoni
            <input onChange={inputChange}
          type="checkbox"
          name="topping1"
          checked={order.topping1}
        value={order.topping1}
        />
         <br/>
            Canadion Bacon
            <input onChange={inputChange}
          type="checkbox"
          name="topping2"
          checked={order.topping2}
        value={order.topping2}
        />
         <br/>
            Grilled Chicken
            <input onChange={inputChange}
          type="checkbox"
          name="topping3"
          checked={order.topping3}
        value={order.topping3}
        />
         <br/>
            Onions
            <input onChange={inputChange}
          type="checkbox"
          name="topping4"
          checked={order.topping4}
        value={order.topping4}
        />



{/* tell us in text */}
            <label htmlFor="name-input"> Tell us your name </label>
                                        {/* error massage */}
            {errors['name-input'].length > 0 ? <p className={"error"}>{errors['name-input']}</p> : null} 

            <input onChange={inputChange} type ="text" name="name-input"  id="name-input" placeholder="john "  value={order["name-input"]}/>
            
            <label htmlFor="special-text"> Special Instructions </label>
            
            <textarea onChange={inputChange} type ="text" name="instructions"  id="special-text" placeholder="I want my pizza to have a ... "  value={order.instructions}/>
            


            {/* button   set up disable */}
            <label htmlFor="order-button"> Ready to Order: </label>
            


            <pre className={'error'}>{JSON.stringify(postError, null, 2)}</pre>

                <button type="submit" disabled={disabled} id="order-button">Order</button>
        </form>

      </div>

    )
    }

export default Shop