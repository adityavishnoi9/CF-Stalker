import logo from './logo.svg';
// import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';
function App() {
  const [ques , setQues] = useState([]);
  const [inlist , setInlist] = useState([]);
  const [formData , setFormData] = useState({
    user:"" , rating:1200
  })
  
  async function fetchData(){
    const temp = "https://codeforces.com/api/user.status?handle="
    const url = temp+formData.user;
    // console.log(url);
    try{
      const res = await fetch(url);
      const data = await res.json();
      if(data.status === "OK"){
        if(formData.rating < 800 || formData.rating > 3500 || formData.rating%100 !== 0){
          setInlist([]);
          return;
        }
        const result = data.result;
        // setQues(result);
        
        const filteredQues = [];
        for(let i=0 ; i<result.length ; i++){
          if(result[i].verdict === "OK"){
            let x = 0;
            for(let j=0 ; j<filteredQues.length ; j++){
              if(filteredQues[j].problem.name === result[i].problem.name){
                x = 1;
                break;
              }
            }
            if(!x){
              filteredQues.push(result[i]);
            }
          }
        }
        setInlist(filteredQues);
      }
      else{
        setInlist([]);
        console.log("Error in fetching the data");
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchData();
  }, [formData.rating , formData.user])
  
  function changeHandler(event){
    const {name , value} = event.target;
    setFormData({
      ...formData , [name]:value
    })
  }
  console.log(formData.rating);
  
  const filteredList = inlist.filter(q => q.problem.rating === parseInt(formData.rating, 10));
  return (
    <div>
      <div>
        <nav className="bg-stone-300 py-4">
          <h1 className='text-3xl font-bold text-center text-black'>
            Stalk Friends on Codeforces
          </h1>
        </nav>
        <div className='w-9/12 flex flex-col  mx-auto items-center'> 
              <div className="w-8/12 flex justify-between mt-4 border-4 border-stone-300 rounded-lg p-4">
                <input className="border-2 border border-stone-950 rounded-sm bg-blue-500 text-white placeholder-white text-center"
                  type='text'
                  autoComplete="off"
                  onChange={changeHandler}
                  placeholder='Enter the User Name'
                  name = "user"
                  value = {formData.user}
                />
                <input className="border-2 border border-stone-950 rounded-sm bg-red-500 text-black placeholder-black text-center"
                  type='text'
                  autoComplete="off"
                  onChange={changeHandler}
                  placeholder='Enter the rating'
                  name = "rating"
                  value = {formData.rating}
                />
              </div>
              
            
            <div className="w-8/12 mt-4 border-4 border-stone-300 rounded-lg">
              {/* <p>YOU ARE IN DIV</p> */}
              {
              
                filteredList.length === 0 ? 
                ( // did not solve any ques aur starting mein user name nindaala
                  (inlist.length === 0) ? <h2 className='w-12/12 border-2 mt-2 mb-2 text-center mx-12 py-1 bg-red-200 text-black cursor-pointer transition-transform transform-gpu hover:scale-105 hover:bg-red-500 hover:shadow-lg'> Please Enter a Valid Username And Rating </h2> : 
                  <h2 className='w-12/12 border-2 mt-2 mb-2 text-center mx-12 py-1 bg-blue-200 text-black cursor-pointer transition-transform transform-gpu hover:scale-105 hover:bg-blue-500 hover:shadow-lg'>The User Hasn't Solved Any Question of this Rating</h2>
                ) : 
                (
                  <div className='flex flex-col items-center'>
                    {/* <p>The User Has Solved {filteredList.length} Questions of this Rating</p> */}
                    {
                      filteredList.map((q) =>  <Card
                      key={q.id} que={q} rating = {formData.rating }/>)
                    }
                  </div> 
                )
              }
            </div>
          </div>
      </div>
    </div>
    
  );
}

export default App;
