import React from "react";
import ReactDOM from "react-dom";
import "../../css/app.css";

import axios from "axios";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import DataList from "./DataList";

function showMsg(message) {
  let error = document.getElementById('error')
  error.style.display = 'block'
  error.innerHTML = message
  setTimeout(() => {
    error.style.display = 'none'
  }, 3000)
}

export default function DataForm() {
  const postForm = (e) => {
    e.preventDefault()
    if (!phoneValid) {
      showMsg('<b>Phone number</b> is not valid!')
      return
    }
    let data = new FormData(e.target)
    axios.post('/api/datas', data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      console.log(res)
      showMsg('Success.')
      axios.get('/api/datas').then((res) => {
        data = res.data
        ReactDOM.render(<DataList data={res.data} out={true} />, document.getElementById('data-list'))
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
      showMsg('Error!')
    })
  }
  let phoneValid = false
  const handleOnChange = (e, d, g, f) => {
    if (f.replace(/[0-9]/g, ".") == d.format)
      phoneValid = true
  }
  return (
    <form className="col-md-4" autoComplete="off" onSubmit={postForm}>
      <div className="alert alert-warning" id="error" style={{ display: "none" }}></div>
      <input className="form-control" type="text" name="fullname" placeholder="Fullname" required />
      <input className="form-control" type="email" name="mail" placeholder="E-Mail" required />
      <PhoneInput
        country={"tr"}
        onChange={handleOnChange}
        placeholder={"Phone Number"}
        inputProps={{
          name: "phone",
          required: true,
          className: "form-control w-100 mb-2",
          type: "text"
        }}
      />
      <textarea className="form-control" rows="2" placeholder="Address" name="address" required></textarea>
      <button className="btn btn-primary">Gönder</button>
    </form>
  );
}

if (document.getElementById('data-form')) {
  ReactDOM.render(<DataForm />, document.getElementById('data-form'))
}