function TimeSlot({ data, selectedDate }) {
    // Predefined time slots
    const timeSlots = ["13:00-14:00", "14:00-15:00", "15:00-16:00"];
    
    // Function to get booked slots based on the selected date
    const bookedSlots = (data, selectedDate) => {
      if (selectedDate) {
        const selectedDateString = selectedDate.toLocaleDateString();
        // Filter data to find slots matching the selected date
        const filteredSlots = data
          .filter(slot => slot.time.includes(selectedDateString))
          .map(slot => slot.time.split(" ")[1]);
        return filteredSlots;
      }
      return [];
    };
    // Get filtered slots for the selected date
    const filteredSlots = bookedSlots(data, selectedDate);
    console.log(filteredSlots)
  
    return (
      <>
        <h2>Time Slots</h2>
        {timeSlots.map(slot => (
          <p key={slot}>
            {slot} {filteredSlots.includes(slot) ? 'taken' : ''}
          </p>
        ))}
      </>
    );
  }
  
  export default TimeSlot;
  
