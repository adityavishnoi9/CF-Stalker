import logo from './logo.svg';
// import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';
function App() {
  const [ques , setQues] = useState([]);
  const [inlist1 , setInlist1] = useState([]);
  const [inlist2 , setInlist2] = useState([]);
  const [formData , setFormData] = useState({
    first_user:"" , second_user:"", rating:1200
  })
  
  async function fetchData(){
    const temp = "https://codeforces.com/api/user.status?handle="
    const url_f = temp+formData.first_user;
    const url_s = temp+formData.second_user;
    // console.log(url);
    try{
      const res_f = await fetch(url_f);
      const res_s = await fetch(url_s);
      const data_f = await res_f.json();
      const data_s = await res_s.json();
      if(data_f.status === "OK"){
        if(formData.rating < 800 || formData.rating > 3500 || formData.rating%100 !== 0){
          setInlist1([]);
          return;
        }
        const result_f = data_f.result;
        const result_s = data_s.result;
        // setQues(result);
        
        const filteredQues1 = [];
        const filteredQues2 = [];
        for(let i=0 ; i<result_f.length ; i++){
          if(result_f[i].verdict === "OK"){
            let x = 0;
            for(let j=0 ; j<filteredQues1.length ; j++){
              if(filteredQues1[j].problem.name === result_f[i].problem.name){
                x = 1;
                break;
              }
            }
            if(!x){
              filteredQues1.push(result_f[i]);
            }
          }
        }
        for(let i=0 ; i<result_s.length ; i++){
          if(result_s[i].verdict === "OK"){
            let x = 0;
            for(let j=0 ; j<filteredQues2.length ; j++){
              if(filteredQues2[j].problem.name === result_s[i].problem.name){
                x = 1;
                break;
              }
            }
            if(!x){
              filteredQues2.push(result_s[i]);
            }
          }
        }

        setInlist1(filteredQues1);
        setInlist2(filteredQues2)
      }
      else{
        setInlist1([]);
        console.log("Error in fetching the data");
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchData();
  }, [ formData.first_user, formData.second_user , formData.rating ])
  
  function changeHandler(event){
    const {name , value} = event.target;
    setFormData({
      ...formData , [name]:value
    })
  }
  console.log(formData.rating);
  
  const filteredList1 = inlist1.filter(q => q.problem.rating === parseInt(formData.rating, 10));
  const filteredList2 = inlist2.filter(q => q.problem.rating === parseInt(formData.rating, 10));
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
                  name = "first_user"
                  value = {formData.first_user}
                />
                <input className="border-2 border border-stone-950 rounded-sm bg-blue-500 text-white placeholder-white text-center"
                  type='text'
                  autoComplete="off"
                  onChange={changeHandler}
                  placeholder='Enter the Stalker Name'
                  name = "second_user"
                  value = {formData.second_user}
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
              
                filteredList1.length === 0 ? 
                ( // did not solve any ques aur starting mein user name nindaala
                  (inlist1.length === 0) ? <h2 className='w-12/12 border-2 mt-2 mb-2 text-center mx-12 py-1 bg-red-200 text-black cursor-pointer transition-transform transform-gpu hover:scale-105 hover:bg-red-500 hover:shadow-lg'> Please Enter a Valid Username And Rating </h2> : 
                  <h2 className='w-12/12 border-2 mt-2 mb-2 text-center mx-12 py-1 bg-blue-200 text-black cursor-pointer transition-transform transform-gpu hover:scale-105 hover:bg-blue-500 hover:shadow-lg'>The User Hasn't Solved Any Question of this Rating</h2>
                ) : 
                (
                  <div className='flex flex-col items-center'>
                    {/* <p>The User Has Solved {filteredList.length} Questions of this Rating</p> */}
                    {
                      filteredList1.map((q) => {
                        const isPresentInOtherList = filteredList2.some(item => item.problem.name === q.problem.name);
                        console.log(isPresentInOtherList);
                        return (
                          <Card 
                            key={q.id} 
                            que={q} 
                            rating={formData.rating}
                            isInOtherList={isPresentInOtherList} // Pass as prop if needed
                          />
                        );
                      } )
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
{/* <Card
                      key={q.id} que={q} rating = {formData.rating}/> */}
export default App;