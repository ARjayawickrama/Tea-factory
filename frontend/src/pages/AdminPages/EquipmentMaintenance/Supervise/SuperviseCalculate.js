import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  CircularProgress,
} from "@mui/material";

Modal.setAppElement("#root");

export default function SuperviseCalculate({ modalIsOpen, setModalIsOpen }) {
  const [workingHours, setWorkingHours] = useState("");
  const [sparyar, setSparyar] = useState("");
  const [howMany, setHowMany] = useState("");
  const [message, setMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    workingHours: "",
    howMany: "",
  });

  const validate = () => {
    let valid = true;
    let newErrors = { workingHours: "", howMany: "" };

    if (workingHours < 0) {
      newErrors.workingHours = "Working hours cannot be negative.";
      valid = false;
    }
    if (sparyar === "Yes" && howMany < 0) {
      newErrors.howMany = "How many cannot be negative.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    let calculatedTotal = 0;

    if (workingHours) {
      calculatedTotal += parseFloat(workingHours) * 5000;
    }

    if (sparyar === "Yes" && howMany) {
      calculatedTotal += parseFloat(howMany);
    }

    setTotalAmount(calculatedTotal);

    const data = {
      workingHours,
      sparyar,
      howMany: sparyar === "Yes" ? howMany : 0,
      totalAmount: calculatedTotal,
    };

    try {
      await axios.post("http://localhost:5004/api/SuperviseCalculate", data);
      Swal.fire({
        title: "Calculation Submitted!",
        text: "Total Amount: " + calculatedTotal,
        icon: "success",
      });
      setModalIsOpen(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to submit calculation. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setWorkingHours("");
    setSparyar("");
    setHowMany("");
    setTotalAmount(null);
    setErrors({ workingHours: "", howMany: "" });
  };

  const handleWorkingHoursChange = (e) => {
    const value = e.target.value;

    
    if (value === '' || (value >= 0 && value <= 5)) {
      setWorkingHours(value);
      setErrors({ ...errors, workingHours: '' });
      setMessage(''); 
    } else {
      setErrors({ ...errors, workingHours: 'Working hours must be between 0 and 5' });
      setMessage(''); 
    }


    if (value < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        workingHours: "Working hours cannot be negative.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, workingHours: "" }));
    }
  };

  const handleHowManyChange = (e) => {
    const value = e.target.value;
    setHowMany(value);

    if (value < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        howMany: "How many cannot be negative.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, howMany: "" }));
    }
  };

  const preventNegativeInput = (e) => {
    if (e.key === "-" || e.key === "+" || e.key === "e") {
      e.preventDefault();
    }
  };


 
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="w-3/6 relative left-96 ml-14 mt-36   bg-white  p-9  border rounded-lg shadow-2xl"
        overlayClassName="fixed inset-0 bg-black z-50 bg-opacity-25"
      >
        <Box sx={{ padding: 4 }}>
          <h2 className="text-lg font-bold mb-4">Calculate Total Amount</h2>
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Technician Working Hours"
                type="number"
                value={workingHours}
                onChange={handleWorkingHoursChange}
                onKeyDown={preventNegativeInput} 
                inputProps={{ min: 0, max: 5 }}
                error={!!errors.workingHours} 
                helperText={errors.workingHours} 
                required
              />
            </Box>

            <Box mb={3}>
              <FormControl fullWidth>
                <InputLabel id="sparyar-label">Sparyar</InputLabel>
                <Select
                  labelId="sparyar-label"
                  value={sparyar}
                  label="Sparyar"
                  onChange={(e) => setSparyar(e.target.value)}
                  required
                >
                  <MenuItem value="">
                    <em>Select Sparyar</em>
                  </MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {sparyar === "Yes" && (
              <Box mb={3}>
                <TextField
                  fullWidth
                  label="If Yes, How Many?"
                  type="number"
                  value={howMany}
                  onChange={handleHowManyChange}
                  onKeyDown={preventNegativeInput} 
                  error={!!errors.howMany} 
                  helperText={errors.howMany} 
                  required={sparyar === "Yes"}
                />
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading || !!errors.workingHours || !!errors.howMany} 
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? "Calculating..." : "Calculate"}
            </Button>
          </form>

          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            sx={{ marginTop: 2 }}
          >
            Reset
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
