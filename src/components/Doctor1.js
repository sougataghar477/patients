import { useState, useRef, useEffect } from "react";
import { Box, Button, Flex, Input } from "@mantine/core";
import { DatePicker, TimeInput } from '@mantine/dates';
import TimeSlot from "./TimeSlot.js";
import { Link } from "react-router-dom";
function Doctor1() {
  const [data, setData] = useState([]);
  const datePickerRef = useRef('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState('');
  const [fixedSlots, setFixedSlots] = useState([])
  const minLength = 4;
  const maxLength = 10;
  const pattern = /^[A-Za-z]+$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let renderCount = useRef(0);
  let dates = useRef([]);
  let uniqueDates = useRef([])
  //getting date slots which are closed
  function slotsClosed(uniqueArray, duplicatesArray) {
    let count = 0;
    let filled = [];
    for (let i = 0; i < uniqueArray.length; i++) {
      for (let j = 0; j < duplicatesArray.length; j++) {
        if (duplicatesArray[j] === uniqueArray[i]) {
          count++;
        }
      }
      if (count === 3) {
        filled.push(uniqueArray[i]);
      }
      count = 0;
    }

    return filled
  }
  //submitting
  function SubmitDetails() {
    const dataObject = {
      time: `${date?.toLocaleDateString()}, ${startTime}-${endTime}`,
      firstName: fname,
      lastName: lname,
      email: email,
      phone: phone
    };
    if (!dataObject.time || !dataObject.firstName || !dataObject.lastName || !dataObject.email || !dataObject.phone || !startTime || !endTime) {
      alert("Please fill all fields");
      return false; // Prevent form submission
    }
    const foundMatch = data.filter(a => a.time === dataObject.time)

    if (foundMatch.length > 0) {
      alert("Time Slot Already Booked")
      return
    }
    else {
      alert("Success")
      setData([...data, dataObject])

    }


  }



  useEffect(() => {
    fetch('/timeslots.json')
      .then((response) => response.json())
      .then((data) => setData(data?.doctor1?.timeslotsTaken))
      .catch((error) => console.error('Error fetching the JSON file:', error));
  }, []);

  useEffect(() => {
    if (data.length > 0) {

      dates.current = data.map(index => index.time.split(" ")[0].split("/")[1]);
      uniqueDates.current = [...new Set(dates.current)];
      setFixedSlots(slotsClosed(uniqueDates.current, dates.current));
    }
  }, [data]);


  useEffect(() => {
    if (datePickerRef.current) {
      let buttons = Array.from(datePickerRef.current.children[0].querySelectorAll('button'));

      fixedSlots.forEach(slot => {
        buttons.forEach((button => {
          if (button.textContent === slot) {
            button.style.backgroundColor = "grey"
            button.disabled = "true";
          }
        }))
      })
    }
  }, [datePickerRef, fixedSlots]);

  return <Flex my={32} justify={{ base: 'center', sm: 'space-between', lg: 'space-between' }} gap={16} wrap={'wrap'}>
    <Box  >
      <h1>Doctor 1</h1>
      <h1>Choose Date First</h1>
      <DatePicker maw={400}
        onNextMonth={() => { setFixedSlots(slotsClosed(uniqueDates.current, dates.current)); }}
        onPreviousMonth={() => { setFixedSlots(slotsClosed(uniqueDates.current, dates.current)); }}
        aria-required ref={datePickerRef}
        value={date}
        onChange={setDate} />
      <p>Greyed out date(s) mean they are filled </p>
    </Box>
    <Box>
      <h1>Choose Time(in 24 hours format)</h1>
      <TimeSlot selectedDate={date} data={data} setStartTime={setStartTime} setEndTime={setEndTime} />
      <Flex gap={16}>

        <TimeInput
          required
          description="Start Time"
          placeholder="Input placeholder"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />
        <TimeInput
          required
          description="End Time"
          placeholder="Input placeholder"
          value={endTime}
          onChange={(e) => {
            setEndTime(e.target.value)
          }}
        />
      </Flex>
      <h1>Details</h1>
      <Flex gap={16} wrap={'wrap'}>
        <Input error={renderCount.current > 0 ? (fname.length < minLength || fname.length > maxLength || !pattern.test(fname)) : null} required flex={1} placeholder="First Name" w={200} value={fname} onChange={e => { setFname(e.target.value); renderCount.current++ }} />
        <Input error={renderCount.current > 0 ? (lname.length < minLength || lname.length > maxLength || !pattern.test(lname)) : null} required flex={1} w={200} placeholder="Last Name" value={lname} onChange={e => { setLname(e.target.value); renderCount.current++ }} />

      </Flex>
      <Flex mt={16} gap={16} wrap={'wrap'}>
        <Input error={renderCount.current > 0 ? !emailPattern.test(email) : null} type="email" required flex={1} placeholder="Email" value={email} onChange={e => { setEmail(e.target.value); renderCount.current++ }} />
        <Input error={renderCount.current > 0 ? !(/^\+?[1-9]\d{1,14}$/).test(phone) : null} type="phone" flex={1} placeholder="Phone" w={200} value={phone} onChange={e => { setPhone(e.target.value); renderCount.current++ }} />

      </Flex>
      <Button onClick={SubmitDetails} mt={16}>Submit</Button>
      <p><Link to='/'>Go back to Home</Link></p>

    </Box>
  </Flex>

}
export default Doctor1;


