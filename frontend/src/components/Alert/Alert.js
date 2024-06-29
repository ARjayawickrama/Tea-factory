import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Alert() {
  const notify = () => {
    toast.success(' top-right!')
    toast.success(' center', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       
      });
     };

  return (
    <div style={{textAlign: 'center' }}>
      <div>
        <button
        
          onClick={notify}
        >
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
