function TimeSlot({ data, selectedDate,setStartTime,setEndTime }) {
        const timeSlots = ["13:00-14:00", "14:00-15:00", "15:00-16:00"];
    
    
    const bookedSlots = (data, selectedDate) => {
      if (selectedDate) {
        const selectedDateString = selectedDate.toLocaleDateString();
        
        const filteredSlots = data
          .filter(slot => slot.time.includes(selectedDateString))
          .map(slot => slot.time.split(" ")[1]);
        return filteredSlots;
      }
      return [];
    };
    
    function preFill(a){
      let b = a.split("-");
      setStartTime(b[0])
      setEndTime(b[1])
    }
    
    const filteredSlots = bookedSlots(data, selectedDate);
    
  
    return (
      <>
        <h2>Time Slots</h2>
        <p>Click on a slot below to autofill </p>
        {timeSlots.map(slot => (
          <p style={{cursor:'pointer'}} key={slot} onClick={()=> preFill(slot)}>
           <i>{slot} {filteredSlots.includes(slot) ? 'taken' : 'not taken'}</i>
          </p>
        ))}
      </>
    );
  }
  
  export default TimeSlot;
  
