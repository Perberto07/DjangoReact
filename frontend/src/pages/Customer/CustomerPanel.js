import { useEffect, useState } from "react"
import { getCustomer } from "../../services/CustomerServices";
import Cards from "../../components/card/Cards";


const CustomerPanel = () => {
  const [customers, setCustomer] = useState([]);

  useEffect (() =>{
    fetchCustomer();
  }, [])

  const fetchCustomer = async () => {
    try {
      const data = await getCustomer();
      setCustomer(Array.isArray(data) ? data: []);
    }catch(error) {
      console.error("error fetching customer", error);
    }
  }

  return (
    <div>
      <ul className="bg-gray-100s">
        {customers.map((customer)=>(
          <li key={customer.customer_id}>
            <Cards>
              <p>Customer Name: {customer.customer_name}</p>
              <p>Custoomer Address: {customer.customer_address}</p>
              <p>Phone Number: {customer.customer_number}</p>
            </Cards>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default CustomerPanel;