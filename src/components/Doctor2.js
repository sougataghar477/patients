import { useState,useRef,useEffect } from "react";
import {Box, Button, Flex,Input  } from "@mantine/core";
import { DatePicker,TimeInput } from '@mantine/dates';
import TimeSlot from "./TimeSlot.js";
import { Link } from "react-router-dom";

function Doctor2(){
    const [data,setData]=useState([]);
    const datePickerRef = useRef('');
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [fname,setFname]=useState('');
    const [lname,setLname]=useState('');
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState('');
    const [fixedSlots,setFixedSlots]=useState([])
    
   
 
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

  function SubmitDetails(){
    const dataObject = {
      time: `${date?.toLocaleDateString()}, ${startTime}-${endTime}`,
      firstName: fname,
      lastName: lname,
      email: email,
      phone: phone
    };
const foundMatch= data.filter(a => a.time === dataObject.time)

      if(foundMatch.length>0){
        alert("Time Slot Already Booked")
        return
      }
      else{
        alert("Success")
        setData([...data,dataObject])

      }
 

  }



    useEffect(() => {
      fetch('/timeslots.json')
        .then((response) => response.json())
        .then((data) => setData(data?.doctor2?.timeslotsTaken))
        .catch((error) => console.error('Error fetching the JSON file:', error));
    }, []);
  
    useEffect(() => {
      if (data.length > 0) {
        console.log(data)
        let dates = data.map(index => index.time.split(" ")[0].split("/")[1]);
        let uniqueDates = [...new Set(dates)];
        setFixedSlots(slotsClosed(uniqueDates, dates));
      }
    }, [data]);  
  
     
    useEffect(() => {
      if (datePickerRef.current) {
        let buttons = Array.from(datePickerRef.current.children[0].querySelectorAll('button'));
       
        fixedSlots.forEach(slot=>{
           buttons.forEach((button =>{
            if(button.textContent===slot){
              button.disabled="true";
              button.style.backgroundColor="grey"
            }
           }))
        })  
      }
    }, [datePickerRef,fixedSlots]);
 
return <Flex my={32} justify={'center'} gap={16}  wrap={'wrap'}>
<Box  >
  <h1>Doctor 2</h1>
  <h1>Choose Time(in 24 hours format)</h1>

<DatePicker ref={datePickerRef}  w={400} value={date} onChange={setDate}  />
<TimeSlot selectedDate={date} data={data}/>
</Box>
<Box>
    <h1>Choose Time</h1>
<Flex gap={16}>

<TimeInput

      description="Start Time"
      placeholder="Input placeholder"
      value={startTime}
      onChange={e => setStartTime(e.target.value)}
    />
    <TimeInput
       
      description="End Time"
      placeholder="Input placeholder"
      value={endTime}
    onChange={(e)=>{
         
        setEndTime(e.target.value)
    }}
    />
</Flex>
<h1>Details</h1>
<Flex gap={16} wrap={'wrap'}>
    <Input flex={1} placeholder="First Name" w={200} value={fname} onChange={e=> setFname(e.target.value)}/>
    <Input flex={1}  w={200} placeholder="Last Name" value={lname} onChange={e=> setLname(e.target.value)}/>
    
</Flex>
<Flex mt={16} gap={16} wrap={'wrap'}>
    <Input flex={1} placeholder="Email"  value={email} onChange={e => setEmail(e.target.value)}/>
    <Input flex={1} placeholder="Phone" w={200} value={phone} onChange={e => setPhone(e.target.value)}/>
    
</Flex>
<Button onClick={SubmitDetails} mt={16}>Submit</Button>
<Box> <Link to='/'>Back to Home</Link></Box>
</Box>
 
</Flex>

}
export default Doctor2;


 