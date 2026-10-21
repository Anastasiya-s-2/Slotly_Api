import {useState,useEffect} from 'react';
import './App.css';
function App(){
const weekdays = [
'Неділя',
'Понеділок',
'Вівторок',
'Середа',
'Четвер',
'П`ятниця',
'Субота'];
const [search,setSearch] = useState('');
const [masters, setMasters] = useState([]);
const [loading,setLoading] = useState(true);
const [error, setError] = useState('');
const [services, setServices] = useState([]);
const [selectMaster, setSelectMaster] = useState(null);
const [servicesLoading,setServicesLoading ] = useState(false);
const [servicesError, setServicesError] = useState('');
const [avrLoading, setAvrLoading] = useState(false);
const [avrError, setAvrError]=useState('');
const [avr, setAvr] = useState([]);


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
    fetchMasters();}, []);
async function fetchAvR(master){
    setAvr([]);
    setSelectMaster(master);
    setAvrError('');
    setAvrLoading(true);
    try{
       const response = await fetch(`/api/availability-rules/masters/${master.id}`);
       if(!response.ok){
           throw new Error("Не вдалось завантажити робочий час")
           }
       const data = await response.json();
       setAvr(data);}
    catch(error){
    setAvrError(error.message);
        }
    finally { setAvrLoading(false);
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
       setServices(data);}
    catch(error){
    setServicesError(error.message);
        }

    finally{setServicesLoading(false);}
        }

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
               onClick={() => {
                   fetchServices(master);
                   fetchAvR(master);
                   }}>
               Переглянути послуги
                </button>
                </article>
                </div>
           ))}
           </section>

           {selectMaster && (
              <section id="services" >
                  <h2> Послуги майстра {selectMaster.display_name}</h2>
                  {servicesLoading && <p> Завантаження послуг </p>}
                  {servicesError && <p> {servicesError} </p>}
                  {!servicesLoading && !servicesError && services.length === 0 &&
                      (<p> У цього масйтра поки нема послуг </p>)}
                  {!servicesLoading && !servicesError && services.map((service) => (
                  <article key={service.id}  className = "service-card">
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                      <p>Ціна: {service.price} грн </p>
                      <p> Тривалість: {service.duration_minutes} хв </p>
                      </article>))}
                      </section>
                      )}
           {selectMaster && (
              <section id = "availability">
                  <h2> Графік роботи: {selectMaster.display_name} </h2>
                  {avrLoading && <p> Завантаження графіка ... </p>}
                  {avrError && <p> {avrError} </p> }
                  {!avrLoading && !avrError && avr.length === 0 &&
                      (<p> Графік поки відсутній </p>)}
                  {!avrLoading && !avrError && avr.map((a)=>(
                     <article key = {a.id} className = "avr-card" >
                         <p> День тижня: {weekdays[a.weekday] ?? a.weekday}</p>
                         <p> З {a.start_time} до {a.end_time} </p>
                     </article>
                      ))}
                  </section>
               )}


       </main>
    </div>);
}
export default App;