import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const UserDetail = () => {
  const [userdetail, setUserdetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `https://bank-system-back.onrender.com/detection/assignprincipal/${id}`
        );
        setUserdetail(response.data);
      } catch (error) {
        toast.error("an error occured please try again later");
      }
    };

    fetchAppointment();
  }, [id]);

  if (!userdetail) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Detail</h2>
      <table
        style={{
          margin: "auto",
          borderCollapse: "collapse",
          border: "2px solid black",
        }}
      >
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Customer Name:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {userdetail.customer_name}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Denomination Exchange 10 ETB:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {userdetail.denomination_exchange_10_ETB}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Denomination Exchange 5 ETB:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {userdetail.denomination_exchange_5_ETB}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Denomination Exchange 1 ETB:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {userdetail.denomination_exchange_1_ETB}
            </td>
          </tr>

          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Total:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {userdetail.total}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Other:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {userdetail.other}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetail;
