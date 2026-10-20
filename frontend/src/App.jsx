import {useState,useEffect} from 'react';
import './App.css';
function App(){

const [search,setSearch] = useState('');
const [masters, setMasters] = useState([]);
const [loading,setLoading] = useState(true);
const [error, setError] = useState('');
const [services, setServices] = useState([]);
const [selectMaster, setSelectMaster] = useState(null);
const [servicesLoading,setServicesLoading ] = useState(true);
const [servicesError, setServicesError] = useState('');

useEffect(()=>
{
    async function fetchMasters(){
       try{
          const response = await fetch("/api/masters");
          if(!response.ok){
              throw new Error("Не вдалось завантажити майстрів");
              }
          const data = await response.json();
          setMasters(data);
           }
       catch(error){
          console.error(error);
          setError(error.message);
           }
       finally{ setLoading(false);
           }
        }
    async function fetchServices(master){
        setSelectMaster(master);
        setServices([]);
        setServicesError('');
        setServicesLoading(true);
    try {
       const response = await fetch(`/api/services/master/${master.id}`);
       if(!response.ok){
           throw new Error("Не вдалось завантажити сервіси");
           }
       const data = await response.json();
       setServicesError(data);}
    catch(error){
    setError(error.message);
        }
    finally{setServicesLoading(false);}
        }
    fetchMasters();}, []);
const filteredMasters = masters.filter((master)=>
(master.display_name ?? '').toLowerCase().includes(search.toLowerCase()));

return (
    <div className = "app" >
       <header className = "header">
       <h1> Slotly </h1>
       <nav>
       <a href = "#masters">Майстра </a>
       <a href = "#about" > Про нас </a>
       </nav>
       </header>
       <main>
       <section className = "hero" >
       <h2> Знайти свого майстра </h2>
       <p> Обирай послуги та плануй свій час зі Slotly </p>
       <input
       type = "text"
       placeholder = "Знайти майстра..."
       value = {search}
       onChange = {(event)=>setSearch(event.target.value)}
       />
       <p>Пошуковий запит: {search || "Нічого не введено"}</p>
       </section>
       <section id="masters">
           <h2> Наші майстри </h2>
           {loading && <p> Завантаження... </p>}
           {error && <p>{error}</p>}
           {!loading && !error && filteredMasters.length === 0 && (
               <p>Майстрів не знайдено.</p>
           )}

           {filteredMasters.map((master) => (
               <div key={master.id} className="master-card-wrapper">
                   <article className = "master-card">
                   <h3>{master.display_name}</h3>
               <button
               className = "master-button"
               onClick={() =>console.log("Обраний майстер", master.id)}>
               Переглянути послуги
                </button>
                </article>
                </div>
           ))}
           </section>
       </main>
    </div>);
}
export default App;