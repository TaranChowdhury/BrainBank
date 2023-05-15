import React from 'react'
import "./ContactUs.css"


const inputStlye = {
  width: '100%'
}

const ContactUs = () => {
  return (
    <>
    <h1 className="banner">Contact Us</h1>
    <div className="contactus-page" style={{
      maxWidth: '1000px',
      margin: '0 auto',
    }}>
      <div className="pa3 flex-row-ns flex-column" style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
      }}>
        <div className="mr3" style={{
          maxWidth: 400,
          display: 'flex',
          alignItems: 'center'
        }}>
          <img src="https://cdn.discordapp.com/attachments/1018696125223534594/1107456573497946142/Support-Your-Team-Main-2.png" alt="support"
            style={{
              borderRadius: '50%',
              aspectRatio: '1',
              objectFit: 'cover'
            }} />
        </div>
        <div style={{
          maxWidth: 400,
        }}>
          <p className="message">For any inquiries, pricing information, or suggestions, please feel free to reach out to us!</p>
          <div className="nameFormat">
            <div className="input-container">
              <label className="contactus-headers">First Name</label>
              <input type="text" className="fname" style={inputStlye} />
            </div>
            <div className="input-container">
              <label className="contactus-headers">Last Name</label>
              <input type="text" className="lname"  style={inputStlye}/>
            </div>
          </div>
          <div className="vertical-container">
            <label className="contactus-headers">Email</label>
            <input type="text" style={inputStlye} />


            <label className="contactus-headers">Subject</label>
            <input type="text" style={inputStlye} />

            <label className="contactus-headers">Message</label>
            <textarea type="text" style={{
              ...inputStlye,
              height: '10ch',
            }} className="mb4" />
            <input className="login-button" type="submit" value="Submit" />
          </div>
        </div> 
      </div> 
      </div>
      </>
  )
}

export default ContactUs